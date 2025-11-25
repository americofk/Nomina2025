using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeDeductionCode: AuditableCompanyEntity
    {
        public string DeductionCodeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal IndexDeduction { get; set; }
        public decimal PercentDeduction { get; set; }
        public decimal PercentContribution { get; set; }
        public string PayrollId { get; set; }
        public string Comment { get; set; }
        public string EmployeeId { get; set; }

        //Actualización
        public decimal DeductionAmount { get; set; }


        //Actualización deducciones por período
        public int QtyPeriodForPaid { get; set; }
        public int StartPeriodForPaid { get; set; }

        public PayFrecuency PayFrecuency { get; set; }

    }
}
