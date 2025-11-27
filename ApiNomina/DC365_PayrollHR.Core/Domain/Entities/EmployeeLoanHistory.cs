/// <summary>
/// Entidad de dominio para EmployeeLoanHistory.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeLoanHistory.
    /// </summary>
    public class EmployeeLoanHistory : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public int ParentInternalId { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string LoanId { get; set; }
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

        /// Identificador.

        /// </summary>

        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }

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

        /// Valor numerico para TotalDues.

        /// </summary>

        public int TotalDues { get; set; }
        /// <summary>
        /// Valor numerico para PendingDues.
        /// </summary>
        public int PendingDues { get; set; }
        /// <summary>
        /// Valor numerico para AmountByDues.
        /// </summary>
        public decimal AmountByDues { get; set; }
    }
}
