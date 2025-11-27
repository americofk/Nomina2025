using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo
{
    /// <summary>
    /// Clase para gestion de EmployeeByDepartments.
    /// </summary>
    public class EmployeeByDepartments
    {
        /// <summary>
        /// Valor de texto para Keys.
        /// </summary>
        public List<string> Keys { get; set; }
        /// <summary>
        /// Valor numerico para Values.
        /// </summary>
        public List<int> Values { get; set; }
    }
}
