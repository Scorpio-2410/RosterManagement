using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Services;

namespace Roster.Features.Rosters.Operations
{
    public class DeleteShift : IRequest<bool>
    {
        [FromRoute] public int ShiftId { get; set; }
    }

    public class DeleteShiftHandler : IRequestHandler<DeleteShift, bool>
    {
        readonly RosterService _rosterService;

        public DeleteShiftHandler(RosterService rosterService)
        {
            _rosterService = rosterService;
        }

        public async Task<bool> Handle(DeleteShift request, CancellationToken cancellationToken)
        {
            try
            {
                var shift = await _rosterService.RemoveShift(request.ShiftId);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
