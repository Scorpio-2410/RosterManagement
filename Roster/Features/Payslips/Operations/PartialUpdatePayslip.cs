using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Payslips.Shared;
using Roster.Models;

namespace Roster.Features.Payslips.Operations
{
    public class PartialUpdatePayslip : IRequest<GetPayslipResponse>
    {
        [FromRoute] public int PayslipId { get; set; }
        [FromBody] public JsonPatchDocument<PartialPayslipModel> Payload { get; set; }
    }

    public class PartialPayslipModel
    {
        public DateTime PeriodFrom { get; set; }
        public DateTime PeriodTo { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal? TotalHours { get; set; }
        public decimal? GrossIncome { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? NetIncome { get; set; }
    }

    public class PartialUpdatePayslipHandler : IRequestHandler<PartialUpdatePayslip, GetPayslipResponse>
    {
        readonly RostersContext _context;

        public PartialUpdatePayslipHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetPayslipResponse> Handle(PartialUpdatePayslip request, CancellationToken cancellationToken)
        {
            var p = _context.Payslips.SingleOrDefault(x => x.PayslipId == request.PayslipId);
            if (p == null) return null;

            var model = new PartialPayslipModel
            {
                PeriodFrom = p.PeriodFrom,
                PeriodTo = p.PeriodTo,
                PaymentDate = p.PaymentDate,
                TotalHours = p.TotalHours,
                GrossIncome = p.GrossIncome,
                TaxAmount = p.TaxAmount,
                NetIncome = p.NetIncome
            };

            request.Payload.ApplyTo(model);

            p.PeriodFrom = model.PeriodFrom;
            p.PeriodTo = model.PeriodTo;
            p.PaymentDate = model.PaymentDate;
            p.TotalHours = model.TotalHours;
            p.GrossIncome = model.GrossIncome;
            p.TaxAmount = model.TaxAmount;
            p.NetIncome = model.NetIncome;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                PeriodFrom = p.PeriodFrom,
                PeriodTo = p.PeriodTo,
                PaymentDate = p.PaymentDate,
                TotalHours = p.TotalHours,
                GrossIncome = p.GrossIncome,
                TaxAmount = p.TaxAmount,
                NetIncome = p.NetIncome
            };
        }
    }
}
