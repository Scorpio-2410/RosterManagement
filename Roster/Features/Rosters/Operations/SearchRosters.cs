using FluentValidation;
using MediatR;
using Roster.Features.Rosters.Shared;
using Roster.Features.Shared;
using Roster.Models;

namespace Roster.Features.Rosters.Operations
{
    public class SearchRosters : IRequest<SearchResponse<GetRosterResponse>>
    {
        public DateTime StartingWeek { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }

    public class SearchRosterHandler : IRequestHandler<SearchRosters, SearchResponse<GetRosterResponse>>
    {
        readonly RostersContext _context;

        public SearchRosterHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<SearchResponse<GetRosterResponse>> Handle(SearchRosters request, CancellationToken cancellationToken)
        {
            var rQuery = _context.Rosters.AsQueryable();

            if (request.StartingWeek != DateTime.MinValue)
            {
                rQuery = rQuery.Where(x => x.StartingWeek.Date == request.StartingWeek.Date);
            }
            var total = rQuery.Count();

            if (request.PageNumber <= 0) request.PageNumber = 1;

            var pageIndex = request.PageNumber - 1;

            var result = rQuery
                .Skip(pageIndex * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new GetRosterResponse
                {
                    RosterId = x.RosterId,
                    LocationId = x.LocationId,
                    StartingWeek = x.StartingWeek,
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
