/// <summary>
/// Modelo de solicitud para BatchBankAccountEmployee.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Batchs
{
    /// <summary>
    /// Modelo de solicitud para BatchBankAccountEmployee.
    /// </summary>
    public class BatchBankAccountEmployeeRequest : GenericValidation<BatchBankAccountEmployeeRequest>, IValidatableObject
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
        /// Nombre.
        /// </summary>
        public string BankName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public AccountType AccountType { get; set; }
        /// <summary>
        /// Valor de texto para AccountNum.
        /// </summary>
        public string AccountNum { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Valor de texto para Currency.
        /// </summary>
        public string Currency { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.BankName), "El nombre del banco no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.AccountNum), "El número de cuenta no puede estar vacío"),
                ForRule(this, x => !Enum.IsDefined(typeof(AccountType), x.AccountType), "El tipo de cuenta suministrada no existe"),
                ForRule(this, x => string.IsNullOrEmpty(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => string.IsNullOrEmpty(x.Currency), "La moneda no puede estar vacía")
            };

            return validationResults;
        }
    }
}
