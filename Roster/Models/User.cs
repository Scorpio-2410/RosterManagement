using System;
using System.Collections.Generic;

namespace Rosters.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string? Availability { get; set; }

    public virtual ICollection<Payslip> Payslips { get; set; } = new List<Payslip>();

    public virtual ICollection<Shift> Shifts { get; set; } = new List<Shift>();
}
