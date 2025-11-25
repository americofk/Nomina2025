using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeearningcodesBatch
    {
        public string EarningCodeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal IndexEarning { get; set; }
        public decimal IndexEarningMonthly { get; set; }
        public string PayrollId { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int QtyPeriodForPaid { get; set; }
        public int StartPeriodForPaid { get; set; }
      
    }
}
