/// <summary>
/// Modelo de solicitud para eliminación de EmployeeHistory.
/// Define los parámetros necesarios para eliminar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    /// <summary>
    /// Modelo de solicitud para EmployeeHistoryDelete.
    /// </summary>
    public class EmployeeHistoryDeleteRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
    }
}
