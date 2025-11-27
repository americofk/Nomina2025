/// <summary>
/// Modelo de respuesta para ReportPayrollProcess.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;

namespace DC365_PayrollHR.Core.Application.Common.Model.Reports
{
    /// <summary>
    /// Modelo de respuesta para ReportPayrollProcess.
    /// </summary>
    public class ReportPayrollProcessResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PayrollName { get; set; }
        /// <summary>
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public int TotalEmployee { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PaymentDate { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }
        /// <summary>
        /// Total.
        /// </summary>
        public decimal Total { get; set; }

        /// <summary>

        /// Departamento.

        /// </summary>

        public List<GroupReportPayrollEmployeeInfo> DepartmentGroups { get; set; }

        //Totales
        /// <summary>
        /// Salario.
        /// </summary>
        public decimal Salary { get; set; }
        /// <summary>
        /// Valor numerico para ExtraHour.
        /// </summary>
        public decimal ExtraHour { get; set; }
        /// <summary>
        /// Valor numerico para Commision.
        /// </summary>
        public decimal Commision { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal OtherEarning { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal TotalEarning { get; set; }

        /// <summary>

        /// Valor numerico para ISR.

        /// </summary>

        public decimal ISR { get; set; }
        /// <summary>
        /// Valor numerico para AFP.
        /// </summary>
        public decimal AFP { get; set; }
        /// <summary>
        /// Valor numerico para SFS.
        /// </summary>
        public decimal SFS { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal LoanCooperative { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal Loan { get; set; }
        /// <summary>
        /// Valor numerico para OtherDiscount.
        /// </summary>
        public decimal OtherDiscount { get; set; }
        /// <summary>
        /// Valor numerico para TotalDiscount.
        /// </summary>
        public decimal TotalDiscount { get; set; }

        //Actualización
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal DeductionCooperative { get; set; }
    }

    /// <summary>

    /// Clase para gestion de GroupReportPayrollEmployeeInfo.

    /// </summary>

    public class GroupReportPayrollEmployeeInfo 
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Coleccion de Details.
        /// </summary>
        public List<ReportPayrollEmployeeInfo> Details { get; set; }

        //Totales
        /// <summary>
        /// Salario.
        /// </summary>
        public decimal Salary { get; set; }
        /// <summary>
        /// Valor numerico para ExtraHour.
        /// </summary>
        public decimal ExtraHour { get; set; }
        /// <summary>
        /// Valor numerico para Commision.
        /// </summary>
        public decimal Commision { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal OtherEarning { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal TotalEarning { get; set; }

        /// <summary>

        /// Valor numerico para ISR.

        /// </summary>

        public decimal ISR { get; set; }
        /// <summary>
        /// Valor numerico para AFP.
        /// </summary>
        public decimal AFP { get; set; }
        /// <summary>
        /// Valor numerico para SFS.
        /// </summary>
        public decimal SFS { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal LoanCooperative { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal Loan { get; set; }
        /// <summary>
        /// Valor numerico para OtherDiscount.
        /// </summary>
        public decimal OtherDiscount { get; set; }
        /// <summary>
        /// Valor numerico para TotalDiscount.
        /// </summary>
        public decimal TotalDiscount { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal TotalAmount { get; set; }

        //Actualización
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal DeductionCooperative { get; set; }
    }

    /// <summary>

    /// Clase para gestion de ReportPayrollEmployeeInfo.

    /// </summary>

    public class ReportPayrollEmployeeInfo
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId{ get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>

        /// Salario.

        /// </summary>

        public decimal Salary { get; set; }
        /// <summary>
        /// Valor numerico para ExtraHour.
        /// </summary>
        public decimal ExtraHour { get; set; }
        /// <summary>
        /// Valor numerico para Commision.
        /// </summary>
        public decimal Commision { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal OtherEarning { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal TotalEarning { get; set; }

        /// <summary>

        /// Valor numerico para ISR.

        /// </summary>

        public decimal ISR { get; set; }
        /// <summary>
        /// Valor numerico para AFP.
        /// </summary>
        public decimal AFP { get; set; }
        /// <summary>
        /// Valor numerico para SFS.
        /// </summary>
        public decimal SFS { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal LoanCooperative { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal Loan { get; set; }
        /// <summary>
        /// Valor numerico para OtherDiscount.
        /// </summary>
        public decimal OtherDiscount { get; set; }
        /// <summary>
        /// Valor numerico para TotalDiscount.
        /// </summary>
        public decimal TotalDiscount { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal TotalAmount { get; set; }

        //Actualización
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal DeductionCooperative { get; set; }
    }
}
