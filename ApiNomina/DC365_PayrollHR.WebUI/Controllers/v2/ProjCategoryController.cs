using DC365_PayrollHR.Core.Application.CommandsAndQueries.ProjCategories;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.ProjCategories;
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
    [Route("api/v2.0/projcategories")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ProjCategoryController : ControllerBase
    {
        private readonly IQueryHandler<ProjCategory> _QueryHandler;
        private readonly IProjCategoryCommandHandler _CommandHandler;

        public ProjCategoryController(IQueryHandler<ProjCategory> queryHandler, IProjCategoryCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //[HttpGet("projcategorys/disabled")]
        //[AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, View = true)]
        //public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter)
        //{
        //    var objectresult = await _QueryHandler.GetAll(paginationFilter, false);
        //    return StatusCode(objectresult.StatusHttp, objectresult);

        //}

        [HttpGet("enabled/{projcategoryid}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, View = true)]
        public async Task<ActionResult> GetById(string projcategoryid)
        {
            var objectresult = await _QueryHandler.GetId(projcategoryid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] ProjCategoryRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] ProjCategoryRequestUpdate model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);

        }


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatus(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }









        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
