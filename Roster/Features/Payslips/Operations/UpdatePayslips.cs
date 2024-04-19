using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Payslips.Shared;
using Roster.Models;

namespace Roster.Features.Payslips.Operations
{
    public class UpdatePayslips : IRequest<GetPayslipResponse>
    {
        [FromRoute] public int PayslipId { get; set; }
        [FromBody] public UpdatePayslipPayload Payload { get; set; }   
    }

    public class UpdatePayslipPayload
    {
        public DateTime PeriodFrom { get; set; }
        public DateTime PeriodTo { get; set; }
        public DateTime PaymentDate { get; set; }
        public int? TotalMinutes { get; set; }
        public decimal? GrossIncome { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? NetIncome { get; set; }
    }

    public class UpdatePayslipHandler : IRequestHandler<UpdatePayslips, GetPayslipResponse>
    {
        readonly RostersContext _context;
        public UpdatePayslipHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetPayslipResponse> Handle(UpdatePayslips request, CancellationToken cancellationToken)
        {
            var p = _context.Payslips.SingleOrDefault(x => x.PayslipId == request.PayslipId);
            if (p == null) return null;

            p.PeriodFrom = request.Payload.PeriodFrom;
            p.PeriodTo = request.Payload.PeriodTo;
            p.PaymentDate = request.Payload.PaymentDate;
            p.TotalMinutes = request.Payload.TotalMinutes;
            p.GrossIncome = request.Payload.GrossIncome;
            p.TaxAmount = request.Payload.TaxAmount;   
            p.NetIncome = request.Payload.NetIncome;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                PeriodFrom = p.PeriodFrom,
                PeriodTo = p.PeriodTo,
                PaymentDate = p.PaymentDate,
                TotalMinutes = p.TotalMinutes,
                GrossIncome = p.GrossIncome,
                TaxAmount = p.TaxAmount,
                NetIncome = p.NetIncome
            };
        }
    }
}
