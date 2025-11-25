using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeBankAccount: AuditableCompanyEntity
    {
        public string EmployeeId { get; set; }
        public int InternalId { get; set; }
        public string BankName { get; set; }
        public AccountType AccountType { get; set; }
        public string AccountNum { get; set; }
        public string Comment { get; set; }
        public bool IsPrincipal { get; set; }
        public string Currency { get; set; }
    }
}
