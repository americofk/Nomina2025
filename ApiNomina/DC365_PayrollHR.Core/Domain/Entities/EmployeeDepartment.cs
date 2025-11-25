using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeDepartment: AuditableCompanyEntity
    {
        public string EmployeeId { get; set; }
        public string DepartmentId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool EmployeeDepartmentStatus { get; set; }
        public string Comment { get; set; }

    }
}
