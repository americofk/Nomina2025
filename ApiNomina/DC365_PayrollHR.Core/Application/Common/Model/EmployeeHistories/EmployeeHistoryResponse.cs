using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    public class EmployeeHistoryResponse
    {
        public string EmployeeHistoryId { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public DateTime RegisterDate { get; set; }
        public string EmployeeId { get; set; }

        public bool IsUseDGT { get; set; }
    }
}
