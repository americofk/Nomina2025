/// <summary>
/// Modelo de respuesta para EmployeeLoan.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans
{
    /// <summary>
    /// Modelo de respuesta para EmployeeLoan.
    /// </summary>
    public class EmployeeLoanResponse
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
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
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

        /// Valor numerico para TotalDues.

        /// </summary>

        public int TotalDues { get; set; }
        /// <summary>
        /// Valor numerico para AmountByDues.
        /// </summary>
        public decimal AmountByDues { get; set; }

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
