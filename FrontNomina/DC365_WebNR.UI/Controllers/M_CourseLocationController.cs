/// <summary>
/// Controlador para la gestión de ubicaciones de cursos.
/// Permite crear, editar, eliminar y listar ubicaciones de capacitación.
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
    /// Controlador para gestion de M_CourseLocation.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("ubicacioncursos")]
    public class M_CourseLocationController : ControllerBase
    {
        ProcessCourseLocation processCourseLocation;
        /// <summary>
        /// Ejecuta CourseLocation de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> CourseLocation()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processCourseLocation = new ProcessCourseLocation(dataUser[0]);
            var model = await processCourseLocation.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<CourseLocation>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        /// <summary>
        /// Obtiene el identificador unico del usuario para el sistema de vistas.
        /// Genera un hash numerico consistente basado en el Alias del usuario.
        /// </summary>
        /// <returns>Identificador numerico del usuario.</returns>
        private long GetUserRecIdFromSession()
        {
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias))
            {
                return GetConsistentHash(alias);
            }

            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email))
            {
                return GetConsistentHash(email);
            }

            return 0;
        }

        /// <summary>
        /// Genera un hash numerico consistente que no varia entre ejecuciones.
        /// </summary>
        /// <param name="input">Cadena de entrada.</param>
        /// <returns>Hash numerico positivo.</returns>
        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;

            long hash = 5381;
            foreach (char c in input)
            {
                hash = ((hash << 5) + hash) + c;
            }
            return System.Math.Abs(hash);
        }

        /// <summary>

        /// Ejecuta CourseLocation_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> CourseLocation_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processCourseLocation.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("CourseLocation_Filter_OrMore_Data", model);
        }


        /// <summary>


        /// Guarda los cambios.


        /// </summary>


        /// <param name="Obj">Parametro Obj.</param>


        /// <param name="operacion">Parametro operacion.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(CourseLocation Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);

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
                        responseUI = await processCourseLocation.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processCourseLocation.PutDataAsync(Obj.CourseLocationId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ListLocationId">Parametro ListLocationId.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("eliminar")]
        public async Task<JsonResult> delete(List<string> ListLocationId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);


            responseUI = await processCourseLocation.DeleteDataAsync(ListLocationId);

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
            CourseLocation _model = new CourseLocation();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);
            _model = await processCourseLocation.Getbyid(Id);

            return (Json(_model));
        }
    }
}
