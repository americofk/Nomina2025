/// <summary>
/// Modelo de solicitud para control de calendario laboral de empleados.
/// Define los parámetros para registrar y gestionar asistencia de empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeeWorkControlCalendar.
    /// </summary>
    public class EmployeeWorkControlCalendarRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId
        {
            get
            {
                return EmployeeIdWorkCalendar;
            }
        }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdWorkCalendar { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime CalendarDate { get; set; }
        /// <summary>
        /// Valor de texto para CalendarDay.
        /// </summary>
        public string CalendarDay { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Obtiene o establece WorkFrom.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece WorkTo.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }
        /// <summary>
        /// Obtiene o establece BreakWorkFrom.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan BreakWorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece BreakWorkTo.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan BreakWorkTo { get; set; }
    }
}
