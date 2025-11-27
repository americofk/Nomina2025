/// <summary>
/// Modelo de solicitud para eliminación de EmployeeWorkCalendar.
/// Define los parámetros necesarios para eliminar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkCalendars
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
