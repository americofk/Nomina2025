/// <summary>
/// Modelo de respuesta para EmployeeHistory.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    /// <summary>
    /// Modelo de respuesta para EmployeeHistory.
    /// </summary>
    public class EmployeeHistoryResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime RegisterDate { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsUseDGT { get; set; }
    }
}
