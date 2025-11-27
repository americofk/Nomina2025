/// <summary>
/// Modelo de solicitud para Tax.
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

namespace DC365_PayrollHR.Core.Application.Common.Model.Taxes
{
    /// <summary>
    /// Modelo de solicitud para Tax.
    /// </summary>
    public class TaxRequest: GenericValidation<TaxRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string TaxId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Valor de texto para Currency.
        /// </summary>
        public string Currency { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal MultiplyAmount { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para LimitPeriod.
        /// </summary>
        public string LimitPeriod { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal LimitAmount { get; set; }
        /// <summary>
        /// Obtiene o establece IndexBase.
        /// </summary>
        public IndexBase IndexBase { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string ProjId { get; set; }
        /// <summary>
        /// Valor de texto para ProjCategory.
        /// </summary>
        public string ProjCategory { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.TaxId), "El id no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "El nombre no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Currency), "La moneda no puede estar vacía"),
                ForRule(this, x => x.ValidFrom == default, "La fecha inicial no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.ValidTo < x.ValidFrom, "La fecha final no puede ser menor que la fecha inicial")
            };

            return validationResults;
        }
    }
}
