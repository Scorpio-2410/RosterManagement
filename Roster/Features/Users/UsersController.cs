using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster1.Features.Users.Operations;

namespace Roster1.Features.Users
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController :ControllerBase
    {
        readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUser request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetUser(GetUser request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }


    }
}
