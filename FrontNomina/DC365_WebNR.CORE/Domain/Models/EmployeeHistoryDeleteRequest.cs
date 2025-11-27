/// <summary>
/// Modelo de solicitud para eliminar historial de empleados.
/// Define los parámetros necesarios para eliminar registros históricos de empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeeHistoryDelete.
    /// </summary>
    public class EmployeeHistoryDeleteRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }

    }
}
