using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeHistoryIsForDGTRequest
    {
        public string EmployeeHistoryId { get; set; }
        public bool IsUseDGT { get; set; }
    }
}
