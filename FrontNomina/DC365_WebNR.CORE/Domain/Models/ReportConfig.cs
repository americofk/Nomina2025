using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class ReportConfig
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
