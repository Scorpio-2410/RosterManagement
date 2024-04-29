using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roster.Features.Users.Shared;
using Roster.Models;

namespace Roster1.Features.Users.Operations
{
    public class GetUser : IRequest<GetUserResponse>
    {
        [FromRoute] public int UserId { get; set; }
    }

    public class GetUserValidator : AbstractValidator<GetUser>
    {
        readonly RostersContext _context;
        public GetUserValidator(RostersContext context)
        {
            _context = context;

            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("User id must be a number greater than 0")
                .Must(UserMustExist).WithMessage("User does not exit!");
        }

        bool UserMustExist (int UserId)
        {
            return _context.Users.Any(x => x.UserId == UserId);
        }

    }

    public class GetUserhandler : IRequestHandler<GetUser, GetUserResponse>
    {
        readonly RostersContext _context; 
        public GetUserhandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetUserResponse> Handle(GetUser request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == request.UserId, cancellationToken);
            if (user == null) return null;

            return new()
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Availability = user.Availability,
            };

        }
    }
}
