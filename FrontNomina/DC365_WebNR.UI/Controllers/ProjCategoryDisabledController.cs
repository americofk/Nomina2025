using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("categoriaproyectoinactivas")]
    public class ProjCategoryDisabledController : ControllerBase
    {
        ProcessProjCategoryDisabled process;
        [HttpGet]
        public async Task<IActionResult> categoriasproyectosinactivas()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessProjCategoryDisabled(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<ProjCategory>.GetPropertyToSearch();
            return View(model);
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> IdCategory)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjCategoryDisabled(dataUser[0]);

            responseUI = await process.DeleteDataAsync(IdCategory);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> IdCategory)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjCategoryDisabled(dataUser[0]);
            foreach (var item in IdCategory)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ProjCategoryDisabledFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessProjCategoryDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("ProjCategoryDisabledFilterOrMoreData", model);
        }

    }
}
