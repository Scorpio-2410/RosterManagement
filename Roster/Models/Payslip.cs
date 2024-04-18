using System;
using System.Collections.Generic;

namespace Roster.Models;

public partial class Payslip
{
    public int PayslipId { get; set; }

    public int UserId { get; set; }

    public DateTime PeriodFrom { get; set; }

    public DateTime PeriodTo { get; set; }

    public DateTime PaymentDate { get; set; }

    public decimal? TotalHours { get; set; }

    public decimal? GrossIncome { get; set; }

    public decimal? TaxAmount { get; set; }

    public decimal? NetIncome { get; set; }

    public virtual ICollection<Shift> Shifts { get; set; } = new List<Shift>();

    public virtual User User { get; set; } = null!;
}
