using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeextrahoursBatch
    {
        public DateTime WorkedDay { get; set; }
        public TimeSpan StartHour { get; set; }
        public TimeSpan EndHour { get; set; }
        public int Quantity { get; set; }
        public string PayrollId { get; set; }
        public string EarningCodeId { get; set; }
        public string EarningCodeName { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
    }
}
