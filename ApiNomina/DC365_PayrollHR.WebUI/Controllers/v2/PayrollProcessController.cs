using DC365_PayrollHR.Core.Application.CommandsAndQueries.PayrollsProcess;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.PayrollsProcess;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/payrollprocess")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class PayrollProcessController : ControllerBase
    {
        private readonly IPayrollProcessQueryHandler _QueryHandler;
        private readonly IPayrollProcessCommandHandler _CommandHandler;

        public PayrollProcessController(IPayrollProcessQueryHandler queryHandler, IPayrollProcessCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //Definir endpoint para procesos de nómina por nómina
        [HttpGet("payroll/{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> GetByPayrollId([FromQuery] PaginationFilter paginationFilter, string payrollid)
        {
            var objectresult = await _QueryHandler.GetByParent(paginationFilter, payrollid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> GetEnabledId(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> Post([FromBody] PayrollProcessRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PayrollProcessRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        [HttpPost("process/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> ProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.ProcessPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        [HttpPost("calculate/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> CalcProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.CalcProcessPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        [HttpPost("pay/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> PayProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.PayPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost("cancel/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> CancelProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.CancelPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
