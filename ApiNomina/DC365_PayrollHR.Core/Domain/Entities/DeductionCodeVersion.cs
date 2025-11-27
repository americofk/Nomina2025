/// <summary>
/// Entidad de dominio para DeductionCodeVersion.
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
    /// Clase para gestion de DeductionCodeVersion.
    /// </summary>
    public class DeductionCodeVersion: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DeductionCodeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }
        /// <summary>
        /// Valor de texto para ProjCategory.
        /// </summary>
        public string ProjCategory { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public string Department { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public PayrollAction PayrollAction { get; set; }

        /// <summary>

        /// Obtiene o establece Ctbution_IndexBase.

        /// </summary>

        public IndexBase Ctbution_IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Ctbution_MultiplyAmount { get; set; }
        /// <summary>
        /// Obtiene o establece Ctbution_PayFrecuency.
        /// </summary>
        public PayFrecuency Ctbution_PayFrecuency { get; set; }
        /// <summary>
        /// Obtiene o establece Ctbution_LimitPeriod.
        /// </summary>
        public PayFrecuency Ctbution_LimitPeriod { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Ctbution_LimitAmount { get; set; }
        /// <summary>
        /// Valor numerico para Ctbution_LimitAmountToApply.
        /// </summary>
        public decimal Ctbution_LimitAmountToApply { get; set; }

        /// <summary>

        /// Obtiene o establece Dduction_IndexBase.

        /// </summary>

        public IndexBase Dduction_IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Dduction_MultiplyAmount { get; set; }
        /// <summary>
        /// Obtiene o establece Dduction_PayFrecuency.
        /// </summary>
        public PayFrecuency Dduction_PayFrecuency { get; set; }
        /// <summary>
        /// Obtiene o establece Dduction_LimitPeriod.
        /// </summary>
        public PayFrecuency Dduction_LimitPeriod { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Dduction_LimitAmount { get; set; }
        /// <summary>
        /// Valor numerico para Dduction_LimitAmountToApply.
        /// </summary>
        public decimal Dduction_LimitAmountToApply { get; set; }

        //Actualización
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTaxCalc { get; set; }

        //Modificación para el calculo de las deducciones
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTssCalc { get; set; }
    }
}
