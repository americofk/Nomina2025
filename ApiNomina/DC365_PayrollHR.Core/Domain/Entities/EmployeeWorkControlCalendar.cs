/// <summary>
/// Entidad de dominio para EmployeeWorkControlCalendar.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeWorkControlCalendar.
    /// </summary>
    public class EmployeeWorkControlCalendar: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
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
        /// <summary>
        /// Valor numerico para TotalHour.
        /// </summary>
        public decimal TotalHour { get; set; }
        /// <summary>
        /// Obtiene o establece StatusWorkControl.
        /// </summary>
        public StatusWorkControl StatusWorkControl { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string PayrollProcessId { get; set; }

    }
}
