using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EarningCodeVersion : AuditableCompanyEntity
    {
        public int InternalId { get; set; }
        public string EarningCodeId { get; set; }
        public string Name { get; set; }
        public bool IsTSS { get; set; }
        public bool IsISR { get; set; }
        public bool IsExtraHours { get; set; }
        public bool IsUseDGT { get; set; }

        public string ProjId { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string Description { get; set; }

        public IndexBase IndexBase { get; set; }
        public decimal MultiplyAmount { get; set; }
        public string LedgerAccount { get; set; }
        public string Department { get; set; }

        public bool IsRoyaltyPayroll { get; set; }

        //Actualización para cálculo automático de horas extras
        public bool IsHoliday { get; set; }
        public TimeSpan WorkFrom { get; set; }
        public TimeSpan WorkTo { get; set; }
    }
}
