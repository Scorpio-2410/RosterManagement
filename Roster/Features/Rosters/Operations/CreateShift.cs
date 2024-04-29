
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roster.Models;
using Roster.Services;


namespace Roster.Features.Rosters.Operations
{
    public class CreateShift : IRequest<CreateShitResponse?>
    {
        [FromRoute] public int RosterId { get; set; }
        [FromBody] public CreateShiftPayload Payload { get; set; }
 
    }

    public class CreateShiftPayload
    {
        public int UserId { get; set; }

        public DateTime StartAt { get; set; }

        public DateTime EndAt { get; set; }
    }

    public class CreateShitResponse
    {
        public int ShiftId { get; set; }
    }

    public class CreateShiftValidator : AbstractValidator<CreateShift>
    {
        readonly RostersContext _context;

        public CreateShiftValidator(RostersContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.RosterId)
                .GreaterThan(0)
                .Must(RosterMustExist).WithMessage("Roster does not exist!");

            RuleFor(x => x.Payload.UserId)
                .GreaterThan(0)
                .Must(UserMustExist).WithMessage("User does not exist!");

            RuleFor(x => x.Payload)
            .Must(IsShiftValid);

        }

        bool RosterMustExist(int RosterId)
        {
            return _context.Rosters.Any(x => x.RosterId == RosterId);
        }

        bool UserMustExist(int UserId)
        {
            return _context.Users.Any(x => x.UserId == UserId);
        }

        bool IsShiftValid(CreateShift request, CreateShiftPayload Payload, ValidationContext<CreateShift> validationContext)
        {
            var roster = _context.Rosters.Include(x => x.Shifts).SingleOrDefault(x => x.RosterId == request.RosterId);
            if (roster == null) return false;

            //Business rule 1
            if (Payload.StartAt.Date != Payload.EndAt.Date)
                validationContext.AddFailure("Start and End Date of shift do not match!");

            //Business rule 2
            if (Payload.StartAt.Date < roster.StartingWeek.Date) 
                validationContext.AddFailure("Start date must be with in roster!");

            //Business rule 3
            if (Payload.StartAt > IsLastDateInRoster(roster)) 
                validationContext.AddFailure("Start date must be with in roster!");

            //Busines rule 4
            if (roster.Shifts.Any(s => s.UserId == Payload.UserId && s.StartAt.Date == Payload.StartAt.Date)) 
                validationContext.AddFailure("Cant work twice on the same day!");

            //Business rule 5
            if (roster.Shifts.Where(x => x.UserId == Payload.UserId).Sum(x => (x.TotalMinutes ?? 0) / 60) + (Payload.EndAt - Payload.StartAt).Hours > 8) 
                validationContext.AddFailure("Cant work more than 8 hours in roster!");

            //Business rule 6
            if (roster.IsLocked == true) 
                validationContext.AddFailure("Cannot add shift to locked Roster!");

            return true;
        }

        public DateTime IsLastDateInRoster(Models.Roster roster)
        {
            var days = 7;
            var date = roster.StartingWeek.Date.AddDays(days).AddMicroseconds(-1);
            return date;
        }
    }

    public class CreateShiftHandler : IRequestHandler<CreateShift, CreateShitResponse?>
    {
        readonly RosterService _rosterService;

        public CreateShiftHandler(RosterService rosterService)
        {
            _rosterService = rosterService;
        }

        public async Task<CreateShitResponse?> Handle(CreateShift request, CancellationToken cancellationToken)
        {
            try
            {
                var payload = request.Payload;
                var (roster, shift) =
                    await _rosterService.AddShift(request.RosterId, payload.UserId, payload.StartAt, payload.EndAt);

                return new() { ShiftId = shift.ShiftId };
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
