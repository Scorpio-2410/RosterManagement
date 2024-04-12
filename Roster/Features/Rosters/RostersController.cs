using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rosters.Features.Locations.Operations;
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
        [HttpGet("{RosterId}")]
        public async Task<IActionResult> GetRoster(GetRoster request)
        {
            var response = await _mediator.Send(request);
            if(response == null) return NotFound();
            return Ok(response);
        }

    }
}
