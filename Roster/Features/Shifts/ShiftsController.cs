using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rosters.Features.Shifts.Operations;


namespace Roster1.Features.Shifts
{
    [Route("[controller]")]
    [ApiController]
    public class ShiftsController : ControllerBase
    {
        readonly IMediator _mediator;
        public ShiftsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> CreateShift([FromBody] CreateShift request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpGet("{ShiftId}")]
        public async Task<IActionResult> GetShift(GetShift request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }
    }
}
