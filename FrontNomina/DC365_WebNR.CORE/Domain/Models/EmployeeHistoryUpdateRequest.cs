using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeHistoryUpdateRequest
    {
        public string EmployeeHistoryId { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
