using MediatR;
using Roster.Features.Rosters;
using Roster.Features.Rosters.Operations;
using Roster.Models;
using System.Security.AccessControl;

namespace Rosters.Features.Payslips.Operations
{
    public class CreatePayslip : IRequest<CreatePayslipResponse>
    {
        public int UserId { get; set; }
        public DateTime PeriodFrom { get; set; }

        public DateTime PeriodTo { get; set; }

        public DateTime PaymentDate { get; set; }

        public decimal? TotalHours { get; set; }

        public decimal? GrossIncome { get; set; }

        public decimal? TaxAmount { get; set; }

        public decimal? NetIncome { get; set; }
    }

    public class CreatePayslipResponse
    {
        public int PayslipId { get; set; }
    }

    public class CreatePaysliphandler : IRequestHandler<CreatePayslip, CreatePayslipResponse>
    {
        private RostersContext _context;

        public CreatePaysliphandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<CreatePayslipResponse> Handle(CreatePayslip request, CancellationToken cancellationToken)
        {
            var payslip = new Payslip
            {
                UserId = request.UserId,
                PeriodFrom = request.PeriodFrom,
                PeriodTo = request.PeriodTo,
                PaymentDate = request.PaymentDate,
                TotalHours = request.TotalHours,
                GrossIncome = request.GrossIncome,
                TaxAmount = request.TaxAmount,
                NetIncome = request.NetIncome,
            };

            await _context.Payslips.AddAsync(payslip, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new() {PayslipId = payslip.PayslipId};
        }
    }
}
