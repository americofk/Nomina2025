using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Helpers
{
    public class EmpPayrollProcessHelper
    {
        public string EmployeeId { get; set; }
        public PayMethod PayMethod { get; set; }
        public string EmployeeName { get; set; }
        public DateTime StartWorkDate { get; set; }
    }
}
