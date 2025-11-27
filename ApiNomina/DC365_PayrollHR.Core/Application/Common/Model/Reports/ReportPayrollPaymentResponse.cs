/// <summary>
/// Modelo de respuesta para ReportPayrollPayment.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;

namespace DC365_PayrollHR.Core.Application.Common.Model.Reports
{
    /// <summary>
    /// Modelo de respuesta para ReportPayrollPayment.
    /// </summary>
    public class ReportPayrollPaymentResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string EmployeeEmail { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartWorkDate { get; set; }
        /// <summary>
        /// Valor de texto para Document.
        /// </summary>
        public string Document { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public string Department { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PayrollName { get; set; }
        /// <summary>
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PaymentDate { get; set; }
        /// <summary>
        /// Obtiene o establece PayMethod.
        /// </summary>
        public PayMethod PayMethod { get; set; }

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


        public decimal Total { get; set; }
        /// <summary>
        /// Valor de texto para BankAccount.
        /// </summary>
        public string BankAccount { get; set; }

        //Actualización
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal DeductionCooperative { get; set; }

    }
}
