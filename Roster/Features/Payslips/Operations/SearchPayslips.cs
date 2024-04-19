using MediatR;
using Roster.Features.Payslips.Shared;
using Roster.Features.Shared;
using Roster.Models;

namespace Roster.Features.Payslips.Operations
{
    public class SearchPayslips : IRequest<SearchResponse<GetPayslipResponse>>
    {
        public DateTime PeriodFrom { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }
    public class SearchPayslipsHandler : IRequestHandler<SearchPayslips, SearchResponse<GetPayslipResponse>>
    {
        readonly RostersContext _context;
        public SearchPayslipsHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<SearchResponse<GetPayslipResponse>> Handle(SearchPayslips request, CancellationToken cancellationToken)
        {
            var pQuery = _context.Payslips.AsQueryable();

            if (request.PeriodFrom != DateTime.MinValue)
            {
                pQuery = pQuery.Where(x => x.PeriodFrom.Date == request.PeriodFrom.Date);
            }

            var total =  pQuery.Count();

            if(request.PageNumber <= 0) request.PageNumber = 1;

            var pageIndex = request.PageNumber - 1;

            var result = pQuery
                .Skip(pageIndex * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new GetPayslipResponse
                {
                    PayslipId = x.PayslipId,
                    UserId = x.UserId,
                    PeriodFrom = x.PeriodFrom,
                    PeriodTo = x.PeriodTo,
                    TotalMinutes = x.TotalMinutes,
                    GrossIncome = x.GrossIncome,
                    TaxAmount = x.TaxAmount,
                    NetIncome = x.NetIncome,
                }).ToList();

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
