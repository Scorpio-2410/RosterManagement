using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Roster.Models;

namespace Rosters.Features.Rosters.Operations
{
    public class CreateRoster : IRequest<CreateRosterResponse>
    {
        public int LocationId { get; set; }
        public DateTime StartingWeek { get; set; }
    }

    public class CreateRosterResponse
    {
        public int RosterId { get; set; }
    }

    public class CreateRosterValidator : AbstractValidator<CreateRoster>
    {
        readonly RostersContext _context;

        public CreateRosterValidator(RostersContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.LocationId)
                .GreaterThan(0).WithMessage("Location id must be a number greater than 0!")
                .Must(LocationMustExist).WithMessage("Location does not exit!");

            RuleFor(x => x.StartingWeek)
                .GreaterThanOrEqualTo(DateTime.UtcNow).WithMessage("Roster start date must be in the future!")
                .Must(DateIsStartOfTheWeek).WithMessage("Roster start date must be a monday!");

        }

        public override async Task<ValidationResult> ValidateAsync(ValidationContext<CreateRoster> context, CancellationToken cancellation = new CancellationToken())
        {
            var result = await base.ValidateAsync(context, cancellation);

            if (!result.IsValid) return result;

            // implement the addition dependant rule
            var unique = IsUniqueRoster(context.InstanceToValidate);
            if (!unique)
            {
                return new ValidationResult(new[]
                {
                    new ValidationFailure(nameof(CreateRoster), "Duplicate roster exist!")
                });
            }

            return result;
        }

        bool IsUniqueRoster(CreateRoster request)
        {
            return !_context.Rosters
                .Any(x => x.LocationId == request.LocationId && x.StartingWeek.Date == request.StartingWeek.Date);
        }

        bool DateIsStartOfTheWeek(DateTime date)
        {
            return date.DayOfWeek == DayOfWeek.Monday;
        }

        bool LocationMustExist(int locationId)
        {
            return _context.Locations.Any(x => x.LocationId == locationId);
        }
    }


    public class CreateRosterhandler : IRequestHandler<CreateRoster, CreateRosterResponse>
    {
        private RostersContext _context;

        public CreateRosterhandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<CreateRosterResponse> Handle(CreateRoster request, CancellationToken cancellationToken)
        {
            var roster = new Roster.Models.Roster()
            {
                LocationId = request.LocationId,
                StartingWeek = request.StartingWeek
            };

            await _context.Rosters.AddAsync(roster, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new() { RosterId = roster.RosterId };
        }
    }
}