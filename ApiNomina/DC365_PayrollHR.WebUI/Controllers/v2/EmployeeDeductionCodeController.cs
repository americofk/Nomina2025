using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes;
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
    [Route("api/v2.0/employeedeductioncodes")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeDeductionCodeController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeDeductionCodeResponse> _QueryHandler;
        private readonly IEmployeeDeductionCodeCommandHandler _CommandHandler;

        public EmployeeDeductionCodeController(IQueryHandler<EmployeeDeductionCodeResponse> queryHandler, IEmployeeDeductionCodeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpGet("{employeeid}/{deductioncodeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, View = true)]
        public async Task<ActionResult> GetById(string employeeid, string deductioncodeid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { employeeid, deductioncodeid});
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeDeductionCodeRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeDeductionCodeRequestUpdate model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
