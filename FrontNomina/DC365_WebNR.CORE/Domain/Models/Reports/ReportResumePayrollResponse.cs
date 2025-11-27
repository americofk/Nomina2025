/// <summary>
/// Modelo de respuesta para resumen de nÃ³mina.
/// Contiene datos consolidados y totalizados de procesos de nÃ³mina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportResumePayrollResponse
    {
        public string PayrollName { get; set; }
        public string DepartmentName { get; set; }
        public string Period { get; set; }
        public int TotalEmployee { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Project { get; set; }
        public decimal Total { get; set; }

        public decimal Salary { get; set; }
        public decimal ExtraHour { get; set; }
        public decimal Commision { get; set; }
        public decimal OtherEarning { get; set; }

        public decimal ISR { get; set; }
        public decimal AFP { get; set; }
        public decimal SFS { get; set; }
        public decimal Loan { get; set; }
        public decimal OtherDiscount { get; set; }

        public List<PayMethodTotal> PayMethodTotal { get; set; }

        public decimal LoanCooperative { get; set; }

        //Actualización abono de cooperativa
        public decimal DeductionCooperative { get; set; }
    }

    public class PayMethodTotal
    {
        public PayMethod PayMethod { get; set; }
        public int Total { get; set; }
    }
    public class ReportResumePayrollResponseCSV
    {
        public string PayrollName { get; set; }
        public string DepartmentName { get; set; }
        public string Period { get; set; }
        public string TotalEmployee { get; set; }
        public string PaymentDate { get; set; }
        public string Project { get; set; }
        public string Total { get; set; }

        public string Salary { get; set; }
        public string ExtraHour { get; set; }
        public string Commision { get; set; }
        public string OtherEarning { get; set; }

        public string ISR { get; set; }
        public string AFP { get; set; }
        public string SFS { get; set; }
        public string Loan { get; set; }
        public string OtherDiscount { get; set; }

        public string LoanCooperative { get; set; }

        //Actualización abono de cooperativa
        public string DeductionCooperative { get; set; }
    }

}
