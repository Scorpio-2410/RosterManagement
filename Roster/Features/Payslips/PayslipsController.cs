using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rosters.Features.Locations.Operations;
using Rosters.Features.Payslips.Operations;

namespace Rosters.Features.Payslips
{
    [Route("[controller]")]
    [ApiController]
    public class PayslipsController : ControllerBase
    {
        readonly IMediator _mediator;
        public PayslipsController(IMediator mediator)//Injects MediatR 
        {
            _mediator = mediator;
        }
        [HttpPost] //Creates new resources
        public async Task<IActionResult> CreatePayslip([FromBody] CreatePayslip request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpGet("{PayslipId}")]
        public async Task<IActionResult> GetPayslip(GetPayslip request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }
    }
}
