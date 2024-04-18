using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roster.Features.Payslips.Shared;
using Roster.Models;

namespace Rosters.Features.Payslips.Operations
{
    public class GetPayslip : IRequest<GetPayslipResponse>
    {
        [FromRoute] public int PayslipId { get; set; }

    }

    public class GetPayslipHandler : IRequestHandler<GetPayslip, GetPayslipResponse>
    {
        readonly RostersContext _context;

        public GetPayslipHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetPayslipResponse> Handle(GetPayslip request, CancellationToken cancellationToken)
        {
            var payslip = await _context.Payslips.SingleOrDefaultAsync(x => x.PayslipId == request.PayslipId, cancellationToken);
            if (payslip == null) return null;

            return new()
            {
                PayslipId = payslip.PayslipId,
                UserId = payslip.UserId,
                PeriodFrom = payslip.PeriodFrom,
                PeriodTo = payslip.PeriodTo,
                PaymentDate = payslip.PaymentDate,
                TotalHours = payslip.TotalHours,
                GrossIncome = payslip.GrossIncome,
                TaxAmount = payslip.TaxAmount,
                NetIncome = payslip.NetIncome
            };
        }
    }
}
