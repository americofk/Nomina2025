using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/licensevalidations")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class LicenseValidationController : ControllerBase
    {
        //private readonly ILicenseValidationQueryHandler _QueryHandler;

        //public LicenseValidationController(ILicenseValidationQueryHandler queryHandler)
        //{
        //    _queryHandler = queryHandler;
        //}

        //[HttpGet]
        //public async Task<ActionResult> GetEnabled([FromQuery] string licensekey)
        //{
        //    var objectresult = await _QueryHandler.ValidateLicense(licensekey);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}

        //[HttpGet]
        //public async Task<ActionResult> GetEnabled([FromQuery] string licensekey)
        //{
        //    var objectresult = await _QueryHandler.ValidateLicense(licensekey);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}


    }
}
