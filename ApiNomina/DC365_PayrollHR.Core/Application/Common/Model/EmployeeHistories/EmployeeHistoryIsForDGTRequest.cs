using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    public class EmployeeHistoryIsForDGTRequest: GenericValidation<EmployeeHistoryIsForDGTRequest>,IValidatableObject
    {
        public string EmployeeHistoryId { get; set; }
        public bool IsUseDGT { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeHistoryId), "El código de historial no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
