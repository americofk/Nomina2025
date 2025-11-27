using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo
{
    /// <summary>
    /// Clase para gestion de DashboardGraphicsInfo.
    /// </summary>
    public class DashboardGraphicsInfo
    {
        /// <summary>
        /// Empleado.
        /// </summary>
        public EmployeeByDepartments EmployeeByDepartments { get; set; }
        /// <summary>
        /// Obtiene o establece DtbutionCtbutionByYear.
        /// </summary>
        public DeductionsContributionsByYear DtbutionCtbutionByYear { get; set; }
        /// <summary>
        /// Obtiene o establece AmountByAction.
        /// </summary>
        public AmountByAction AmountByAction { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public TrimestralPayrollAmount TrimestralPayrollAmount { get; set; }
    }
}
