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
    public class DeleteUser : IRequest<DeleteUserResult>
    {
        public int UserId { get; set; }
    }

    public class DeleteUserResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    public class DeleteShiftHandler : IRequestHandler<DeleteUser, DeleteUserResult>
    {
        readonly RostersContext _context;

        public DeleteShiftHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<DeleteUserResult> Handle(DeleteUser request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null)
                {
                    return new DeleteUserResult
                    {
                        Success = false,
                        Message = "UserId not found"
                    };
                }

                var relatedPayslips = await _context.Payslips
                    .Where(p => p.UserId == request.UserId)
                    .ToListAsync(cancellationToken);

                if (relatedPayslips.Any())
                {
                    return new DeleteUserResult
                    {
                        Success = false,
                        Message = "Cannot delete user because there are related payslips"
                    };
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync(cancellationToken);

                return new DeleteUserResult
                {
                    Success = true,
                    Message = "User successfully deleted"
                };
            }
            catch (Exception e)
            {
                return new DeleteUserResult
                {
                    Success = false,
                    Message = $"Error deleting user: {e.Message}"
                };
            }
        }
    }
}
