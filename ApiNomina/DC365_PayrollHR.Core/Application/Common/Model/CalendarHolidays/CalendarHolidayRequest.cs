using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CalendarHolidays
{
    public class CalendarHolidayRequest : GenericValidation<CalendarHolidayRequest>, IValidatableObject
    {
        public DateTime CalendarDate { get; set; }
        public string Description { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => x.CalendarDate == default, "La fecha de calendario no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
