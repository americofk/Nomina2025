/// <summary>
/// Modelo de solicitud para actualización de EmployeeHistory.
/// Define los parámetros necesarios para actualizar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    /// <summary>
    /// Modelo de solicitud para EmployeeHistoryUpdate.
    /// </summary>
    public class EmployeeHistoryUpdateRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime RegisterDate { get; set; }
    }
}
