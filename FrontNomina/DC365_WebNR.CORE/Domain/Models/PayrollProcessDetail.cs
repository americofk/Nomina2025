/// <summary>
/// Modelo de datos para representar detalles de procesos de nómina.
/// Contiene el desglose individual de cada empleado en un proceso de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class PayrollProcessDetail
    {
        public string PayrollProcessId { get; set; }
        public string EmployeeId { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalTaxAmount { get; set; }
        public PayMethod PayMethod { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string Document { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
        public PayrollProcessStatus PayrollProcessStatus { get; set; }

        //Modificaci�n para el calculo de las deducciones de tss
        public decimal TotalTssAmount { get; set; }
        public decimal TotalTssAndTaxAmount { get; set; }
    }
}
