using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class Payroll : AuditableCompanyEntity
    {
        public string PayrollId { get; set; }
        public string Name { get; set; }
        public PayFrecuency PayFrecuency { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string Description { get; set; }

        public bool IsRoyaltyPayroll { get; set; }

        public string CurrencyId { get; set; }

        public bool PayrollStatus { get; set; } = true;

        public bool IsForHourPayroll { get; set; }


        public int BankSecuence { get; set; }
    }
}
