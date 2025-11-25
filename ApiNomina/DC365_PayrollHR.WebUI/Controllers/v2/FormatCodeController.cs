using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/regionalcodes")]
    [Authorize]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class FormatCodeController : ControllerBase
    {
        private readonly IQueryHandler<FormatCode> _QueryHandler;

        public FormatCodeController(IQueryHandler<FormatCode> queryHandler)
        {
            _QueryHandler = queryHandler;
        }


        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter);
            return StatusCode(objectresult.StatusHttp, objectresult);

        }
    }
}
