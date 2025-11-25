using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;
using static DC365_WebNR.CORE.Domain.Models.Enums.GlobalsEnum;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class Payroll: IValidatableObject
    {
        [CustomFilter("Id Nómina")]
        public string PayrollId { get; set; }
        [Required(ErrorMessage = "Nombre de nómina" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        public PayFrecuency PayFrecuency { get; set; }
        [Required(ErrorMessage = "Fecha inicial" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime ValidFrom { get; set; }
        [Required(ErrorMessage = "Fecha final" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime ValidTo { get; set; }
        [CustomFilter("Descripción")]
        public string Description { get; set; }
        public bool IsRoyaltyPayroll { get; set; }
        [Required(ErrorMessage = "Moneda" + ErrorMsg.Emptyf)]

        public string CurrencyId { get; set; }
        public int PayCycleQty { get; set; }
        public bool PayrollStatus { get; set; }
        public bool IsForHourPayroll { get; set; }
        public int BankSecuence { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (string.IsNullOrEmpty(Name))
            {
                Error.Add(new ValidationResult("Nombre no puede estar vacio"));
            }

           

            if (ValidFrom == default)
            {
                Error.Add(new ValidationResult("Fecha de inicio no puede estar vacio"));
            }

            if (ValidTo == default)
            {
                Error.Add(new ValidationResult("Fecha final no puede estar vacio"));
            }
            return Error;
        }
    }
}
