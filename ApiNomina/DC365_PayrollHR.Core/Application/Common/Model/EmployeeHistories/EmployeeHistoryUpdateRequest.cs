using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    public class EmployeeHistoryUpdateRequest
    {
        public string EmployeeHistoryId { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
