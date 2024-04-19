using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Rosters.Shared;
using Roster.Models;

namespace Roster.Features.Rosters.Operations
{
    public class GetRosterShifts : IRequest<List<GetShiftResponse>>
    {
        [FromRoute] public int RosterId { get; set; }
    }

    public class GetRosterShiftHandler : IRequestHandler<GetRosterShifts, List<GetShiftResponse>>
    {
        readonly RostersContext _context;
        public GetRosterShiftHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<List<GetShiftResponse>> Handle(GetRosterShifts request, CancellationToken cancellationToken)
        {
            var shifts = _context.Shifts
                .Where(x => x.RosterId == request.RosterId)
                .Select(shifts => new GetShiftResponse
                {
                    RosterId = shifts.RosterId,
                    ShiftId = shifts.ShiftId,
                    UserId = shifts.UserId,
                    StartAt = shifts.StartAt,
                    EndAt = shifts.EndAt,
                    TotalMinutes = shifts.TotalMinutes
                })
                .ToList();
            return shifts;
        }
    }
}
