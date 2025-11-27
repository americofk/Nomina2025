/// <summary>
/// Controlador API para gestión de Login.
/// Endpoint base: api/login
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Login;
using DC365_PayrollHR.Core.Application.Common.Model.User;
using DC365_PayrollHR.Core.Application.Common.Model.Users;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de Login.
    /// </summary>
    [Route("api")]   
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class LoginController : ControllerBase
    {
        private readonly ILoginCommandHandler _loginCommandHandler;

        public LoginController(ILoginCommandHandler loginCommandHandler)
        {
            _loginCommandHandler = loginCommandHandler;
        }

        // POST api/<LoginController>
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Post([FromBody] LoginRequest _model)
        {
            return Ok(await _loginCommandHandler.Login(_model));
        }

        /// <summary>

        /// Ejecuta RequestChangePassword de forma asincrona.

        /// </summary>

        /// <param name="identification">Parametro identification.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [Route("requestchangepassword")]
        public async Task<ActionResult> RequestChangePassword([FromBody] string identification)
        {
            return Ok(await _loginCommandHandler.RequestChangePassword(identification));
        }

        /// <summary>

        /// Envia.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [Route("sendnewpassword")]
        public async Task<ActionResult> SendNewPassword([FromBody] UserChangePasswordRequest model)
        {
            return Ok(await _loginCommandHandler.SendNewPassword(model));
        }
    }
}
