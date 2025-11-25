using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeDocument: AuditableCompanyEntity
    {
        public int InternalId { get; set; }
        public string EmployeeId { get; set; }
        public DocumentType DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public DateTime DueDate { get; set; }
        public string Comment { get; set; }
        public byte[] FileAttach { get; set; }
        public bool IsPrincipal { get; set; }
    }
}
