/// <summary>
/// Modelo de solicitud para marcar ciclo de pago como TSS.
/// Define los parámetros para configurar si un ciclo de pago está sujeto a TSS.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para PayCycleIsForTss.
    /// </summary>
    public class PayCycleIsForTssRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public int PayCycleId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTss { get; set; }
    }
}
