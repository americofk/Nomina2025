/// <summary>
/// Controlador API para gestión de vistas de usuario (UserGridViews).
/// Permite guardar, actualizar, eliminar y cargar configuraciones de vistas personalizadas.
/// Endpoint base: api/v2/usergridviews
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestión de vistas de usuario.
    /// </summary>
    [Route("api/v2.0/usergridviews")]
    [ApiController]
    [Authorize]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class UserGridViewsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserInformation _currentUser;

        /// <summary>
        /// Constructor del controlador.
        /// </summary>
        /// <param name="context">Contexto de base de datos.</param>
        /// <param name="currentUser">Información del usuario actual.</param>
        public UserGridViewsController(IApplicationDbContext context, ICurrentUserInformation currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        /// <summary>
        /// Obtiene todas las vistas del usuario para una entidad específica.
        /// </summary>
        /// <param name="entityName">Nombre de la entidad (ej: "Department").</param>
        /// <param name="userRefRecId">RecId del usuario (opcional, usa el actual si no se especifica).</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>Lista de vistas disponibles.</returns>
        [HttpGet]
        public async Task<ActionResult> GetViews(
            [FromQuery] string entityName,
            [FromQuery] long? userRefRecId = null,
            CancellationToken ct = default)
        {
            var userId = userRefRecId ?? 0;

            var query = _context.UserGridViews.AsNoTracking()
                .Where(x => x.EntityName == entityName);

            // Filtrar por usuario o vistas públicas
            if (userId > 0)
            {
                query = query.Where(x => x.UserRefRecId == userId || x.ViewScope == "Public" || x.ViewScope == "Company");
            }

            var views = await query
                .OrderByDescending(x => x.IsDefault)
                .ThenBy(x => x.ViewName)
                .ToListAsync(ct);

            return Ok(new
            {
                Data = views,
                TotalCount = views.Count
            });
        }

        /// <summary>
        /// Obtiene una vista específica por su ID.
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>Vista encontrada o NotFound.</returns>
        [HttpGet("{recId:long}")]
        public async Task<ActionResult> GetById(long recId, CancellationToken ct = default)
        {
            var view = await _context.UserGridViews.AsNoTracking()
                .FirstOrDefaultAsync(x => x.RecId == recId, ct);

            if (view == null)
                return NotFound(new { Message = "Vista no encontrada." });

            return Ok(view);
        }

        /// <summary>
        /// Crea una nueva vista de usuario.
        /// </summary>
        /// <param name="request">Datos de la nueva vista.</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>Vista creada.</returns>
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] UserGridViewRequest request, CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Si se marca como predeterminada, quitar el flag de otras vistas
            if (request.IsDefault)
            {
                var existingDefaults = await _context.UserGridViews
                    .Where(x => x.UserRefRecId == request.UserRefRecId
                             && x.EntityName == request.EntityName
                             && x.IsDefault)
                    .ToListAsync(ct);

                foreach (var v in existingDefaults)
                {
                    v.IsDefault = false;
                }
            }

            var entity = new UserGridView
            {
                UserRefRecId = request.UserRefRecId,
                EntityName = request.EntityName,
                ViewType = request.ViewType ?? "Grid",
                ViewScope = request.ViewScope ?? "Private",
                RoleRefRecId = request.RoleRefRecId,
                ViewName = request.ViewName,
                ViewDescription = request.ViewDescription,
                IsDefault = request.IsDefault,
                IsLocked = request.IsLocked,
                ViewConfig = request.ViewConfig ?? "{}",
                SchemaVersion = request.SchemaVersion > 0 ? request.SchemaVersion : 1,
                Checksum = request.Checksum,
                UsageCount = 0,
                Tags = request.Tags
            };

            _context.UserGridViews.Add(entity);
            await _context.SaveChangesAsync(ct);

            return CreatedAtAction(nameof(GetById), new { recId = entity.RecId }, entity);
        }

        /// <summary>
        /// Actualiza una vista existente.
        /// </summary>
        /// <param name="request">Datos actualizados de la vista.</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>Vista actualizada.</returns>
        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UserGridViewRequest request, CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (request.RecId <= 0)
                return BadRequest(new { Message = "RecId es requerido para actualizar." });

            var entity = await _context.UserGridViews
                .FirstOrDefaultAsync(x => x.RecId == request.RecId, ct);

            if (entity == null)
                return NotFound(new { Message = "Vista no encontrada." });

            // Si se marca como predeterminada, quitar el flag de otras vistas
            if (request.IsDefault && !entity.IsDefault)
            {
                var existingDefaults = await _context.UserGridViews
                    .Where(x => x.UserRefRecId == request.UserRefRecId
                             && x.EntityName == request.EntityName
                             && x.RecId != request.RecId
                             && x.IsDefault)
                    .ToListAsync(ct);

                foreach (var v in existingDefaults)
                {
                    v.IsDefault = false;
                }
            }

            entity.ViewName = request.ViewName;
            entity.ViewDescription = request.ViewDescription;
            entity.ViewType = request.ViewType ?? entity.ViewType;
            entity.ViewScope = request.ViewScope ?? entity.ViewScope;
            entity.RoleRefRecId = request.RoleRefRecId;
            entity.IsDefault = request.IsDefault;
            entity.IsLocked = request.IsLocked;
            entity.ViewConfig = request.ViewConfig ?? entity.ViewConfig;
            entity.SchemaVersion = request.SchemaVersion > 0 ? request.SchemaVersion : entity.SchemaVersion;
            entity.Checksum = request.Checksum;
            entity.Tags = request.Tags;

            await _context.SaveChangesAsync(ct);

            return Ok(entity);
        }

        /// <summary>
        /// Elimina una vista.
        /// </summary>
        /// <param name="recId">ID de la vista a eliminar.</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>NoContent si se eliminó correctamente.</returns>
        [HttpDelete("{recId:long}")]
        public async Task<ActionResult> Delete(long recId, CancellationToken ct = default)
        {
            var entity = await _context.UserGridViews
                .FirstOrDefaultAsync(x => x.RecId == recId, ct);

            if (entity == null)
                return NotFound(new { Message = "Vista no encontrada." });

            if (entity.IsLocked)
                return BadRequest(new { Message = "La vista está bloqueada y no puede eliminarse." });

            _context.UserGridViews.Remove(entity);
            await _context.SaveChangesAsync(ct);

            return NoContent();
        }

        /// <summary>
        /// Establece una vista como predeterminada.
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>Vista actualizada.</returns>
        [HttpPost("{recId:long}/set-default")]
        public async Task<ActionResult> SetDefault(long recId, CancellationToken ct = default)
        {
            var entity = await _context.UserGridViews
                .FirstOrDefaultAsync(x => x.RecId == recId, ct);

            if (entity == null)
                return NotFound(new { Message = "Vista no encontrada." });

            // Quitar el flag de otras vistas del mismo usuario/entidad
            var existingDefaults = await _context.UserGridViews
                .Where(x => x.UserRefRecId == entity.UserRefRecId
                         && x.EntityName == entity.EntityName
                         && x.IsDefault)
                .ToListAsync(ct);

            foreach (var v in existingDefaults)
            {
                v.IsDefault = false;
            }

            entity.IsDefault = true;
            await _context.SaveChangesAsync(ct);

            return Ok(entity);
        }

        /// <summary>
        /// Incrementa el contador de uso de una vista.
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <param name="ct">Token de cancelación.</param>
        /// <returns>Vista actualizada.</returns>
        [HttpPost("{recId:long}/record-usage")]
        public async Task<ActionResult> RecordUsage(long recId, CancellationToken ct = default)
        {
            var entity = await _context.UserGridViews
                .FirstOrDefaultAsync(x => x.RecId == recId, ct);

            if (entity == null)
                return NotFound(new { Message = "Vista no encontrada." });

            entity.UsageCount++;
            entity.LastUsedOn = DateTime.Now;
            await _context.SaveChangesAsync(ct);

            return Ok(entity);
        }
    }

    /// <summary>
    /// Modelo de solicitud para crear/actualizar vistas de usuario.
    /// </summary>
    public class UserGridViewRequest
    {
        /// <summary>
        /// ID del registro (requerido para actualizar).
        /// </summary>
        public long RecId { get; set; }

        /// <summary>
        /// RecId del usuario propietario.
        /// </summary>
        public long UserRefRecId { get; set; }

        /// <summary>
        /// Nombre de la entidad (ej: "Department").
        /// </summary>
        public string EntityName { get; set; }

        /// <summary>
        /// Tipo de vista: Grid, Kanban, Calendar.
        /// </summary>
        public string ViewType { get; set; } = "Grid";

        /// <summary>
        /// Ámbito: Private, Company, Role, Public.
        /// </summary>
        public string ViewScope { get; set; } = "Private";

        /// <summary>
        /// RecId del rol (si ViewScope es Role).
        /// </summary>
        public long? RoleRefRecId { get; set; }

        /// <summary>
        /// Nombre de la vista.
        /// </summary>
        public string ViewName { get; set; }

        /// <summary>
        /// Descripción opcional.
        /// </summary>
        public string ViewDescription { get; set; }

        /// <summary>
        /// Es la vista predeterminada.
        /// </summary>
        public bool IsDefault { get; set; }

        /// <summary>
        /// Está bloqueada para edición.
        /// </summary>
        public bool IsLocked { get; set; }

        /// <summary>
        /// Configuración JSON de la vista.
        /// </summary>
        public string ViewConfig { get; set; } = "{}";

        /// <summary>
        /// Versión del esquema.
        /// </summary>
        public int SchemaVersion { get; set; } = 1;

        /// <summary>
        /// Checksum SHA-256 del JSON.
        /// </summary>
        public string Checksum { get; set; }

        /// <summary>
        /// Etiquetas separadas por comas.
        /// </summary>
        public string Tags { get; set; }
    }
}
