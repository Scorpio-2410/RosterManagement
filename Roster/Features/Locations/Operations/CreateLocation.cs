using MediatR;
using Rosters.Models;

namespace Rosters.Features.Locations.Operations
{

    public class CreateLocation : IRequest<CreateLocationResponse> //Request of type CreateLocationResponse
    {
        public string Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string State { get; set; }
        public string? Country { get; set; }
    }

    public class CreateLocationResponse
    {
        public int LocationId { get; set; }
    }
    public class CreateLocationhandler : IRequestHandler<CreateLocation, CreateLocationResponse> //Takes request to create new location and returns reponse
    {
        private RostersContext _context;

        public CreateLocationhandler(RostersContext context) //RosterDbContext to interact with database
        {
            _context = context;

        }
        public async Task<CreateLocationResponse> Handle(CreateLocation request, CancellationToken cancellationToken) //Business logic of creating a new locaiton
        {
            var location = new Location
            {
                Address1 = request.Address1,
                Address2 = request.Address2,
                City = request.City,
                State = request.State,
                Country = request.Country,
            };

            await _context.Locations.AddAsync(location, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new() { LocationId = location.LocationId };
        }
    }
}
