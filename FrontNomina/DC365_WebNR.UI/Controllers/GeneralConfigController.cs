/// <summary>
/// Controlador para la configuración general del sistema.
/// Permite guardar y obtener parámetros de configuración generales.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de GeneralConfig.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("generalconfig")]
    public class GeneralConfigController : ControllerBase
    {
        GeneralConfig process;
        /// <summary>
        /// Guarda los cambios.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <param name="operation">Parametro operation.</param>
        /// <returns>Resultado de la operacion.</returns>
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


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <returns>Resultado de la operacion.</returns>


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
