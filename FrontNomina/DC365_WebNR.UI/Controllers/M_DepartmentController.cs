using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;

namespace DC365_WebNR.UI.Controllers
{

    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("departamentosactivos")]
    public class M_DepartmentController : ControllerBase
    {
        ProcessDepartament processDepartament;

        [HttpGet]
        public async Task<IActionResult> Departments()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processDepartament = new ProcessDepartament(dataUser[0]);
            var model = await processDepartament.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Department>.GetPropertyToSearch();

            return View(model);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(Department Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartament(dataUser[0]);

            // Establecer DataAreaId desde la sesión si está vacío
            if (string.IsNullOrEmpty(Obj.DataAreaId))
            {
                Obj.DataAreaId = dataUser[3]; // CodeCompanies
            }

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
                        responseUI = await processDepartament.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processDepartament.PutDataAsync(Obj.DepartmentId, Obj);
                        break;

                }


            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> ListIdDepartment)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartament(dataUser[0]);

            responseUI = await processDepartament.DeleteDataAsync(ListIdDepartment);

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Departament_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processDepartament = new ProcessDepartament(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processDepartament.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Departament_Filter_OrMore_Data", model);
        }


        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> DepartmentId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartament(dataUser[0]);
            foreach (var item in DepartmentId)
            {
                responseUI = await processDepartament.UpdateStatusDepartment(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("getbyid")]
        public async Task<JsonResult> getbyid(string Id)
        {
            GetdataUser();
            Department _model = new Department();
            processDepartament = new ProcessDepartament(dataUser[0]);

            _model = await processDepartament.Getbyid(Id);

            return (Json(_model));
        }
    }
}
