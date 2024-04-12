using Microsoft.AspNetCore.Mvc;

namespace Rosters.Features.PingPong
{
    [Route ("[Controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
       
        [HttpGet]
        public async Task<IActionResult> Ping()
        {
            return Ok("Pong");
        }
    }
}
