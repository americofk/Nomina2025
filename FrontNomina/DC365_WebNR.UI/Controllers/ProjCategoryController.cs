/// <summary>
/// Controlador para la gestión de categorías de proyectos activas.
/// Permite crear, editar, eliminar e inhabilitar categorías de proyectos.
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
    /// Controlador para gestion de ProjCategory.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("categoriaproyectoactivas")]
    public class ProjCategoryController : ControllerBase
    {
        ProcessProjCategory process;
        /// <summary>
        /// Ejecuta categoriasproyectos de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> categoriasproyectos()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessProjCategory(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<ProjCategory>.GetPropertyToSearch();

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

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdCategory">Parametro IdCategory.</param>

        /// <returns>Resultado de la operacion.</returns>

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

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="IdCategory">Parametro IdCategory.</param>

        /// <returns>Resultado de la operacion.</returns>

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

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            ProjCategory _model = new ProjCategory();
            process = new ProcessProjCategory(dataUser[0]);

            _model = await process.GetDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>
        /// Obtiene un registro por su ID para el modal de auditoría.
        /// </summary>
        /// <param name="ProjCategoryId">Identificador de la categoría de proyecto.</param>
        /// <returns>Datos de la categoría de proyecto en formato JSON.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string ProjCategoryId)
        {
            GetdataUser();
            ProjCategory _model = new ProjCategory();
            process = new ProcessProjCategory(dataUser[0]);

            _model = await process.GetDataAsync(ProjCategoryId);

            return (Json(_model));
        }

        /// <summary>

        /// Ejecuta ProjCategoryFilteOrMoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

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

        /// <summary>
        /// Endpoint AJAX para paginacion de categorias de proyectos.
        /// </summary>
        [HttpGet("GetProjCategoriesPaged")]
        public async Task<JsonResult> GetProjCategoriesPaged(string searchValue = "", int pageNumber = 1, int pageSize = 20)
        {
            GetdataUser();
            process = new ProcessProjCategory(dataUser[0]);

            string propertyName = "";
            if (!string.IsNullOrWhiteSpace(searchValue))
            {
                propertyName = "ProjCategoryId,CategoryName";
            }

            var pagedResult = await process.GetAllDataPagedAsync(propertyName, searchValue, pageNumber, pageSize);

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
        /// Obtiene las categorías de proyecto filtradas por proyecto.
        /// </summary>
        /// <param name="projId">Identificador del proyecto.</param>
        /// <returns>Lista de categorías del proyecto.</returns>
        [HttpGet("byproject/{projId}")]
        public async Task<JsonResult> GetByProject(string projId)
        {
            GetdataUser();
            process = new ProcessProjCategory(dataUser[0]);
            var model = await process.GetByProjectAsync(projId);
            return Json(model);
        }
    }
}
