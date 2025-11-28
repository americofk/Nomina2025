/// <summary>
/// Controlador para la gestión de registros de auditoría ISO 27001.
/// Solo permite operaciones de lectura/visualización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
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
    /// Controlador para visualización de registros de auditoría.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("auditoria")]
    public class AuditLogController : ControllerBase
    {
        ProcessAuditLog processAuditLog;

        /// <summary>
        /// Muestra la vista principal de auditoría (listpage).
        /// </summary>
        /// <returns>Vista con lista de registros de auditoría.</returns>
        [HttpGet]
        public async Task<IActionResult> AuditLogs()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processAuditLog = new ProcessAuditLog(dataUser[0]);
            var model = await processAuditLog.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<AuditLog>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        /// <summary>
        /// Obtiene el identificador único del usuario para el sistema de vistas.
        /// </summary>
        /// <returns>Identificador numérico del usuario.</returns>
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
        /// Genera un hash numérico consistente.
        /// </summary>
        /// <param name="input">Cadena de entrada.</param>
        /// <returns>Hash numérico positivo.</returns>
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
        /// Filtra y pagina los registros de auditoría.
        /// </summary>
        /// <param name="PropertyName">Nombre de la propiedad para filtrar.</param>
        /// <param name="PropertyValue">Valor de la propiedad para filtrar.</param>
        /// <param name="_PageNumber">Número de página.</param>
        /// <returns>Vista parcial con los registros filtrados.</returns>
        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> AuditLogFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processAuditLog = new ProcessAuditLog(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processAuditLog.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("AuditLogFilterOrMoreData", model);
        }

        /// <summary>
        /// Obtiene un registro de auditoría por su RecId.
        /// </summary>
        /// <param name="RecId">Identificador único del registro.</param>
        /// <returns>Datos del registro de auditoría en formato JSON.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(long RecId)
        {
            GetdataUser();
            processAuditLog = new ProcessAuditLog(dataUser[0]);

            AuditLog _model = await processAuditLog.GetByIdAsync(RecId);

            return (Json(_model));
        }
    }
}
