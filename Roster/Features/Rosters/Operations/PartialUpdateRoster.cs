using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Rosters.Shared;
using Rosters.Models;

namespace Roster.Features.Rosters.Operations
{
    public class PartialUpdateRoster : IRequest<GetRosterResponse>
    {
        [FromRoute] public int RosterId { get; set; }
        [FromBody] public JsonPatchDocument<PartialRosterModel> Payload { get; set; }
    }

    public class PartialRosterModel
    {
        public DateTime StartingWeek { get; set; }
    }

    public class PartialUpdateRosterHandler : IRequestHandler<PartialUpdateRoster, GetRosterResponse>
    {
        readonly RostersContext _context;

        public PartialUpdateRosterHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetRosterResponse> Handle(PartialUpdateRoster request, CancellationToken cancellationToken)
        {
            var r = _context.Rosters.SingleOrDefault(x => x.RosterId == request.RosterId);
            if (r == null) return null;

            var model = new PartialRosterModel
            {
                StartingWeek = r.StartingWeek
            };

            request.Payload.ApplyTo(model);

            r.StartingWeek = model.StartingWeek;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                StartingWeek = r.StartingWeek
            };
        }
    }

}
