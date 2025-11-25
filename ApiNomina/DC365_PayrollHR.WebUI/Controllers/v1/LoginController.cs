using DC365_PayrollHR.Core.Application.CommandsAndQueries.Login;
using DC365_PayrollHR.Core.Application.Common.Model.User;
using DC365_PayrollHR.Core.Application.Common.Model.Users;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers
{
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
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Post([FromBody] LoginRequest _model)
        {
            return Ok(await _loginCommandHandler.Login(_model));
        }

        [HttpPost]
        [Route("requestchangepassword")]
        public async Task<ActionResult> RequestChangePassword([FromBody] string identification)
        {
            return Ok(await _loginCommandHandler.RequestChangePassword(identification));
        }

        [HttpPost]
        [Route("sendnewpassword")]
        public async Task<ActionResult> SendNewPassword([FromBody] UserChangePasswordRequest model)
        {
            return Ok(await _loginCommandHandler.SendNewPassword(model));
        }
    }
}
