namespace Roster.Features.Rosters.Shared
{
    public class GetShiftResponse
    {
        public int ShiftId { get; set; }
        public int RosterId { get; set; }
        public int UserId { get; set; }
        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }
        public int? TotalMinutes { get; set; }
    }
}
