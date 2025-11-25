using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo
{
    public class TrimestralPayrollAmount
    {
        public List<string> Keys { get; set; }
        public List<decimal> FirtBar { get; set; }
        public List<decimal> SecondBar { get; set; }
        public List<decimal> ThirtBar { get; set; }
    }
}
