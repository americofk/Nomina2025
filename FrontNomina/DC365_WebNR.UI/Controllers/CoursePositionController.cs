/// <summary>
/// Controlador para la gestión de puestos requeridos por cursos.
/// Permite asignar, editar, eliminar puestos asociados a cursos.
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
    /// Controlador para gestion de CoursePosition.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cursospuestos")]
    public class CoursePositionController : ControllerBase
    {
        ProcessCoursePosition process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="courseid">Parametro courseid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{courseid}")]
        public async Task<ActionResult> Get(string courseid)
        {
            GetdataUser();
            process = new ProcessCoursePosition(dataUser[0]);

            var list = await process.GetAllDataAsync(courseid);
            return PartialView("ListCoursePosition", list);
        }

        /// <summary>

        /// Ejecuta NewCoursePosition de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormCoursePosition")]
        public async Task<ActionResult> NewCoursePosition()
        {
            GetdataUser();
            CoursePosition model = new CoursePosition();
            ViewBag.Position = await selectListsDropDownList(SelectListOptions.Position);

            return PartialView("NewCoursePosition", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(CoursePosition model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessCoursePosition(dataUser[0]);

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

        /// <param name="positionId">Parametro positionId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{courseid}/{positionId}")]
        public async Task<ActionResult> GetId(string courseid, string positionId)
        {
            GetdataUser();
            CoursePosition _model;
            process = new ProcessCoursePosition(dataUser[0]);

            _model = await process.GetDataAsync(courseid, positionId);
            ViewBag.Position = await selectListsDropDownList(SelectListOptions.Position);

            return PartialView("NewCoursePosition", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_CoursePosition">Parametro listid_CoursePosition.</param>

        /// <param name="courseid">Parametro courseid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_CoursePosition, string courseid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessCoursePosition(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_CoursePosition, courseid);

            return (Json(responseUI));
        }

    }
}
