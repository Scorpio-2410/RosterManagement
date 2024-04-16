using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Users.Shared;
using Rosters.Models;

namespace Roster.Features.Users.Operations
{
    public class PartialUpdateUser : IRequest<GetUserResponse>
    {
        [FromRoute] public int UserId { get; set; }
        [FromBody] public JsonPatchDocument<PartialUserModel> Payload { get; set; }
    }

    public class PartialUserModel
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Availability { get; set; }
    }

    public class PartialUpdateUserHandler : IRequestHandler<PartialUpdateUser, GetUserResponse>
    {
        readonly RostersContext _context;
        public PartialUpdateUserHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetUserResponse> Handle(PartialUpdateUser request, CancellationToken cancellationToken)
        {
            var u  = _context.Users.SingleOrDefault(x => x.UserId == request.UserId);
            if (u == null) return null;

            var model = new PartialUserModel
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role,
                Availability = u.Availability
            };

            request.Payload.ApplyTo(model);

            u.FirstName = model.FirstName;
            u.LastName = model.LastName;
            u.Role = model.Role;
            u.Availability = model.Availability;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role,
                Availability = u.Availability
            };
        }
    }
}
