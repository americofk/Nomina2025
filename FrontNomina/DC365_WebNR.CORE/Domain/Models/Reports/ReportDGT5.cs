using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportDGT5
    {
     
        public string ResgisterTypeSummary { get; set; }
        public string RegisterQty { get; set; }


        public string ResgisterType { get; set; } = "E";
        public string Process { get; set; } = "T5";
        public string RNC { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public List<DGT5Detail> Details { get; set; }

    }
    public class DGT5Detail
    {
        public string NoveltyType { get; set; }
        public string EmployeeName { get; set; }
        public string LastName { get; set; }
        public string SalaryDate { get; set; }
        public string WorkedDate { get; set; }
        public string Salary { get; set; }
        public string DocumentNumber { get; set; }
        public string AdmissionDate { get; set; }
    }
}
