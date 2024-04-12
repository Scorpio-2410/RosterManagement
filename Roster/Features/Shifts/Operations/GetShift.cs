using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rosters.Models;
using System.Reflection.Metadata.Ecma335;

namespace Rosters.Features.Shifts.Operations
{
    public class GetShift : IRequest<GetShiftResponse>
    {
        [FromRoute] public int ShiftId { get; set; }
    }

    public class GetShiftResponse
    {
        public int ShiftId { get; set; }
        public int RosterId { get; set; }
        public int UserId { get; set; }
        public int? PayslipId { get; set; }
        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }
        public decimal? CostRateHourly { get; set; }
        public decimal? TotalHours { get; set; }
        public decimal? TotalCost { get; set; }
    }

    public class GetShiftHandler : IRequestHandler<GetShift, GetShiftResponse>
    {
        readonly RostersContext _context;
        public GetShiftHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetShiftResponse> Handle(GetShift request, CancellationToken cancellationToken)
        {
            var shift = await _context.Shifts.SingleOrDefaultAsync(x => x.ShiftId == request.ShiftId, cancellationToken);
            if (shift == null) return null;

            return new()
            {
                ShiftId = shift.ShiftId,
                RosterId = shift.RosterId,
                UserId = shift.UserId,
                PayslipId = shift.PayslipId,
                StartAt = shift.StartAt,
                EndAt = shift.EndAt,
                CostRateHourly = shift.CostRateHourly,
                TotalHours = shift.TotalHours,
                TotalCost = shift.TotalCost
            };
        }
    }
}
