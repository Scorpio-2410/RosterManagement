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
