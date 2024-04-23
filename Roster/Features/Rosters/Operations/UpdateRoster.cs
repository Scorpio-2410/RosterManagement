﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Rosters.Shared;
using Roster.Models;

namespace Roster.Features.Rosters.Operations
{
    public class UpdateRoster : IRequest<GetRosterResponse>
    {
        [FromRoute] public int RosterId { get; set; }
        [FromBody] public UpdateRosterPayload Payload { get; set; }
    }

    public class UpdateRosterPayload
    {
        public DateTime StartingWeek { get; set; }
    }

    public class UpdateRosterHandler : IRequestHandler<UpdateRoster, GetRosterResponse>
    {
        readonly RostersContext _context;

        public UpdateRosterHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetRosterResponse> Handle(UpdateRoster request, CancellationToken cancellationToken)
        {
            var r = _context.Rosters.SingleOrDefault(x => x.RosterId == request.RosterId);
            if (r == null) return null;
            if (r.IsLocked == true)
                throw new ArgumentOutOfRangeException(nameof(r.IsLocked), "Roster is locked!");

            r.StartingWeek = request.Payload.StartingWeek;
            
            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                RosterId = r.RosterId,
                LocationId = r.LocationId,
                StartingWeek = r.StartingWeek
            };
        }
    }
}
