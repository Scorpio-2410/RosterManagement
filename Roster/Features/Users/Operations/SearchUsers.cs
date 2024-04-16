using MediatR;
using Roster.Features.Locations.Shared;
using Roster.Features.Shared;
using Roster.Features.Users.Shared;
using Rosters.Models;

namespace Roster.Features.Users.Operations
{
    public class SearchUsers : IRequest<SearchResponse<GetUserResponse>>
    {
        public string? LastName { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }

    public class SearchUsersHandler : IRequestHandler<SearchUsers, SearchResponse<GetUserResponse>>
    {
        readonly RostersContext _context;
        public SearchUsersHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<SearchResponse<GetUserResponse>> Handle(SearchUsers request, CancellationToken cancellationToken)
        {
            var uQuery = _context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.LastName))
            {
                uQuery = uQuery.Where(x => x.LastName == request.LastName.Trim());
            }
            
            var total = uQuery.Count();

            if (request.PageNumber <= 0) request.PageNumber = 1;

            var pageIndex = request.PageNumber - 1;


            var result = uQuery
                .Skip(pageIndex * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new GetUserResponse
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Role = x.Role,
                    Availability = x.Availability
                })
                .ToList();

            return new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = total,
                Result = result
            };
        }
    }
}
