/// <summary>
/// Controlador para la gestión de instructores de cursos.
/// Permite crear, editar, eliminar y listar instructores de capacitación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_Instructor.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("instructor")]
    public class M_InstructorController : ControllerBase
    {
        ProcessInstructor processInstructor;
        /// <summary>
        /// Ejecuta Instructor de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> Instructor()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processInstructor = new ProcessInstructor(dataUser[0]);
            var model = await processInstructor.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Instructor>.GetPropertyToSearch();

            return View(model);
        }

        /// <summary>

        /// Ejecuta Instructor_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Instructor_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processInstructor = new ProcessInstructor(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processInstructor.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Instructor_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Instructor Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processInstructor = new ProcessInstructor(dataUser[0]);

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
                        responseUI = await processInstructor.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processInstructor.PutDataAsync(Obj.InstructorId, Obj);
                        break;
                }

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ListIdInstructort">Parametro ListIdInstructort.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> ListIdInstructort)
        {
            GetdataUser();
            ResponseUI responseUI;
            processInstructor = new ProcessInstructor(dataUser[0]);

            responseUI = await processInstructor.DeleteDataAsync(ListIdInstructort);

            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("getbyid")]
        public async Task<JsonResult> getbyid(string Id)
        {
            GetdataUser();
            Instructor _model = new Instructor();
            processInstructor = new ProcessInstructor(dataUser[0]);
            _model = await processInstructor.Getbyid(Id);

            return (Json(_model));
        }
    }
}
