using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Users.Shared;
using Rosters.Models;

namespace Roster.Features.Users.Operations
{
    public class UpdateUser : IRequest<GetUserResponse>
    {
        [FromRoute] public int UserId { get; set; }
        [FromBody] public UpdateUserPayload Payload { get; set; }
    }

    public class UpdateUserPayload
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Availability { get; set; }
    }

    public class UpdateUserHandler : IRequestHandler<UpdateUser, GetUserResponse>
    {
        readonly RostersContext _context;
        public UpdateUserHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<GetUserResponse> Handle(UpdateUser request, CancellationToken cancellationToken)
        {
            var u = _context.Users.SingleOrDefault(x => x.UserId == request.UserId);
            if (u == null) return null;

            u.FirstName = request.Payload.FirstName;
            u.LastName = request.Payload.LastName;
            u.Role = request.Payload.Role;
            u.Availability = request.Payload.Availability;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role,
                Availability = u.Availability,
            };
        }
    }
}
