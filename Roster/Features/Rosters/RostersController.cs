using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Rosters.Operations;
using Rosters.Features.Rosters.Operations;

namespace Rosters.Features.Rosters
{
    [Route("[controller]")]
    [ApiController]
    public class RostersController : ControllerBase
    {
        readonly IMediator _mediator;
        public RostersController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> CreateRoster([FromBody] CreateRoster request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{RosterId}")]
        public async Task<IActionResult> UpdateRoster(UpdateRoster request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchRosters([FromBody] SearchRosters request) =>
            Ok(await _mediator.Send(request));


        [HttpPost("{RosterId}/shifts")]
        public async Task<IActionResult> CreateShift(CreateShift request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("{RosterId}/shifts")]
        public async Task<IActionResult> GetRosterShifts(GetRosterShifts request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [HttpDelete("{RosterId}/shifts/{ShiftId}")]
        public async Task<IActionResult> DeleteShift(DeleteShift request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost("{RosterId}/payslips")]
        public async Task<IActionResult> CreatePayslips(CreatePayslips request)
        {
            var response = await _mediator.Send(request);
            if (response == null)
                return BadRequest(new ProblemDetails
                {
                    Title = "Roster is closed!",
                    Status = StatusCodes.Status400BadRequest
                });

            return Ok(response);
        }
    }
}
