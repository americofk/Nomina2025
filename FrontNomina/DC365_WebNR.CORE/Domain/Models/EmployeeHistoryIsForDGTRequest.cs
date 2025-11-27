/// <summary>
/// Modelo de solicitud para marcar historial como válido para DGT.
/// Define los parámetros para configurar registros históricos reportables a DGT.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeeHistoryIsForDGT.
    /// </summary>
    public class EmployeeHistoryIsForDGTRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsUseDGT { get; set; }
    }
}
