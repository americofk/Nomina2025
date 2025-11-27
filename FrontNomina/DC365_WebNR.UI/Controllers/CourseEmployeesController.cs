/// <summary>
/// Controlador para la gestión de empleados inscritos en cursos.
/// Permite asignar, editar, eliminar empleados de cursos de capacitación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de CourseEmployees.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cursosempleados")]
    public class CourseEmployeesController : ControllerBase
    {
        ProcessCourseEmployees process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="courseid">Parametro courseid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{courseid}")]
        public async Task<ActionResult> Get(string courseid)
        {
            GetdataUser();
            process = new ProcessCourseEmployees(dataUser[0]);

            var list = await process.GetAllDataAsync(courseid);
            return PartialView("ListCourseEmployees", list);
        }

        /// <summary>

        /// Ejecuta NewCourseEmployees de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormCourseEmployees")]
        public async Task<ActionResult> NewCourseEmployees()
        {
            GetdataUser();
            CourseEmployees model = new CourseEmployees();
            ViewBag.EmployeeId = await selectListsDropDownList(SelectListOptions.EmployeeId);

            return PartialView("NewCourseEmployees", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(CourseEmployees model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessCourseEmployees(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operation)
                {
                    case "1":
                        responseUI = await process.PostDataAsync(model);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(model.CourseId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="courseid">Parametro courseid.</param>


        /// <param name="internalId">Parametro internalId.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("{courseid}/{internalId}")]
        public async Task<ActionResult> GetId(string courseid, string internalId)
        {
            GetdataUser();
            CourseEmployees _model;
            process = new ProcessCourseEmployees(dataUser[0]);

            _model = await process.GetDataAsync(courseid, internalId);
            ViewBag.Employeesid = await selectListsDropDownList(SelectListOptions.EmployeeId);

            return PartialView("NewCourseEmployees", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_CourseEmployees">Parametro listid_CourseEmployees.</param>

        /// <param name="courseid">Parametro courseid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_CourseEmployees, string courseid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessCourseEmployees(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_CourseEmployees, courseid);

            return (Json(responseUI));
        }
    }
}
