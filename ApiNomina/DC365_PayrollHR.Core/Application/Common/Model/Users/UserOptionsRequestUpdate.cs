using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    public class UserOptionsRequestUpdate: GenericValidation<UserOptionsRequestUpdate>, IValidatableObject
    {
        public string FormatCodeId { get; set; }
        public string CompanyDefaultId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.FormatCodeId), "El código de formato no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CompanyDefaultId), "La empresa por defecto no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
