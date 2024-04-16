﻿namespace Roster.Features.Shifts.Shared
{
    public class GetShiftResponse
    {
        public int ShiftId { get; set; }
        public int RosterId { get; set; }
        public int UserId { get; set; }
        public int? PayslipId { get; set; }
        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }
        public decimal? CostRateHourly { get; set; }
        public decimal? TotalHours { get; set; }
        public decimal? TotalCost { get; set; }
    }
}
