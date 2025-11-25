using System.Collections.Generic;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportDGT4
    {
        public string ResgisterTypeSummary { get; set; }
        public string RegisterQty { get; set; }

        public string ResgisterType { get; set; } = "E";
        public string Process { get; set; } = "T4";
        public string RNC { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }


        public List<DGT4Detail> Details { get; set; }
    }

    public class DGT4Detail
    {
        public string EmployeeName { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }
        public string Gender { get; set; }
        public string Salary { get; set; }
        public string DocumentNumber { get; set; }
        public string AdmissionDate { get; set; }
        public string NoveltyType { get; set; }
    }
}
