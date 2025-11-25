using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportDGT2
    {
        public string ResgisterType { get; set; } = "E";
        public string Process { get; set; } = "T2";
        public string RNC { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }

        public List<DGT2Detail> Details { get; set; }

        public string ResgisterTypeSummary { get; set; }
        public string RegisterQty { get; set; }
    }

    public class DGT2Detail
    {
        public string EmployeeName { get; set; }
        public int QtyExtraHour { get; set; }
        public decimal TotalAmountExtraHour { get; set; }
    }
}
