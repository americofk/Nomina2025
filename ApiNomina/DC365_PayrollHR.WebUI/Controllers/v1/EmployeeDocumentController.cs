using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDocuments;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDocuments;
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
    [Route("api/employeedocuments")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class EmployeeDocumentController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeDocumentResponse> _QueryHandler;
        private readonly IEmployeeDocumentCommandHandler _CommandHandler;

        public EmployeeDocumentController(IQueryHandler<EmployeeDocumentResponse> queryHandler, IEmployeeDocumentCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid));
        }

        [HttpGet("{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, View = true)]
        public async Task<ActionResult> GetById( string employeeid, int internalid)
        {
            return Ok(await _QueryHandler.GetId(new string[] { employeeid, internalid.ToString()}));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeDocumentRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByEmployee(ids, employeeid));
        }


        [HttpPut("{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeDocumentRequest model, string internalid)
        {
            return Ok(await _CommandHandler.Update(internalid, model));
        }

        [HttpPost("uploadimageuser/{employeeid}/{internalid}")]
        public async Task<ActionResult> PostDocument([FromForm] EmplDocFileRequest request, string employeeid, int internalid)
        {
            return Ok(await _CommandHandler.UploadDocument(request, employeeid, internalid));
        }


        [HttpGet("downloadimageuser/{employeeid}/{internalid}")]
        public async Task<ActionResult> GetDocument(string employeeid, int internalid)
        {
            return Ok(await _CommandHandler.DownloadDocument(employeeid, internalid));
        }
    }

}
