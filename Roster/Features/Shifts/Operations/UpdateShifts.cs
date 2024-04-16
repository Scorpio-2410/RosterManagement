using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Shifts.Shared;
using Rosters.Models;

namespace Roster.Features.Shifts.Operations
{
    public class UpdateShifts : IRequest<GetShiftResponse>
    {
        [FromRoute] public int ShiftId { get; set; }
        [FromBody] public UpdateShiftPayload Payload { get; set; }

    }

    public class UpdateShiftPayload
    {
        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }
        public decimal? CostRateHourly { get; set; }
        public decimal? TotalHours { get; set; }
        public decimal? TotalCost { get; set; }
    }

    public class UpdateShiftHandler : IRequestHandler<UpdateShifts, GetShiftResponse>
    {
        readonly RostersContext _context;

        public UpdateShiftHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetShiftResponse> Handle(UpdateShifts request, CancellationToken cancellationToken)
        {
            var s = _context.Shifts.SingleOrDefault(x => x.ShiftId == request.ShiftId);
            if (s == null) return null;

            s.StartAt = request.Payload.StartAt;
            s.EndAt = request.Payload.EndAt;
            s.CostRateHourly = request.Payload.CostRateHourly;
            s.TotalHours = request.Payload.TotalHours;
            s.TotalCost = request.Payload.TotalCost;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                StartAt = s.StartAt,
                EndAt = s.EndAt,
                CostRateHourly = s.CostRateHourly,
                TotalHours = s.TotalHours,
                TotalCost = s.TotalCost
            };
        }
    }
}
