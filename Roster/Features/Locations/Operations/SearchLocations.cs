using FluentValidation;
using MediatR;
using Roster.Features.Locations.Shared;
using Roster.Features.Shared;
using Roster.Models;
using System.Data;

namespace Roster.Features.Locations.Operations
{
    public class SearchLocations : IRequest<SearchResponse<GetLocationResponse>>
    {
        public string? State { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }

    public class SearchLocationsHandler : IRequestHandler<SearchLocations, SearchResponse<GetLocationResponse>>
    {
        readonly RostersContext _context;

        public SearchLocationsHandler(RostersContext context)
        {
            _context = context;
        }
        public async Task<SearchResponse<GetLocationResponse>> Handle(SearchLocations request, CancellationToken cancellationToken)
        {
            var lQuery = _context.Locations.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.State))
            {
                lQuery = lQuery.Where(x => x.State == request.State.Trim());
            }

            var total = lQuery.Count();

            if (request.PageNumber <= 0) request.PageNumber = 1;

            var pageIndex = request.PageNumber - 1;


            var result = lQuery
                .Skip(pageIndex * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new GetLocationResponse
                {
                    LocationId = x.LocationId,
                    Address1 = x.Address1,
                    Address2 = x.Address2,
                    City = x.City,
                    State = x.State,
                    Country = x.Country
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
