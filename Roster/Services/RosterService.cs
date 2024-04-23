using Microsoft.EntityFrameworkCore;
using Roster.Models;

namespace Roster.Services
{
    public class RosterService
    {
        readonly RostersContext _context;

        public RosterService(RostersContext context)
        {
            _context = context;
        }

        // Implement delete method for Roster


        public async Task<(Roster.Models.Roster, Shift shift)> AddShift(int rosterId, int userId, DateTime startAt, DateTime endAt)
        {
            var roster = _context.Rosters
                .Include(x => x.Shifts)
                //.ThenInclude(x => x.User)
                //.Include(x => x.Location)
                .SingleOrDefault(x => x.RosterId == rosterId);
            if (roster == null) throw new ArgumentNullException(nameof(rosterId), "Roster does not exist!");

            // Business Rule 1: the start and end of a shift must be on the same day
            if (startAt.Date != endAt.Date)
                throw new ArgumentOutOfRangeException(nameof(endAt), "Start and End Date of shift do not match!");

            // Business Rule 2: the shift must be within the roster
            if (startAt.Date < roster.StartingWeek.Date)
                throw new ArgumentOutOfRangeException(nameof(startAt), "Start date must be with in roster!");

            // Business Rule 3: the start of the shift must be within the roster date window
            if (startAt > LastDateInRoster(roster))
                throw new ArgumentOutOfRangeException(nameof(startAt), "Start date must be with in roster!");

            // Business Rule 4: a worker cant work twice in the same day
            if (roster.Shifts.Any(s => s.UserId == userId && s.StartAt.Date == startAt.Date))
                throw new ArgumentOutOfRangeException(nameof(userId), "Cant work twice on the same day!");

            // Business Rule 5: a worker cant work more than 20 hours in a roster
            if (roster.Shifts.Where(x => x.UserId == userId).Sum(x => (x.TotalMinutes ?? 0) / 60) + (endAt - startAt).Hours
                > 20)
                throw new ArgumentOutOfRangeException(nameof(userId), "Cant work more than 8 hours in roster!");
            
            // Business Rule 6: a shift cannot be added to a locked roster 
            if (roster.IsLocked == true)
                throw new ArgumentOutOfRangeException(nameof(roster.IsLocked), "Roster is locked!");

            var shift = new Shift
            {
                UserId = userId,
                StartAt = startAt,
                EndAt = endAt,

                TotalMinutes = (endAt - startAt).Minutes,

            };
            roster.Shifts.Add(shift);

            await _context.SaveChangesAsync();

            return (roster, shift);
        }

        public async Task<bool> RemoveShift(int rosterId, int shiftId)
        {
            var roster = _context.Rosters.Include(x => x.Shifts).SingleOrDefault(x => x.RosterId == rosterId);
            var shift = await _context.Shifts.FindAsync(shiftId);
            if (shift == null) throw new ArgumentNullException(nameof(shiftId), "Shift does not exist!");

            // Business Rule: a shift cannot be removed to a locked roster
            if (roster.IsLocked == true)
                throw new ArgumentOutOfRangeException(nameof(roster.IsLocked), "Roster is locked!");

            _context.Shifts.Remove(shift);
            await _context.SaveChangesAsync();
            return true;
        }

        public DateTime LastDateInRoster(Roster.Models.Roster roster)
        {
            var days = 7;
            //switch (Duration)
            //{
            //    case RosterDuration.Weekly:
            //        days = 7;
            //        break;
            //    case RosterDuration.Fortnightly:
            //        days = 14;
            //        break;
            //    case RosterDuration.Monthly:
            //        days = 30;
            //        break;
            //}


            var date = roster.StartingWeek.Date.AddDays(days).AddMicroseconds(-1);

            return date;
        }

        public enum RosterDuration
        {
            Weekly,
            Fortnightly,
            Monthly
        }

    }
}
