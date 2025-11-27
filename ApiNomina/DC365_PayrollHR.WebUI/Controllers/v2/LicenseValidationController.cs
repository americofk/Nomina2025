/// <summary>
/// Controlador API para gestión de LicenseValidation.
/// Endpoint base: api/v2/licensevalidation
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de LicenseValidation.
    /// </summary>
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
