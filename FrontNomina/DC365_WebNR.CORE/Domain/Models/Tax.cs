using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class Tax
    {
        [CustomFilter("Id Impuesto")]
        [Required(ErrorMessage = "Código de impuesto" + ErrorMsg.Emptym)]
        public string TaxId { get; set; }
        [Required(ErrorMessage = "Nombre del impuesto" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        public string LedgerAccount { get; set; }
        [DataType(DataType.Date)]
        public DateTime ValidFrom { get; set; }
        [DataType(DataType.Date)]
        public DateTime ValidTo { get; set; }
        public string Currency { get; set; }
        public decimal MultiplyAmount { get; set; }
        public PayFrecuency PayFrecuency { get; set; }
        public string Description { get; set; }
        public string LimitPeriod { get; set; }
        public decimal LimitAmount { get; set; }
        public IndexBase IndexBase { get; set; }
        [CustomFilter("Proyecto")]
        public string ProjId { get; set; }
        public string ProjCategory { get; set; }
        public string DepartmentId { get; set; }
        public bool TaxStatus { get; set; }

        public List<TaxDetail> TaxDetails { get; set; }
    }
}
