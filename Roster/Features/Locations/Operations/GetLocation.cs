using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rosters.Models;

namespace Rosters.Features.Locations.Operations
{
    public class GetLocation : IRequest<GetLocationResponse>
    {
        [FromRoute] public int LocationId { get; set; }
    }

    public class GetLocationResponse
    {
        public int LocationId { get; set; }

        public string? Address1 { get; set; }

        public string? Address2 { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Country { get; set; }
    }

    public class GetLocationHandler : IRequestHandler<GetLocation, GetLocationResponse>
    {
        readonly RostersContext _context;
        public GetLocationHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetLocationResponse> Handle(GetLocation request, CancellationToken cancellationToken)
        {
            var location = await _context.Locations.SingleOrDefaultAsync(x => x.LocationId == request.LocationId, cancellationToken);
           
            if (location == null) return null;

            return new()
            {
                LocationId = location.LocationId,
                Address1 = location.Address1,
                Address2 = location.Address2,
                City = location.City,
                State = location.State,
                Country = location.Country
            };
        }
    }
}
