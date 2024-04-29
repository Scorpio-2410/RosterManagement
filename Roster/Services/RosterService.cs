using FluentValidation;
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


        public async Task<(Roster.Models.Roster, Shift shift)> AddShift(int rosterId, int userId, DateTime startAt, DateTime endAt)
        {
            var roster = _context.Rosters
                .Include(x => x.Shifts)
                //.ThenInclude(x => x.User)
                //.Include(x => x.Location)
                .SingleOrDefault(x => x.RosterId == rosterId);

            var shift = new Shift
            {
                UserId = userId,
                StartAt = startAt,
                EndAt = endAt,

                TotalMinutes = (int)(endAt - startAt).TotalMinutes,

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

        public DateTime LastDateInRoster(Models.Roster roster)
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
