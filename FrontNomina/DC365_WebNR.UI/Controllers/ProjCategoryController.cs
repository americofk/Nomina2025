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
    [Route("categoriaproyectoactivas")]
    public class ProjCategoryController : ControllerBase
    {
        ProcessProjCategory process;
        [HttpGet]
        public async Task<IActionResult> categoriasproyectos()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessProjCategory(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<ProjCategory>.GetPropertyToSearch();
            return View(model);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(ProjCategory Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjCategory(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operacion)
                {
                    case "1":
                        responseUI = await process.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(Obj.ProjCategoryId, Obj);
                        break;

                }


            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> IdCategory)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjCategory(dataUser[0]);

            responseUI = await process.DeleteDataAsync(IdCategory);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> IdCategory)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjCategory(dataUser[0]);
            foreach (var item in IdCategory)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            ProjCategory _model = new ProjCategory();
            process = new ProcessProjCategory(dataUser[0]);

            _model = await process.GetDataAsync(Id);

            return (Json(_model));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ProjCategoryFilteOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessProjCategory(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("ProjCategoryFilteOrMoreData", model);
        }
    }
}
