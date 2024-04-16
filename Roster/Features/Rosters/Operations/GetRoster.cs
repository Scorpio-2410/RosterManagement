using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roster.Features.Rosters.Shared;
using Rosters.Features.Locations.Operations;
using Rosters.Models;

namespace Rosters.Features.Rosters.Operations
{
    public class GetRoster : IRequest<GetRosterResponse>
    {
        [FromRoute] public int RosterId { get; set; }
    }

    public class GetRosterHandler : IRequestHandler<GetRoster,GetRosterResponse> 
    {
        readonly RostersContext _context;
        public GetRosterHandler(RostersContext context) 
        {
            _context = context;
        }

        public async Task<GetRosterResponse> Handle(GetRoster request, CancellationToken cancellationToken)
        {
            var roster = await _context.Rosters.SingleOrDefaultAsync(x => x.RosterId == request.RosterId);
            if (roster == null) return null;
            return new()
            {
                RosterId = roster.RosterId,
                LocationId = roster.LocationId,
                StartingWeek = roster.StartingWeek,
            };
        }

    }
}
