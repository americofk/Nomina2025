using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class CourseEmployee: AuditableCompanyEntity
    {
        public string EmployeeId { get; set; }
        public string CourseId { get; set; }
        public string Comment { get; set; }
    }
}
