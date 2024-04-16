using MediatR;
using Roster.Features.Locations.Shared;
using Roster.Features.Shared;
using Roster.Features.Shifts.Shared;
using Rosters.Models;

namespace Roster.Features.Shifts.Operations
{
    public class SearchShifts : IRequest<SearchResponse<GetShiftResponse>>
    {
        public decimal? CostRateHourly { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }

    public class SearchShiftHandler : IRequestHandler<SearchShifts, SearchResponse<GetShiftResponse>>
    {
        readonly RostersContext _context;

        public SearchShiftHandler(RostersContext context)
        {
             _context = context;
        }
        public async Task<SearchResponse<GetShiftResponse>> Handle(SearchShifts request, CancellationToken cancellationToken)
        {
            var sQuery = _context.Shifts.AsQueryable();

            if (request.CostRateHourly.HasValue && request.CostRateHourly.Value >= 0)
            {
                sQuery = sQuery.Where(x => x.CostRateHourly == request.CostRateHourly.Value);
            }

            var total = sQuery.Count();

            if (request.PageNumber <= 0) request.PageNumber = 1;

            var pageIndex = request.PageNumber - 1;

            var result = sQuery
               .Skip(pageIndex * request.PageSize)
               .Take(request.PageSize)
               .Select(x => new GetShiftResponse
               {
                   StartAt = x.StartAt,
                   EndAt = x.EndAt,
                   CostRateHourly = x.CostRateHourly,
                   TotalHours = x.TotalHours,
                   TotalCost = x.TotalCost
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
