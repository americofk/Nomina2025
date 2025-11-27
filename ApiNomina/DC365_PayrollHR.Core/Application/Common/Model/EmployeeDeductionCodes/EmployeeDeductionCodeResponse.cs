/// <summary>
/// Modelo de respuesta para EmployeeDeductionCode.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes
{
    /// <summary>
    /// Modelo de respuesta para EmployeeDeductionCode.
    /// </summary>
    public class EmployeeDeductionCodeResponse
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

        /// <summary>

        /// Nombre.

        /// </summary>

        public string PayrollName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DeductionName { get; set; }

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
