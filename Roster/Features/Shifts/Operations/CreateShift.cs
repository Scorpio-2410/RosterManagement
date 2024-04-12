using MediatR;
using Microsoft.AspNetCore.SignalR.Protocol;
using Rosters.Models;

namespace Rosters.Features.Shifts.Operations
{
    public class CreateShift : IRequest<CreateShitResponse>
    {

        public int RosterId { get; set; }

        public int UserId { get; set; }

        public int? PayslipId { get; set; }

        public DateTime StartAt { get; set; }

        public DateTime EndAt { get; set; }

        public decimal? CostRateHourly { get; set; }

        public decimal? TotalHours { get; set; }

        public decimal? TotalCost { get; set; }

    }

    public class CreateShitResponse
    {
        public int ShiftId { get; set; }
    }

    public class CreateShiftHandler : IRequestHandler<CreateShift, CreateShitResponse>
    {
        readonly RostersContext _context;
        public CreateShiftHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<CreateShitResponse> Handle(CreateShift request, CancellationToken cancellationToken)
        {
            var shift = new Shift
            {
                RosterId = request.RosterId,
                UserId = request.UserId,
                PayslipId = request.PayslipId,
                StartAt = request.StartAt,
                EndAt = request.EndAt,
                CostRateHourly = request.CostRateHourly,
                TotalHours = request.TotalHours,
                TotalCost = request.TotalCost
            };
            await _context.Shifts.AddAsync(shift, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new() { ShiftId = shift.ShiftId };
        }
    }
}
