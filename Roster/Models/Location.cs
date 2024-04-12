using System;
using System.Collections.Generic;

namespace Rosters.Models;

public partial class Location
{
    public int LocationId { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Country { get; set; }

    public virtual ICollection<Roster> Rosters { get; set; } = new List<Roster>();
}
