using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class TaxDetail: IValidatableObject
    {
        //Salario anual superior a 
        [Required(ErrorMessage = "Salario anual superior a" + ErrorMsg.Emptym)]
        public decimal AnnualAmountHigher { get; set; }

        //Salario anual no excede 
        [Required(ErrorMessage = "Salario anual no excede" + ErrorMsg.Emptym)]
        public decimal AnnualAmountNotExceed { get; set; }
        [Required(ErrorMessage = "% Tasa" + ErrorMsg.Emptym)]
        public decimal Percent { get; set; }
        [Required(ErrorMessage = "Cuota fija" + ErrorMsg.Emptyf)]

        public decimal FixedAmount { get; set; }
        [Required(ErrorMessage = "Escala aplicable" + ErrorMsg.Emptyf)]
        public decimal ApplicableScale { get; set; }

        [Required(ErrorMessage = "ID. Código" + ErrorMsg.Emptym)]

        public string TaxId { get; set; }
        [Required(ErrorMessage = "ID. Código" + ErrorMsg.Emptym)]

        public int InternalId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            //if (AnnualAmountHigher = EndDate)
            //{
            //    Error.Add(new ValidationResult("Fecha final debe ser mayor a la fecha inicial"));
            //}

            return Error;
        }
    }
}
