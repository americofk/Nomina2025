using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo
{
    /// <summary>
    /// Clase para gestion de DeductionsContributionsByYear.
    /// </summary>
    public class DeductionsContributionsByYear
    {
        /// <summary>
        /// Valor de texto para Keys.
        /// </summary>
        public List<string> Keys { get; set; }
        /// <summary>
        /// Valor numerico para CtbutionValues.
        /// </summary>
        public List<decimal> CtbutionValues { get; set; }
        /// <summary>
        /// Valor numerico para DtbutionValues.
        /// </summary>
        public List<decimal> DtbutionValues { get; set; }
    }
}
