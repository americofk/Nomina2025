/// <summary>
/// Modelo de solicitud para Loan.
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

namespace DC365_PayrollHR.Core.Application.Common.Model.Loans
{
    /// <summary>
    /// Modelo de solicitud para Loan.
    /// </summary>
    public class LoanRequest: GenericValidation<LoanRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LoanId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal MultiplyAmount { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Obtiene o establece PayFrecuency.

        /// </summary>

        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Obtiene o establece IndexBase.
        /// </summary>
        public IndexBase IndexBase { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string DepartmentId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjCategoryId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "El nombre no puede estar vacío"),
                ForRule(this, x => x.ValidFrom == default, "La fecha inicial no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.ValidFrom > x.ValidTo, "La fecha final no puede ser menor que la fecha final")
            };

            return validationResults;
        }
    }
}
