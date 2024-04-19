using System;
using System.Collections.Generic;

namespace Roster.Models;

public partial class Shift
{
    public int ShiftId { get; set; }

    public int RosterId { get; set; }

    public int UserId { get; set; }

    public int? PayslipId { get; set; }

    public DateTime StartAt { get; set; }

    public DateTime EndAt { get; set; }

    public decimal? CostRateHourly { get; set; }

    public int? TotalMinutes { get; set; }

    public decimal? TotalCost { get; set; }

    public bool IsSpecial { get; set; }

    public virtual Payslip? Payslip { get; set; }

    public virtual Roster Roster { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
