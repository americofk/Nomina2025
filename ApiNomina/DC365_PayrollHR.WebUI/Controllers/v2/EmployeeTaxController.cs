using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeTaxes;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeTaxes;
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
    [Route("api/v2.0/employeetaxes")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeTaxController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeTaxResponse> _QueryHandler;
        private readonly IEmployeeTaxCommandHandler _CommandHandler;

        public EmployeeTaxController(IQueryHandler<EmployeeTaxResponse> queryHandler, IEmployeeTaxCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeTax, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpGet("{employeeid}/{taxid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeTax, View = true)]
        public async Task<ActionResult> GetById(string employeeid, string taxid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { employeeid, taxid });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeTax, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeTaxRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeTax, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeTax, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeTaxRequest model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
