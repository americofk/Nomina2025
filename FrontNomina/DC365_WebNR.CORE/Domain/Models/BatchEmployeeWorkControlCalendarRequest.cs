/// <summary>
/// Modelo de solicitud para procesamiento por lotes de calendario de control laboral de empleados.
/// Permite importar o actualizar múltiples controles de asistencia de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para BatchEmployeeWorkControlCalendar.
    /// </summary>
    public class BatchEmployeeWorkControlCalendarRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalendarDate { get; set; }

        /// <summary>
        /// Obtiene o establece WorkFrom.
        /// </summary>
        public TimeSpan WorkFrom { get; set; }

        /// <summary>
        /// Obtiene o establece WorkTo.
        /// </summary>
        public TimeSpan WorkTo { get; set; }

        /// <summary>
        /// Obtiene o establece BreakWorkFrom.
        /// </summary>
        public TimeSpan BreakWorkFrom { get; set; }

        /// <summary>
        /// Obtiene o establece BreakWorkTo.
        /// </summary>
        public TimeSpan BreakWorkTo { get; set; }
    }
}
