using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Roster.Models;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Roster.Features.Users.Operations
{
    public class DeleteUser : IRequest<bool>
    {
        public int UserId { get; set; }
    }

    public class DeleteShiftHandler : IRequestHandler<DeleteUser, bool>
    {
        readonly RostersContext _context;

        public DeleteShiftHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteUser request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null) return false;

                 var relatedPayslips = await _context.Payslips
                    .Where(p => p.UserId == request.UserId)
                    .ToListAsync(cancellationToken);
             
                _context.Users.Remove(user);
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
