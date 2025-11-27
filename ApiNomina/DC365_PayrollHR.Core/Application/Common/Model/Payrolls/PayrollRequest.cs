/// <summary>
/// Modelo de solicitud para Payroll.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DC365_PayrollHR.Core.Application.Common.Model
{
    /// <summary>
    /// Modelo de solicitud para Payroll.
    /// </summary>
    public class PayrollRequest : GenericValidation<PayrollRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CurrencyId { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsForHourPayroll { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "El nombre de la nómina no puede estar vacío"),
                ForRule(this, x => !Enum.IsDefined(typeof(PayFrecuency), x.PayFrecuency), "La frecuencia de pago suministrada no existe"),
                ForRule(this, x => x.ValidTo == default, "La fecha inicial no puede estar vacía"),
                ForRule(this, x => x.ValidFrom == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.ValidFrom > x.ValidTo, "La fecha final no puede ser menor que la fecha inicial"),
                ForRule(this, x => string.IsNullOrEmpty(x.CurrencyId), "La moneda no puede estar vacía")
            };

            return validationResults;

            //PayrollRequest model = (PayrollRequest)validationContext.ObjectInstance;
        }

    }
}
