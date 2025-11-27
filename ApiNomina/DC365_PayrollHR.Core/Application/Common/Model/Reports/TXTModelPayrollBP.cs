/// <summary>
/// Entidad de dominio para TXTModelPayrollBP.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Reports
{
    /// <summary>
    /// Clase para gestion de TXTModelPayrollBP.
    /// </summary>
    public class TXTModelPayrollBP
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; } = "H";
        /// <summary>
        /// Valor de texto para RNC.
        /// </summary>
        public string RNC { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Valor de texto para Sequence.
        /// </summary>
        public string Sequence { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ServiceType { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string EfectiveDate { get; set; }
        /// <summary>
        /// Valor de texto para QtyDebit.
        /// </summary>
        public string QtyDebit { get; set; }
        /// <summary>
        /// Valor de texto para TotalAmountDebit.
        /// </summary>
        public string TotalAmountDebit { get; set; }
        /// <summary>
        /// Valor de texto para QtyCredit.
        /// </summary>
        public string QtyCredit { get; set; }
        /// <summary>
        /// Valor de texto para TotalAmountCredit.
        /// </summary>
        public string TotalAmountCredit { get; set; }
        /// <summary>
        /// Valor de texto para NoMID.
        /// </summary>
        public string NoMID { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string SendDate { get; set; }
        /// <summary>
        /// Valor de texto para Hour.
        /// </summary>
        public string Hour { get; set; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public string Status { get; set; }
        /// <summary>
        /// Valor de texto para Filler.
        /// </summary>
        public string Filler { get; set; }

        /// <summary>

        /// Coleccion de Details.

        /// </summary>

        public List<TXTModelPayrollDetailBP> Details { get; set; }
    }

    /// <summary>

    /// Clase para gestion de TXTModelPayrollDetailBP.

    /// </summary>

    public class TXTModelPayrollDetailBP
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; } = "N";
        /// <summary>
        /// Valor de texto para RNC.
        /// </summary>
        public string RNC { get; set; }
        /// <summary>
        /// Valor de texto para Sequence.
        /// </summary>
        public string Sequence { get; set; }
        /// <summary>
        /// Valor de texto para TransactionSequence.
        /// </summary>
        public string TransactionSequence { get; set; }
        /// <summary>
        /// Valor de texto para ToAccount.
        /// </summary>
        public string ToAccount { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ToAccountType { get; set; }
        /// <summary>
        /// Valor de texto para Currency.
        /// </summary>
        public string Currency { get; set; } = "214";
        /// <summary>
        /// Codigo.
        /// </summary>
        public string ToBankCode { get; set; } = "10101070";
        /// <summary>
        /// Valor de texto para ToVerficatorDigitBank.
        /// </summary>
        public string ToVerficatorDigitBank { get; set; } = "8";
        /// <summary>
        /// Codigo.
        /// </summary>
        public string OperationCode { get; set; } = "32";
        /// <summary>
        /// Monto.
        /// </summary>
        public string TransactionAmount { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string IdentificationType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string IdentificationNumber { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string ReferenceNumber { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string DueDate { get; set; }
        /// <summary>
        /// Valor de texto para ContactForm.
        /// </summary>
        public string ContactForm { get; set; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string EmployeeEmail { get; set; }
        /// <summary>
        /// Telefono.
        /// </summary>
        public string EmployeePhone { get; set; }
        /// <summary>
        /// Valor de texto para PaymentProcess.
        /// </summary>
        public string PaymentProcess { get; set; }
        /// <summary>
        /// Valor de texto para EmptyValue.
        /// </summary>
        public string EmptyValue { get; set; }
        /// <summary>
        /// Valor de texto para Filler.
        /// </summary>
        public string Filler { get; set; }
    }
}
