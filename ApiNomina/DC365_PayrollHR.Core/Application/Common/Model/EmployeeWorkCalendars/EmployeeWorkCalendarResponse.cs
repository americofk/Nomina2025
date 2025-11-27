/// <summary>
/// Modelo de respuesta para EmployeeWorkCalendar.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkCalendars
{
    /// <summary>
    /// Modelo de respuesta para EmployeeWorkCalendar.
    /// </summary>
    public class EmployeeWorkCalendarResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
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
