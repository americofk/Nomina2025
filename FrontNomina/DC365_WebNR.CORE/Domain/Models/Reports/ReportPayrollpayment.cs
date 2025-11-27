/// <summary>
/// Modelo de datos para reporte de pagos de nÃ³mina.
/// Define la estructura de datos para reportes de pagos procesados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using DC365_WebNR.CORE.Domain.Models.Enums;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportPayrollpayment
    {
        public string EmployeeName { get; set; }
        public DateTime StartWorkDate { get; set; }
        public string Document { get; set; }
        public string Department { get; set; }
        public string PayrollName { get; set; }
        public string Period { get; set; }
        public string PositionName { get; set; }
        public DateTime PaymentDate { get; set; }
        public PayMethod PayMethod { get; set; }
        public decimal Salary { get; set; }
        public decimal ExtraHour { get; set; }
        public decimal Commision { get; set; }
        public decimal OtherEarning { get; set; }
        public decimal Isr { get; set; }
        public decimal Afp { get; set; }
        public decimal Sfs { get; set; }
        public decimal Loan { get; set; }
        public decimal OtherDiscount { get; set; }
        public decimal Total { get; set; }

        public string LoanCooperative { get; set; }
        public string BankAccount { get; set; }

        //Actualización abono de cooperativa
        public string DeductionCooperative { get; set; }
        public string EmployeeEmail { get; set; }
    }
}
