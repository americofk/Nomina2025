/// <summary>
/// Entidad de dominio para EmployeeDeductionCode.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeDeductionCode.
    /// </summary>
    public class EmployeeDeductionCode: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DeductionCodeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal IndexDeduction { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        public decimal PercentDeduction { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        public decimal PercentContribution { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        //Actualización
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal DeductionAmount { get; set; }


        //Actualización deducciones por período
        /// <summary>
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }

        /// <summary>

        /// Obtiene o establece PayFrecuency.

        /// </summary>

        public PayFrecuency PayFrecuency { get; set; }

    }
}
