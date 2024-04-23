using MediatR;
using Microsoft.EntityFrameworkCore;
using Roster.Models;

namespace Rosters.Features.Rosters.Operations
{
    public class CreateRoster : IRequest<CreateRosterResponse>
    {
        public int LocationId { get; set; } 
        public DateTime StartingWeek { get; set; }
    }

    public class CreateRosterResponse
    {
        public int RosterId { get; set; }
    }

    public class CreateRosterhandler : IRequestHandler<CreateRoster, CreateRosterResponse>
    {
        private RostersContext _context;    
        
        public CreateRosterhandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<CreateRosterResponse> Handle(CreateRoster request, CancellationToken cancellationToken)
        {
            
            
            var ExistingRosterCheck = await _context.Rosters.AnyAsync(x => x.LocationId == request.LocationId && x.StartingWeek == request.StartingWeek);

            if (ExistingRosterCheck)
                throw new InvalidOperationException("Identical roster cannot be created");

            var roster = new Roster.Models.Roster()
            {
                LocationId = request.LocationId,
                StartingWeek = request.StartingWeek
            };

            await _context.Rosters.AddAsync(roster, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new() { RosterId = roster.RosterId };
        }
    }
}