/// <summary>
/// Modelo de solicitud para eliminación de CalendarHoliday.
/// Define los parámetros necesarios para eliminar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CalendarHolidays
{
    /// <summary>
    /// Modelo de solicitud para CalendarHolidayDelete.
    /// </summary>
    public class CalendarHolidayDeleteRequest
    {
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalendarDate { get; set; }
    }
}
