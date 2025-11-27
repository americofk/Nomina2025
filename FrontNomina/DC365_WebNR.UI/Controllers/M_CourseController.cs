/// <summary>
/// Controlador para la gestión de cursos de capacitación.
/// Permite crear, editar, eliminar y listar cursos de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_Course.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cursos")]
    public class M_CourseController : ControllerBase
    {
        ProcessCourse processCourse;

        /// <summary>

        /// Ejecuta Courses de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Courses()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processCourse = new ProcessCourse(dataUser[0]);
            var ListCourse = await processCourse.GetAllDataAsync();
     
            ViewBag.Filter = FilterHelper<Course>.GetPropertyToSearch();
            ViewBag.CourseType = await selectListsDropDownList(SelectListOptions.CourseType);
            ViewBag.ClassRoomId = await selectListsDropDownList(SelectListOptions.ClassRoomId);
            ViewBag.CourseParentId = await selectListsDropDownList(SelectListOptions.CourseParentId);
            return View(ListCourse);
        }

        /// <summary>

        /// Ejecuta Course_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Course_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            
            GetdataUser();
            processCourse = new ProcessCourse(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await processCourse.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Course_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Course Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourse = new ProcessCourse(dataUser[0]);

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
                        responseUI = await processCourse.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processCourse.PutDataAsync(Obj.CourseId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="CourseId">Parametro CourseId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> CourseId)
        {
            GetdataUser();
            ResponseUI responseUI;
            processCourse = new ProcessCourse(dataUser[0]);

            responseUI = await processCourse.DeleteDataAsync(CourseId);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta TypeCourseDropDownList de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("Tiposdecursos")]
        public async Task<JsonResult> TypeCourseDropDownList()
        {
            GetdataUser();
            ProcessCourseType ProcesscourseType = new ProcessCourseType(dataUser[0]);
            var list = await ProcesscourseType.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Ejecuta ClassRoomDropDownList de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("SalonesdeCursos")]
        public async Task<JsonResult> ClassRoomDropDownList()
        {
            GetdataUser();
            ProcessClassRoom processClassRoom = new ProcessClassRoom(dataUser[0]);
            var list = await processClassRoom.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            Course _model = new Course();
            processCourse = new ProcessCourse(dataUser[0]);


            _model = await processCourse.GetIdDataAsync(Id);

            return (Json(_model));
        }
    }

}
