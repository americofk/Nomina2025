/// <summary>
/// Entidad de dominio para Loan.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de Loan.
    /// </summary>
    public class Loan: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LoanId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
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
        public decimal MultiplyAmount { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Obtiene o establece PayFrecuency.

        /// </summary>

        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Obtiene o establece IndexBase.
        /// </summary>
        public IndexBase IndexBase { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjCategoryId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public bool LoanStatus { get; set; } = true;

        

    }
}
