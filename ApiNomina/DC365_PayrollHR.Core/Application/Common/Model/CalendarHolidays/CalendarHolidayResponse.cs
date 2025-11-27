/// <summary>
/// Modelo de respuesta para CalendarHoliday.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CalendarHolidays
{
    /// <summary>
    /// Modelo de respuesta para CalendarHoliday.
    /// </summary>
    public class CalendarHolidayResponse
    {
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalendarDate { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
