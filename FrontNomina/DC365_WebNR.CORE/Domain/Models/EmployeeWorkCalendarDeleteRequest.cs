/// <summary>
/// Modelo de solicitud para eliminar entradas de calendario laboral de empleados.
/// Define los parámetros necesarios para eliminar registros de horarios laborales.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeeWorkCalendarDelete.
    /// </summary>
    public class EmployeeWorkCalendarDeleteRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
    }
}
