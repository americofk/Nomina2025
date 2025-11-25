using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportDGT12
    {
        
        public string ResgisterTypeSummary { get; set; }
        public string RegisterQty { get; set; }


        public string ResgisterType { get; set; } = "E";
        public string Process { get; set; } = "G2";
        public string RNC { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }


        public List<DGT12Detail> Details { get; set; }

    }

    public class DGT12Detail
    {
        public string EmployeeName { get; set; }
        public string LastName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string DepartureDate { get; set; }
        public string LocationId { get; set; }
    }
}
