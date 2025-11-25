using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class ReportConfig: AuditableCompanyEntity
    {
        public int InternalId { get; set; }
        public string Salary { get; set; }
        public string Comission { get; set; }
        public string AFP { get; set; }
        public string SFS { get; set; }
        public string LoanCooperative { get; set; }

        //Actualización abono de cooperativa
        public string DeductionCooperative { get; set; }
    }
}
