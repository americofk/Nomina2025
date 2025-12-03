/// <summary>
/// Controlador para la gestión de proyectos activos.
/// Permite crear, editar, eliminar e inhabilitar proyectos de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    /// <summary>
    /// Controlador para gestion de Project.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("proyectosactivos")]
    public class ProjectController : ControllerBase
    {
        ProcessProject process;
        /// <summary>
        /// Ejecuta Projects de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> Projects()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessProject(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Project>.GetPropertyToSearch();

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

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(Project Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProject(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(Obj.ProjId, Obj);
                        break;

                }


            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdProject">Parametro IdProject.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> IdProject)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProject(dataUser[0]);

            responseUI = await process.DeleteDataAsync(IdProject);

            return (Json(responseUI));
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
            Project _model = new Project();
            process = new ProcessProject(dataUser[0]);

            _model = await process.GetDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>
        /// Obtiene todos los proyectos activos para dropdown.
        /// </summary>
        /// <returns>Lista de proyectos en formato JSON.</returns>
        [HttpGet("getall")]
        public async Task<JsonResult> GetAll()
        {
            GetdataUser();
            process = new ProcessProject(dataUser[0]);
            var model = await process.GetAllDataAsync();
            return Json(model);
        }

        /// <summary>
        /// Obtiene un registro por su ID para el modal de auditoría.
        /// </summary>
        /// <param name="ProjId">Identificador del proyecto.</param>
        /// <returns>Datos del proyecto en formato JSON.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string ProjId)
        {
            GetdataUser();
            Project _model = new Project();
            process = new ProcessProject(dataUser[0]);

            _model = await process.GetDataAsync(ProjId);

            return (Json(_model));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="IdProject">Parametro IdProject.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> IdProject)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProject(dataUser[0]);
            foreach (var item in IdProject)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta ProjectFilterOrMoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ProjectFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessProject(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("ProjectFilterOrMoreData", model);
        }
    }
}
