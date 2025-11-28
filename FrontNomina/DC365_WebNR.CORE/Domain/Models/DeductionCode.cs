/// <summary>
/// Modelo de datos para representar códigos de deducciones.
/// Define los diferentes tipos de deducciones aplicables a la nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de DeductionCode.
    /// </summary>
    public class DeductionCode : AuditableCompanyModel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [CustomFilter("Id Deducción")]
        public string DeductionCodeId { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [CustomFilter("Proyecto")]
        public string ProjId { get; set; }

        /// <summary>

        /// Valor de texto para ProjCategory.

        /// </summary>

        public string ProjCategory { get; set; }

        /// <summary>

        /// Fecha de ValidFrom.

        /// </summary>

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido desde" + ErrorMsg.Emptym)]
        public DateTime ValidFrom { get; set; }

        /// <summary>

        /// Fecha de ValidTo.

        /// </summary>

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido hasta" + ErrorMsg.Emptym)]
        public DateTime ValidTo { get; set; }

        //[Required(ErrorMessage = "Descripción" + ErrorMsg.Emptym)]
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsEnable { get; set; } = true;

        //[Required(ErrorMessage = "Cuenta contable" + ErrorMsg.Emptyf)]
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

        [Required(ErrorMessage = "Monto o porcentaje" + ErrorMsg.Emptym)]

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
        /// Obtiene o establece Dduction_IndexBase.
        /// </summary>
        [Required(ErrorMessage = "Monto o porcentaje" + ErrorMsg.Emptym)]
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
        /// <summary>
        /// Valor numerico para Ctbution_LimitAmountToApply.
        /// </summary>
        public decimal Ctbution_LimitAmountToApply { get; set; }

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
