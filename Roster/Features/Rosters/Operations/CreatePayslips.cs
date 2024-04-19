using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roster.Models;
using Roster.Services;

namespace Roster.Features.Rosters.Operations
{
    public class CreatePayslips : IRequest<CreatePayslipsResponse>
    {
        [FromRoute] public int RosterId { get; set; }
    }

    public class CreatePayslipsResponse
    {
        public int TotalMinutesBilled { get; set; }
        public int EmployeesCount { get; set; }
        public decimal TotalRosterCost { get; set; }
    }

    public class CreatePayslipsHandler : IRequestHandler<CreatePayslips, CreatePayslipsResponse>
    {
        readonly RostersContext _context;
        readonly RosterService _rosterService;

        public CreatePayslipsHandler(RostersContext context, RosterService rosterService)
        {
            _context = context;
            _rosterService = rosterService;
        }
        public async Task<CreatePayslipsResponse> Handle(CreatePayslips request, CancellationToken cancellationToken)
        {
            var roster = await _context.Rosters
                .Include(x => x.Shifts)
                .SingleOrDefaultAsync(x => x.RosterId == request.RosterId && !x.IsLocked,
                    cancellationToken: cancellationToken);

            if (roster == null) return null;

            var paidAt = DateTime.UtcNow;

            var users = roster.Shifts.GroupBy(x => x.UserId).ToList();

            // create payslips for employees
            foreach (var userShifts in users)
            {
                var grossIncome = userShifts.Sum(x => x.TotalCost);
                var taxAmount = 0m; //TODO: calculate tax

                var payslip = new Payslip
                {
                    UserId = userShifts.Key,
                    PeriodFrom = roster.StartingWeek,
                    PeriodTo = _rosterService.LastDateInRoster(roster),
                    PaymentDate = paidAt,
                    GrossIncome = grossIncome,
                    TaxAmount = taxAmount,
                    NetIncome = grossIncome - taxAmount,

                };

                _context.Payslips.Add(payslip);

            }

            roster.IsLocked = true;
            roster.LockedAt = paidAt;

            await _context.SaveChangesAsync(cancellationToken);
            return new()
            {
                EmployeesCount = users.Count,
                TotalMinutesBilled = (int)roster.Shifts.Sum(x => x.TotalHours ?? 0),
                TotalRosterCost = roster.Shifts.Sum(x => x.TotalCost ?? 0)
            };
        }
    }
}
