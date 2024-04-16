using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Shifts.Shared;
using Rosters.Models;

namespace Roster.Features.Shifts.Operations
{
    public class PartialUpdateShift : IRequest<GetShiftResponse>
    {
        [FromRoute] public int ShiftId { get; set; }
        [FromBody] public JsonPatchDocument<PartialShiftModel> Payload { get; set; }
    }

    public class PartialShiftModel
    {
        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }
        public decimal? CostRateHourly { get; set; }
        public decimal? TotalHours { get; set; }
        public decimal? TotalCost { get; set; }
    }

    public class PartialUpdateHandler : IRequestHandler<PartialUpdateShift, GetShiftResponse>
    {
        readonly RostersContext _context;
        public PartialUpdateHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetShiftResponse> Handle(PartialUpdateShift request, CancellationToken cancellationToken)
        {
            var s = _context.Shifts.SingleOrDefault(x => x.ShiftId == request.ShiftId);
            if (s == null) return null;

            var model = new PartialShiftModel
            {
                StartAt = s.StartAt,
                EndAt = s.EndAt,
                CostRateHourly = s.CostRateHourly,
                TotalHours = s.TotalHours,
                TotalCost = s.TotalCost
            };

            request.Payload.ApplyTo(model);

            s.StartAt = model.StartAt;
            s.EndAt = model.EndAt;
            s.CostRateHourly = model.CostRateHourly;
            s.TotalHours = model.TotalHours;
            s.TotalCost = model.TotalCost;

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
