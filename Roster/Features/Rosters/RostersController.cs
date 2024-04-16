using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Operations;
using Roster.Features.Rosters.Operations;
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
        [HttpPost("search")]
        public async Task<IActionResult> SearchRosters([FromBody] SearchRosters request) =>
            Ok(await _mediator.Send(request));

        [HttpPut("{RosterId}")]
        public async Task<IActionResult> UpdateRoster(UpdateRoster request)
        {
            var response = await _mediator.Send(request);
            if(response == null) return NotFound();
            return Ok(response);
        }

        [HttpPatch("{RosterId}")]
        public async Task<IActionResult> PatchRoster(PartialUpdateRoster request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }

    }
}
