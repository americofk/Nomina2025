using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo
{
    /// <summary>
    /// Clase para gestion de TrimestralPayrollAmount.
    /// </summary>
    public class TrimestralPayrollAmount
    {
        /// <summary>
        /// Valor de texto para Keys.
        /// </summary>
        public List<string> Keys { get; set; }
        /// <summary>
        /// Valor numerico para FirtBar.
        /// </summary>
        public List<decimal> FirtBar { get; set; }
        /// <summary>
        /// Valor numerico para SecondBar.
        /// </summary>
        public List<decimal> SecondBar { get; set; }
        /// <summary>
        /// Valor numerico para ThirtBar.
        /// </summary>
        public List<decimal> ThirtBar { get; set; }
    }
}
