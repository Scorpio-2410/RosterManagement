using MediatR;
using Roster.Services;

namespace Roster.Features.Rosters.Operations
{
    public class CreateShift : IRequest<CreateShitResponse?>
    {
        public int RosterId { get; set; }

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
                var (roster, shift) =
                    await _rosterService.AddShift(request.RosterId, request.UserId, request.StartAt, request.EndAt);

                return new() { ShiftId = shift.ShiftId };
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
