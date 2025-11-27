/// <summary>
/// Modelo de datos para representar calendario laboral de empleados.
/// Define los horarios y días de trabajo asignados a cada empleado.
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
    /// Clase para gestion de EmployeeWorkCalendar.
    /// </summary>
    public class EmployeeWorkCalendar: GenericError
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

    //public class EmployeeWorkCalendarRequest
    //{
    //    public string EmployeeId { get; set; }
    //    public DateTime CalendarDate { get; set; }

    //    public TimeSpan WorkFrom { get; set; }
    //    public TimeSpan WorkTo { get; set; }
    //    public TimeSpan BreakWorkFrom { get; set; }
    //    public TimeSpan BreakWorkTo { get; set; }
    //}
}
