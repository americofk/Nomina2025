/// <summary>
/// Modelo de respuesta para el historial de préstamos de empleados.
/// Contiene el detalle de préstamos, pagos y saldos pendientes de los empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de respuesta para EmployeeLoanHistory.
    /// </summary>
    public class EmployeeLoanHistoryResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string LoanId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string LoanName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PeriodStartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PeriodEndDate { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal LoanAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PaidAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PendingAmount { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PayrollName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }

        /// <summary>

        /// Valor numerico para TotalDues.

        /// </summary>

        public int TotalDues { get; set; }
        /// <summary>
        /// Valor numerico para AmountByDues.
        /// </summary>
        public decimal AmountByDues { get; set; }


    }
}
