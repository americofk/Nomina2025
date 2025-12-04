/// <summary>
/// Controlador para la gestión de tipos de cursos.
/// Permite crear, editar, eliminar y listar tipos de cursos de capacitación.
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
    /// Controlador para gestion de M_CourseType.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("tipocursos")]
    public class M_CourseTypeController : ControllerBase
    {
        ProcessCourseType processCourseType;
        /// <summary>
        /// Ejecuta CourseType de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> CourseType()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processCourseType = new ProcessCourseType(dataUser[0]);
            var model = await processCourseType.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<CourseType>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        private long GetUserRecIdFromSession()
        {
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias)) return GetConsistentHash(alias);
            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email)) return GetConsistentHash(email);
            return 0;
        }

        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;
            long hash = 5381;
            foreach (char c in input) hash = ((hash << 5) + hash) + c;
            return System.Math.Abs(hash);
        }

        /// <summary>

        /// Ejecuta CourseType_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> CourseType_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processCourseType = new ProcessCourseType(dataUser[0]);
            await GetLayoutDefauld();
            var model = await processCourseType.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);
            ViewBag.CountPageNumber = _PageNumber - 1;
            return PartialView("CourseType_Filter_OrMore_Data", model);
        }

        /// <summary>
        /// Endpoint AJAX para paginacion de tipos de cursos.
        /// </summary>
        [HttpGet("GetCourseTypesPaged")]
        public async Task<JsonResult> GetCourseTypesPaged(string searchValue = "", int pageNumber = 1, int pageSize = 20)
        {
            GetdataUser();
            processCourseType = new ProcessCourseType(dataUser[0]);

            string propertyName = "";
            if (!string.IsNullOrWhiteSpace(searchValue))
            {
                propertyName = "CourseTypeId,Name";
            }

            var pagedResult = await processCourseType.GetAllDataPagedAsync(propertyName, searchValue, pageNumber, pageSize);

            return Json(new
            {
                data = pagedResult.Data,
                pageNumber = pagedResult.PageNumber,
                pageSize = pagedResult.PageSize,
                totalRecords = pagedResult.TotalRecords,
                totalPages = pagedResult.TotalPages,
                hasPreviousPage = pagedResult.HasPreviousPage,
                hasNextPage = pagedResult.HasNextPage
            });
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(CourseType Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseType = new ProcessCourseType(dataUser[0]);

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
                        responseUI = await processCourseType.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processCourseType.PutDataAsync(Obj.CourseTypeId, Obj);
                        break;
                }
            }
            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ListIdTypeCourse">Parametro ListIdTypeCourse.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> ListIdTypeCourse)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseType = new ProcessCourseType(dataUser[0]);

            responseUI = await processCourseType.DeleteDataAsync(ListIdTypeCourse);

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
            CourseType _model = new CourseType();
            processCourseType = new ProcessCourseType(dataUser[0]);

            _model = await processCourseType.Getbyid(Id);

            return (Json(_model));
        }
    }
}
