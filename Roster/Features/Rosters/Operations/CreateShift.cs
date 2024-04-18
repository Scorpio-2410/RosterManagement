using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Services;

namespace Roster.Features.Rosters.Operations
{
    public class CreateShift : IRequest<CreateShitResponse?>
    {
        [FromRoute] public int RosterId { get; set; }
        [FromBody] public CreateShiftPayload Payload { get; set; }
 
    }

    public class CreateShiftPayload
    {
        public int UserId { get; set; }

        public DateTime StartAt { get; set; }

        public DateTime EndAt { get; set; }
    }

    public class CreateShitResponse
    {
        public int ShiftId { get; set; }
    }

    public class CreateShiftHandler : IRequestHandler<CreateShift, CreateShitResponse?>
    {
        readonly RosterService _rosterService;

        public CreateShiftHandler(RosterService rosterService)
        {
            _rosterService = rosterService;
        }

        public async Task<CreateShitResponse?> Handle(CreateShift request, CancellationToken cancellationToken)
        {
            try
            {
                var payload = request.Payload;
                var (roster, shift) =
                    await _rosterService.AddShift(request.RosterId, payload.UserId, payload.StartAt, payload.EndAt);

                return new() { ShiftId = shift.ShiftId };
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
