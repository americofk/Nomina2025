/// <summary>
/// Modelo de solicitud para eliminar entradas de control de calendario laboral.
/// Define los parámetros necesarios para eliminar registros de control de asistencia.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeeWorkControlCalendarDelete.
    /// </summary>
    public class EmployeeWorkControlCalendarDeleteRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }

    }
}
