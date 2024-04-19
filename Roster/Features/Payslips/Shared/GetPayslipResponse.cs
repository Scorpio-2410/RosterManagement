namespace Roster.Features.Payslips.Shared
{
    public class GetPayslipResponse
    {
        public int PayslipId { get; set; }
        public int UserId { get; set; }
        public DateTime PeriodFrom { get; set; }
        public DateTime PeriodTo { get; set; }
        public DateTime PaymentDate { get; set; }
        public int? TotalMinutes { get; set; }
        public decimal? GrossIncome { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? NetIncome { get; set; }
    }
}
