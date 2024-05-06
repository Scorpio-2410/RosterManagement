using MediatR; //pattern 
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Operations; // web functions
using Rosters.Features.Locations.Operations;

namespace Rosters.Features.Locations
{
    [Route("[controller]")]
    [ApiController] //Automatically handles HTTP 400 response for model validation error.
    public class LocationsController : ControllerBase
    {
        readonly IMediator _mediator;
        public LocationsController(IMediator mediator)//Injects MediatR 
        {
            _mediator = mediator;
        }
        [HttpPost] //Creates new resources
        public async Task<IActionResult> CreateLocation([FromBody] CreateLocation request) =>
            Ok(await _mediator.Send(request));


        [HttpPost("search")]
        public async Task<IActionResult> SearchLocations([FromBody] SearchLocations request) =>
            Ok(await _mediator.Send(request));

        [HttpPatch("{LocationId}")]
        public async Task<IActionResult> PatchLocation(PartialUpdateLocation request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }
    }
}
