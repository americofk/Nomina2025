using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class PayrollProcessAction
    {
        public int InternalId { get; set; }
        public string PayrollProcessId { get; set; }
        public string EmployeeId { get; set; }

        public PayrollActionType PayrollActionType { get; set; }
        public string ActionName { get; set; }
        public decimal ActionAmount { get; set; }
        public bool ApplyTax { get; set; }
        public bool ApplyTSS { get; set; }
    }
}
