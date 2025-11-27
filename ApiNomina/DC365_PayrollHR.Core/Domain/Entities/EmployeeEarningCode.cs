/// <summary>
/// Entidad de dominio para EmployeeEarningCode.
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
    /// Clase para gestion de EmployeeEarningCode.
    /// </summary>
    public class EmployeeEarningCode: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }

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
        /// Valor numerico para Quantity.
        /// </summary>
        public int Quantity { get; set; }
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
        
        /// <summary>
        
        /// Ganancia.
        
        /// </summary>
        
        public decimal IndexEarningMonthly { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningDiary { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningHour { get; set; }


        /// <summary>


        /// Indica si.


        /// </summary>


        public bool IsUseDGT { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsUseCalcHour { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string PayrollProcessId { get; set; }

    }
}
