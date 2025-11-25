using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class Loan: IValidatableObject
    {
        [CustomFilter("Id Préstamo")]
        public string LoanId { get; set; }

        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        public DateTime ValidTo { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]
        public DateTime ValidFrom { get; set; }

        public decimal MultiplyAmount { get; set; }
        public string LedgerAccount { get; set; }
        public string Description { get; set; }

        public PayFrecuency PayFrecuency { get; set; }
        public IndexBase IndexBase { get; set; }
        public string DepartmentId { get; set; }
        [CustomFilter("Proyecto")]
        public string ProjCategoryId { get; set; }
        public string ProjId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (ValidTo < ValidFrom)
            {
                Error.Add(new ValidationResult("Fecha hasta no puede ser menor a la fecha desde"));
            }

            return Error;
        }
    }
}
