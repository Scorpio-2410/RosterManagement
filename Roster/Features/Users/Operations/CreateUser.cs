using MediatR;
using Rosters.Models;

namespace Roster1.Features.Users.Operations
{
    public class CreateUser : IRequest<CreateUserResponse>
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Role { get; set; } = null!;

        public string? Availability { get; set; }
    }

    public class CreateUserResponse
    {
        public int UserId { get; set; }
    }
    public class CreateUserhandler : IRequestHandler<CreateUser, CreateUserResponse>
    {
        readonly RostersContext _context;
        public CreateUserhandler(RostersContext context)
        { 
            _context = context;
        }

        public async Task<CreateUserResponse> Handle(CreateUser request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Role = request.Role,
                Availability = request.Availability,
            };
            await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new() { UserId = user.UserId};
        }
    }
}
