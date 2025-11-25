using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class TXTModelDGT2
    {
        public string ResgisterType { get; set; }
        public string Process { get; set; }
        public string RNC { get; set; }
        public string Period { get; set; }

        public List<TXTModelDGT2Detail> Details { get; set; }

        public string ResgisterTypeSummary { get; set; }
        public string RegisterQty { get; set; }
    }

    public class TXTModelDGT2Detail
    {
        public string ResgisterType { get; set; }
        public string ActionType { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string Location { get; set; }
        public string AmountByNormalHour { get; set; }
        public string DayH { get; set; }
        public string Reason { get; set; }
    }
}
