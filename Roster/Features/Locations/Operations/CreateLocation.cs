using FluentValidation;
using MediatR;
using Roster.Models;

namespace Rosters.Features.Locations.Operations
{

    public class CreateLocation : IRequest<CreateLocationResponse> //Request of type CreateLocationResponse
    {
        public string Address1 { get; set; }
        public string? Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }

    public class CreateLocationResponse
    {
        public int LocationId { get; set; }
    }

    public class CreateLocationValidator : AbstractValidator<CreateLocation>
    {
        public CreateLocationValidator()
        {
            RuleFor(x => x.Address1).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.State).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
        }
    }

    public class CreateLocationHandler : IRequestHandler<CreateLocation, CreateLocationResponse> //Takes request to create new location and returns reponse
    {
        readonly RostersContext _context;

        public CreateLocationHandler(RostersContext context) //RosterDbContext to interact with database
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
