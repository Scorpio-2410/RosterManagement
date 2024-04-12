using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Shared;
using Rosters.Models;

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
