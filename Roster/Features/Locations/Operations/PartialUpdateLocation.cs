using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Shared;
using Roster.Models;

namespace Roster.Features.Locations.Operations
{
    public class PartialUpdateLocation : IRequest<GetLocationResponse>
    {
        [FromRoute] public int LocationId { get; set; }
        [FromBody] public JsonPatchDocument<PartialLocationModel> Payload { get; set; }
    }

    public class PartialLocationModel
    {
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
    }

    public class PartialUpdateLocationHandler : IRequestHandler<PartialUpdateLocation, GetLocationResponse>
    {
        readonly RostersContext _context;

        public PartialUpdateLocationHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetLocationResponse> Handle(PartialUpdateLocation request, CancellationToken cancellationToken)
        {
            var l = _context.Locations.SingleOrDefault(x => x.LocationId == request.LocationId);
            if (l == null) return null;


            var model = new PartialLocationModel
            {
                Address1 = l.Address1,
                Address2 = l.Address2,
                City = l.City,
                State = l.State,
                Country = l.Country
            };
            

            request.Payload.ApplyTo(model);


            l.Address1 = model.Address1;
            l.Address2 = model.Address2;
            l.City = model.City;
            l.State = model.State;
            l.Country = model.Country;

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
