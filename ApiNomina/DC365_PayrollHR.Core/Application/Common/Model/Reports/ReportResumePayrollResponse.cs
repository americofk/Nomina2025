/// <summary>
/// Modelo de respuesta para ReportResumePayroll.
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
    /// Modelo de respuesta para ReportResumePayroll.
    /// </summary>
    public class ReportResumePayrollResponse
    {
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
        /// Valor de texto para Project.
        /// </summary>
        public string Project { get; set; }
        /// <summary>
        /// Total.
        /// </summary>
        public decimal Total { get; set; }

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

        /// Total.

        /// </summary>

        public List<PayMethodTotal> PayMethodTotal { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string DepartmentName { get; set; }

        //Actualización
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal DeductionCooperative { get; set; }
    }

    /// <summary>

    /// Clase para gestion de PayMethodTotal.

    /// </summary>

    public class PayMethodTotal
    {
        /// <summary>
        /// Obtiene o establece PayMethod.
        /// </summary>
        public PayMethod PayMethod { get; set; }
        /// <summary>
        /// Total.
        /// </summary>
        public int Total { get; set; }
    }
}
