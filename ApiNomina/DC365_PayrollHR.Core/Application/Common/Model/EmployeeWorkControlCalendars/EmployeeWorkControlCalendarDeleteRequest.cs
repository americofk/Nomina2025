/// <summary>
/// Modelo de solicitud para eliminación de EmployeeWorkControlCalendar.
/// Define los parámetros necesarios para eliminar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkControlCalendars
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
