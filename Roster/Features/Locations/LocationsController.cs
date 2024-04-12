using MediatR; //pattern 
using Microsoft.AspNetCore.Http; //web functions
using Microsoft.AspNetCore.Mvc; // web functions
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
        public async Task<IActionResult> CreateLocation([FromBody] CreateLocation request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpGet("{LocationId}")] //Feteches records, LocationId
        public async Task<IActionResult> GetLocation(GetLocation request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }
    }
}
