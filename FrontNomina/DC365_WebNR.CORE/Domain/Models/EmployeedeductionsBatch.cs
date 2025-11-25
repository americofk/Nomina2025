using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeedeductionsBatch
    {
        public string DeductionCodeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string PayrollId { get; set; }
        public string EmployeeId { get; set; }
        public decimal DeductionAmount { get; set; }
        public int QtyPeriodForPaid { get; set; }
        public int StartPeriodForPaid { get; set; }

    }
}
