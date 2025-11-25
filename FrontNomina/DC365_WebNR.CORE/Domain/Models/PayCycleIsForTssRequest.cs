using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class PayCycleIsForTssRequest
    {
        public string PayrollId { get; set; }
        public int PayCycleId { get; set; }
        public bool IsForTss { get; set; }
    }
}
