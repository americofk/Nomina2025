using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeloansBatch
    {
        //id de prestamos
        public string LoanId { get; set; }
        //fecha desde 
        public DateTime ValidFrom { get; set; }
        //fecha hasta
        public DateTime ValidTo { get; set; }
       //monto del prestamo
        public decimal LoanAmount { get; set; }
       
        //monto pagado
        public decimal PaidAmount { get; set; }
        //monto pendiente
        public decimal PendingAmount { get; set; }
        //cuota total
        public int TotalDues { get; set; }
        //monto de cuota
        public decimal AmountByDues { get; set; }

        public string PayrollId { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int QtyPeriodForPaid { get; set; }
        public int StartPeriodForPaid { get; set; }
   
    }
}
