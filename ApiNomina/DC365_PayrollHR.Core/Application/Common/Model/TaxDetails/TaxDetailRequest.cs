/// <summary>
/// Modelo de solicitud para TaxDetail.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.TaxDetails
{
    /// <summary>
    /// Modelo de solicitud para TaxDetail.
    /// </summary>
    public class TaxDetailRequest: GenericValidation<TaxDetailRequest>, IValidatableObject
    {
        //Salario anual superior a 
        /// <summary>
        /// Valor numerico para AnnualAmountHigher.
        /// </summary>
        public decimal AnnualAmountHigher { get; set; }

        //Salario anual no excede 
        /// <summary>
        /// Valor numerico para AnnualAmountNotExceed.
        /// </summary>
        public decimal AnnualAmountNotExceed { get; set; }

        /// <summary>

        /// Porcentaje.

        /// </summary>

        public decimal Percent { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal FixedAmount { get; set; }

        /// <summary>

        /// Valor numerico para ApplicableScale.

        /// </summary>

        public decimal ApplicableScale { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string TaxId { get; set; }

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
                ForRule(this, x => x.AnnualAmountHigher <= 0, "El salario superior a no puede ser menor ni igual a 0"),
                ForRule(this, x => x.AnnualAmountNotExceed <= 0, "El salario anual no excede no puede ser menor ni igual a 0"),
                ForRule(this, x => x.Percent <= 0, "El porcentaje no puede ser menor ni igual a 0")
                //ForRule(this, x => x.FixedAmount <= 0, "El monto fijo no puede ser menor ni igual a 0")
            };

            return validationResults;
        }
    }
}
