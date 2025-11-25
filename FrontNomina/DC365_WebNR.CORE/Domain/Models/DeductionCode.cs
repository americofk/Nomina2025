using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class DeductionCode
    {
        public int InternalId { get; set; }

        [CustomFilter("Id Deducción")]
        public string DeductionCodeId { get; set; }

        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        [CustomFilter("Proyecto")]
        public string ProjId { get; set; }

        public string ProjCategory { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido desde" + ErrorMsg.Emptym)]
        public DateTime ValidFrom { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido hasta" + ErrorMsg.Emptym)]
        public DateTime ValidTo { get; set; }

        //[Required(ErrorMessage = "Descripción" + ErrorMsg.Emptym)]
        public string Description { get; set; }

        public bool IsEnable { get; set; } = true;

        //[Required(ErrorMessage = "Cuenta contable" + ErrorMsg.Emptyf)]
        public string LedgerAccount { get; set; }

        public string Department { get; set; }

        public PayrollAction PayrollAction { get; set; }

        [Required(ErrorMessage = "Monto o porcentaje" + ErrorMsg.Emptym)]

        public IndexBase Ctbution_IndexBase { get; set; }
        public decimal Ctbution_MultiplyAmount { get; set; }
        public PayFrecuency Ctbution_PayFrecuency { get; set; }
        public PayFrecuency Ctbution_LimitPeriod { get; set; }
        public decimal Ctbution_LimitAmount { get; set; }
        [Required(ErrorMessage = "Monto o porcentaje" + ErrorMsg.Emptym)]
        public IndexBase Dduction_IndexBase { get; set; }
        public decimal Dduction_MultiplyAmount { get; set; }
        public PayFrecuency Dduction_PayFrecuency { get; set; }
        public PayFrecuency Dduction_LimitPeriod { get; set; }
        public decimal Dduction_LimitAmount { get; set; }
        public decimal Dduction_LimitAmountToApply { get; set; }
        public decimal Ctbution_LimitAmountToApply { get; set; }

        public bool IsForTaxCalc { get; set; }

        //Modificación para el calculo de las deducciones
        public bool IsForTssCalc { get; set; }
    }
}
