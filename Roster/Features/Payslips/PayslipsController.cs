using MediatR;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Operations;
using Roster.Features.Payslips.Operations;
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


        [HttpGet("{PayslipId}")]
        public async Task<IActionResult> GetPayslip(GetPayslip request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchPayslips([FromBody] SearchPayslips request) =>
            Ok(await _mediator.Send(request));

        [HttpPut("{PayslipId}")]
        public async Task<IActionResult> UpdatePayslips(UpdatePayslips request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [HttpPatch("{PayslipId}")]
        public async Task<IActionResult> PatchPayslip(PartialUpdatePayslip request)
        {
            var response = await _mediator.Send(request);
            if (response == null) return NotFound();
            return Ok(response);
        }
    }
}
