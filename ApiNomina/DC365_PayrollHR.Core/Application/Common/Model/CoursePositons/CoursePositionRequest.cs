using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CoursePositons
{
    public class CoursePositionRequest: GenericValidation<CoursePositionRequest>, IValidatableObject
    {
        public string CourseId { get; set; }
        public string PositionId { get; set; }
        public string Comment { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseId), "El curso no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PositionId), "La posición no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
