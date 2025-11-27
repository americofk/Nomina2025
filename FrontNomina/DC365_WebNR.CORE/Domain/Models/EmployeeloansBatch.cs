/// <summary>
/// Modelo para procesamiento por lotes de préstamos de empleados.
/// Permite importar o actualizar múltiples préstamos de empleados de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeloansBatch.
    /// </summary>
    public class EmployeeloansBatch
    {
        //id de prestamos
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LoanId { get; set; }
        //fecha desde 
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        //fecha hasta
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
       //monto del prestamo
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal LoanAmount { get; set; }
       
        //monto pagado
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PaidAmount { get; set; }
        //monto pendiente
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PendingAmount { get; set; }
        //cuota total
        /// <summary>
        /// Valor numerico para TotalDues.
        /// </summary>
        public int TotalDues { get; set; }
        //monto de cuota
        /// <summary>
        /// Valor numerico para AmountByDues.
        /// </summary>
        public decimal AmountByDues { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }
   
    }
}
