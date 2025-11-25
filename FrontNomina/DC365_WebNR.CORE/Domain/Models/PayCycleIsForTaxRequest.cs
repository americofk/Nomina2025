using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class PayCycleIsForTaxRequest
    {
        public string PayrollId { get; set; }
        public int PayCycleId { get; set; }
        public bool IsForTax { get; set; }
    }
}
