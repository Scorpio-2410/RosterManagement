using System;
using System.Collections.Generic;

namespace Rosters.Models;

public partial class Roster
{
    public int RosterId { get; set; }

    public int LocationId { get; set; }

    public DateTime StartingWeek { get; set; }

    public virtual Location Location { get; set; } = null!;

    public virtual ICollection<Shift> Shifts { get; set; } = new List<Shift>();
}
