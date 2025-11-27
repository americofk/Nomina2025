/// <summary>
/// Modelo de datos para representar acciones en procesos de nómina.
/// Define las acciones realizadas sobre empleados durante el procesamiento de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de PayrollProcessAction.
    /// </summary>
    public class PayrollProcessAction
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>

        /// Tipo.

        /// </summary>

        public PayrollActionType PayrollActionType { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string ActionName { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal ActionAmount { get; set; }
        /// <summary>
        /// Impuesto.
        /// </summary>
        public bool ApplyTax { get; set; }
        /// <summary>
        /// Indica el estado de ApplyTSS.
        /// </summary>
        public bool ApplyTSS { get; set; }
    }
}
