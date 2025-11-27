/// <summary>
/// Controlador para la gestión de vistas de usuario personalizadas de grids.
/// Permite crear, editar, eliminar y cargar configuraciones de vistas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestión de vistas de usuario.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("api/v2.0/usergridviews")]
    public class UserGridViewsController : ControllerBase
    {
        private ProcessUserGridViews processUserGridViews;

        /// <summary>
        /// Obtiene todas las vistas del usuario para una entidad específica.
        /// GET: api/v2.0/usergridviews?entityName=Department&userRefRecId=123
        /// </summary>
        /// <param name="entityName">Nombre de la entidad.</param>
        /// <param name="userRefRecId">RecId del usuario.</param>
        /// <returns>Lista de vistas disponibles.</returns>
        [HttpGet]
        public async Task<JsonResult> GetViews([FromQuery] string entityName, [FromQuery] long userRefRecId)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var views = await processUserGridViews.GetAllByEntityAsync(entityName, userRefRecId);
            return Json(new { Data = views, TotalCount = System.Linq.Enumerable.Count(views) });
        }

        /// <summary>
        /// Obtiene una vista específica por su ID.
        /// GET: api/v2.0/usergridviews/{recId}
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <returns>Vista encontrada o null.</returns>
        [HttpGet("{recId:long}")]
        public async Task<JsonResult> GetById(long recId)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var view = await processUserGridViews.GetByIdAsync(recId);
            return Json(view);
        }

        /// <summary>
        /// Crea una nueva vista de usuario.
        /// POST: api/v2.0/usergridviews
        /// </summary>
        /// <param name="model">Datos de la nueva vista.</param>
        /// <returns>Vista creada.</returns>
        [HttpPost]
        public async Task<JsonResult> Create([FromBody] UserGridView model)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var result = await processUserGridViews.PostDataAsync(model);
            if (result.Obj != null)
                return Json(result.Obj);
            return Json(new { Message = result.Message, Type = result.Type, Errors = result.Errors });
        }

        /// <summary>
        /// Actualiza una vista existente.
        /// PUT: api/v2.0/usergridviews
        /// </summary>
        /// <param name="model">Datos actualizados de la vista.</param>
        /// <returns>Vista actualizada.</returns>
        [HttpPut]
        public async Task<JsonResult> Update([FromBody] UserGridView model)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var result = await processUserGridViews.PutDataAsync(model);
            if (result.Obj != null)
                return Json(result.Obj);
            return Json(new { Message = result.Message, Type = result.Type, Errors = result.Errors });
        }

        /// <summary>
        /// Elimina una vista.
        /// DELETE: api/v2.0/usergridviews/{recId}
        /// </summary>
        /// <param name="recId">ID de la vista a eliminar.</param>
        /// <returns>Resultado de la operación.</returns>
        [HttpDelete("{recId:long}")]
        public async Task<JsonResult> Delete(long recId)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var result = await processUserGridViews.DeleteDataAsync(recId);
            return Json(new { Message = result.Message, Type = result.Type, Errors = result.Errors });
        }

        /// <summary>
        /// Establece una vista como predeterminada.
        /// POST: api/v2.0/usergridviews/{recId}/set-default
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <returns>Vista actualizada.</returns>
        [HttpPost("{recId:long}/set-default")]
        public async Task<JsonResult> SetDefault(long recId)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var result = await processUserGridViews.SetDefaultAsync(recId);
            if (result.Obj != null)
                return Json(result.Obj);
            return Json(new { Message = result.Message, Type = result.Type, Errors = result.Errors });
        }

        /// <summary>
        /// Registra el uso de una vista.
        /// POST: api/v2.0/usergridviews/{recId}/record-usage
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <returns>Resultado de la operación.</returns>
        [HttpPost("{recId:long}/record-usage")]
        public async Task<JsonResult> RecordUsage(long recId)
        {
            GetdataUser();
            processUserGridViews = new ProcessUserGridViews(dataUser[0]);
            var result = await processUserGridViews.RecordUsageAsync(recId);
            return Json(new { Type = result.Type });
        }
    }
}
