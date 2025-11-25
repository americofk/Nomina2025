using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/employeedeductioncodes")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class EmployeeDeductionCodeController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeDeductionCode> _QueryHandler;
        private readonly IEmployeeDeductionCodeCommandHandler _CommandHandler;

        public EmployeeDeductionCodeController(IQueryHandler<EmployeeDeductionCode> queryHandler, IEmployeeDeductionCodeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeDeductionCodeRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByParent(ids, employeeid));
        }


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDeductionCode, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeDeductionCodeRequestUpdate model, string employeeid)
        {
            return Ok(await _CommandHandler.Update(employeeid, model));
        }
    }

}
