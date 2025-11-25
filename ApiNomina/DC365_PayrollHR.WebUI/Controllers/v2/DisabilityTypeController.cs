using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
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
    [Route("api/v2.0/disabilitytypes")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class DisabilityTypeController : ControllerBase
    {
        private readonly IQueryAllWithoutSearchHandler<DisabilityType> _queryHandler;

        public DisabilityTypeController(IQueryAllWithoutSearchHandler<DisabilityType> queryHandler)
        {
            _queryHandler = queryHandler;
        }

        [HttpGet]
        public async Task<ActionResult<Response<string>>> Get([FromQuery] PaginationFilter filter)
        {
            var objectresult = await _queryHandler.GetAll(filter);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
