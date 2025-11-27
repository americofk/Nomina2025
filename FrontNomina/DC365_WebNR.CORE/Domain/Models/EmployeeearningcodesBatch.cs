/// <summary>
/// Modelo para procesamiento por lotes de códigos de ingresos de empleados.
/// Permite importar o actualizar múltiples códigos de ingresos de empleados de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeearningcodesBatch.
    /// </summary>
    public class EmployeeearningcodesBatch
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarning { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningMonthly { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }
      
    }
}
