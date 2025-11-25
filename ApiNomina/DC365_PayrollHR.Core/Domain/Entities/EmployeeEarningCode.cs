using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeEarningCode: AuditableCompanyEntity
    {
        public int InternalId { get; set; }

        public string EarningCodeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal IndexEarning { get; set; }
        public int Quantity { get; set; }
        public string PayrollId { get; set; }
        public string Comment { get; set; }
        public string EmployeeId { get; set; }


        public int QtyPeriodForPaid { get; set; }
        public int StartPeriodForPaid { get; set; }

        public PayFrecuency PayFrecuency { get; set; }
        
        public decimal IndexEarningMonthly { get; set; }
        public decimal IndexEarningDiary { get; set; }
        public decimal IndexEarningHour { get; set; }


        public bool IsUseDGT { get; set; }
        public bool IsUseCalcHour { get; set; }

        public string PayrollProcessId { get; set; }

    }
}
