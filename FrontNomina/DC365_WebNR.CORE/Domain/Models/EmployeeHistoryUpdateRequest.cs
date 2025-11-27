/// <summary>
/// Modelo de solicitud para actualizar historial de empleados.
/// Define los parámetros necesarios para modificar registros históricos de empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeeHistoryUpdate.
    /// </summary>
    public class EmployeeHistoryUpdateRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime RegisterDate { get; set; }
    }
}
