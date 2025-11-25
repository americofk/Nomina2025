using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Payrolls;
using DC365_PayrollHR.Core.Application.StoreServices.Payrolls;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/payrolls")]
    [ApiController]
    public class PayrollController : ControllerBase
    {
        private readonly IQueryHandler<Payroll> QueryHandler;
        private readonly IPayrollCommandHandler CommandHandler;

        public PayrollController(IQueryHandler<Payroll> _QueryHandler, IPayrollCommandHandler _CommandHandler)
        {
            QueryHandler = _QueryHandler;
            CommandHandler = _CommandHandler;
        }

        // GET: api/<PayrollController>
        [HttpGet]
        public async Task<ActionResult<PagedResponse<Payroll>>> Get([FromQuery] PaginationFilter filter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await QueryHandler.GetAll(filter, searchFilter));
        }

        [HttpGet("{payrollid}")]
        public async Task<ActionResult<PagedResponse<Payroll>>> GetById(string payrollid)
        {
            return Ok(await QueryHandler.GetId(payrollid));
        }

        [HttpPost]
        public async Task<ActionResult<Response<string>>> Post([FromBody] PayrollRequest _model)
        {
            return Ok(await CommandHandler.Create(_model));
        }


        [HttpPut("{payrollid}")]
        public async Task<ActionResult> Update([FromBody] PayrollRequestUpdate model, string payrollid)
        {
            return Ok(await CommandHandler.Update(payrollid, model));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(List<string> ids)
        {
            return Ok(await CommandHandler.Delete(ids));
        }
    }
}
