using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("generalconfig")]
    public class GeneralConfigController : ControllerBase
    {
        GeneralConfig process;
        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(GeneralConfigRequest model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new GeneralConfig(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                responseUI = await process.PostDataAsync(model);

            }

            return (Json(responseUI));
        }


        [HttpGet()]
        public async Task<ActionResult> GetGeneralConfig()
        {
            GetdataUser();
            process = new GeneralConfig(dataUser[0]);

            var list = await process.GetAllDataAsync();

            return PartialView("_GetGeneralConfig", list);
        }
    }
}
