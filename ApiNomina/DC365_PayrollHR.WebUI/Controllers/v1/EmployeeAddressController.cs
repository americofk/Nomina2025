using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeesAddress;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeAddress;
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

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/employeeaddress")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeAddressController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeAddress> _QueryHandler;
        private readonly IEmployeeAddressCommandHandler _CommandHandler;

        public EmployeeAddressController(IQueryHandler<EmployeeAddress> queryHandler, IEmployeeAddressCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeAddress, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        
        [HttpGet("{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeAddress, View = true)]
        public async Task<ActionResult<Response<EmployeeAddress>>> GetById(string employeeid, int internalid)
        {
            var objectresult =  await _QueryHandler.GetId(new string[]{ employeeid, internalid.ToString()});
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeAddress, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeAddressRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeAddress, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByEmployeeId(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeAddress, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeAddressRequest model, string internalid)
        {
            var objectresult = await _CommandHandler.Update(internalid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
