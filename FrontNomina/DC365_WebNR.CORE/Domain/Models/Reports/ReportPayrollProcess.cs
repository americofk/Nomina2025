/// <summary>
/// Modelo de datos para reporte de procesos de nÃ³mina.
/// Define la estructura de datos para reportes de procesos de nÃ³mina ejecutados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    public class ReportPayrollProcess
    {
        public string PayrollName { get; set; }
        public string PayrollProcessId { get; set; }
        public string Period { get; set; }
        public int TotalEmployee { get; set; }
        public DateTime PaymentDate { get; set; }
        public string ProjId { get; set; }
        public decimal Total { get; set; }

        //public List<ReportPayrollEmployeeInfo> details { get; set; }

        public List<GroupReportPayrollEmployeeInfo> DepartmentGroups { get; set; }

        //Totales
        public decimal Salary { get; set; }
        public decimal ExtraHour { get; set; }
        public decimal Commision { get; set; }
        public decimal OtherEarning { get; set; }
        public decimal TotalEarning { get; set; }

        public decimal ISR { get; set; }
        public decimal AFP { get; set; }
        public decimal SFS { get; set; }
        //public decimal Cooperative { get; set; }
        public decimal Loan { get; set; }
        public decimal OtherDiscount { get; set; }
        public decimal TotalDiscount { get; set; }


        //Actualización abono de cooperativa
        public string LoanCooperative { get; set; }
        public string DeductionCooperative { get; set; }

    }

    public class GroupReportPayrollEmployeeInfo
    {
        public string DepartmentName { get; set; }
        public List<ReportPayrollEmployeeInfo> Details { get; set; }

        //Totales
        public decimal Salary { get; set; }
        public decimal ExtraHour { get; set; }
        public decimal Commision { get; set; }
        public decimal OtherEarning { get; set; }
        public decimal TotalEarning { get; set; }

        public decimal ISR { get; set; }
        public decimal AFP { get; set; }
        public decimal SFS { get; set; }
        //public decimal Cooperative { get; set; }
        public decimal Loan { get; set; }
        public decimal OtherDiscount { get; set; }
        public decimal TotalDiscount { get; set; }

        public decimal TotalAmount { get; set; }

        //Actualización abono de cooperativa
        public string LoanCooperative { get; set; }
        public string DeductionCooperative { get; set; }
    }

    public class ReportPayrollEmployeeInfo
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }

        public decimal Salary { get; set; }
        public decimal ExtraHour { get; set; }
        public decimal Commision { get; set; }
        public decimal OtherEarning { get; set; }
        public decimal TotalEarning { get; set; }

        public decimal ISR { get; set; }
        public decimal AFP { get; set; }
        public decimal SFS { get; set; }
        public decimal Loan { get; set; }
        public decimal OtherDiscount { get; set; }
        public decimal TotalDiscount { get; set; }

        public decimal TotalAmount { get; set; }

        public string LoanCooperative { get; set; }

        //Actualización abono de cooperativa
        public string DeductionCooperative { get; set; }
    }
}
