/// <summary>
/// Controlador para la gestión de instructores asignados a cursos.
/// Permite asignar, editar, eliminar instructores de cursos de capacitación.
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
    /// Controlador para gestion de CourseInstructor.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cursosinstructores")]
    public class CourseInstructorController : ControllerBase
    {
        ProcessCourseInstructor process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="courseid">Parametro courseid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{courseid}")]
        public async Task<ActionResult> Get(string courseid)
        {
            GetdataUser();
            process = new ProcessCourseInstructor(dataUser[0]);

            var list = await process.GetAllDataAsync(courseid);
            return PartialView("ListCourseInstructors", list);
        }

        /// <summary>

        /// Ejecuta NewCourseInstructors de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormCouseInstructors")]
        public async Task<ActionResult> NewCourseInstructors()
        {
            GetdataUser();
            CourseInstructors model = new CourseInstructors();
            ViewBag.InstructorId = await selectListsDropDownList(SelectListOptions.InstructorId);

            return PartialView("NewCourseInstructors", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(CourseInstructors model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessCourseInstructor(dataUser[0]);

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

        /// <param name="instructorId">Parametro instructorId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{courseid}/{instructorId}")]
        public async Task<ActionResult> GetId(string courseid, string instructorId)
        {
            GetdataUser();
            CourseInstructors _model;
            process = new ProcessCourseInstructor(dataUser[0]);

            _model = await process.GetDataAsync(courseid, instructorId);
            ViewBag.InstructorId = await selectListsDropDownList(SelectListOptions.InstructorId);
            return PartialView("NewCourseInstructors", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_CourseInstructors">Parametro listid_CourseInstructors.</param>

        /// <param name="courseid">Parametro courseid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_CourseInstructors, string courseid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessCourseInstructor(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_CourseInstructors, courseid);

            return (Json(responseUI));
        }

    }
}
