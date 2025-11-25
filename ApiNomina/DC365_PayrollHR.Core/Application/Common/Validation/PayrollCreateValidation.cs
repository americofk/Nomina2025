using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Validation
{
    public class PayrollCreateValidation : IValidatableObject
    {
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            PayrollRequest model = (PayrollRequest)validationContext.ObjectInstance;

            List<ValidationResult> errors = new List<ValidationResult>();

            if (string.IsNullOrWhiteSpace(model.Name))
                errors.Add(new ValidationResult("El nombre de la nómina no puede estar vacío"));

            if (!PayFrecuency.IsDefined(typeof(PayFrecuency), model.PayFrecuency))
                errors.Add(new ValidationResult("La frecuencia de pago suministrada no existe"));

            return errors;
        }
    }
}
