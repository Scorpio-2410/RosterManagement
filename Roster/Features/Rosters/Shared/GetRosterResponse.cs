namespace Roster.Features.Rosters.Shared
{
    public class GetRosterResponse
    {
        public int RosterId { get; set; }
        public int LocationId { get; set; }
        public DateTime StartingWeek { get; set; }
    }
}
