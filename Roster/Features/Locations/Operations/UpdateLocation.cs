using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Shared;
using Roster.Models;

namespace Roster.Features.Locations.Operations
{
    public class UpdateLocation : IRequest<GetLocationResponse>
    {
        [FromRoute] public int LocationId { get; set; }
        [FromBody] public UpdateLocationPayload Payload { get; set; }
    }

    public class UpdateLocationPayload
    {
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
    }

    public class UpdateLocationValidator : AbstractValidator<UpdateLocation>
    {
        readonly RostersContext _context;
        public UpdateLocationValidator(RostersContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.LocationId)
                .GreaterThan(0).WithMessage("Location id must be a number greater than 0!")
                .Must(LocationMustExist).WithMessage("Location does not exit!");
            RuleFor(x => x.Payload.Address1).NotEmpty();
            RuleFor(x => x.Payload.City).NotEmpty();
            RuleFor(x => x.Payload.State).NotEmpty();
            RuleFor(x => x.Payload.Country).NotEmpty();
        }

        bool LocationMustExist(int locationId)
        {
            return _context.Locations.Any(x => x.LocationId == locationId);
        }

    }

    public class UpdateLocationHandler : IRequestHandler<UpdateLocation, GetLocationResponse>
    {
        readonly RostersContext _context;

        public UpdateLocationHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetLocationResponse> Handle(UpdateLocation request, CancellationToken cancellationToken)
        {
            var l = _context.Locations.SingleOrDefault(x => x.LocationId == request.LocationId);
            if (l == null) return null;

            l.Address1 = request.Payload.Address1;
            l.Address2 = request.Payload.Address2;
            l.City = request.Payload.City;
            l.State = request.Payload.State;
            l.Country = request.Payload.Country;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                LocationId = l.LocationId,
                Address1 = l.Address1,
                Address2 = l.Address2,
                City = l.City,
                State = l.State,
                Country = l.Country
            };
        }
    }
}
