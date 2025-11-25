using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeLoan: GenericError, IValidatableObject
    {
        public int InternalId { get; set; }

        [Required(ErrorMessage = "Codigo" + ErrorMsg.Emptym)]
        public string LoanId { get; set; }
        public string LoanName { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        public DateTime ValidTo { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]
        public DateTime ValidFrom { get; set; }

        [Required(ErrorMessage = "Monto" + ErrorMsg.Emptym)]
        public decimal LoanAmount { get; set; }
        public int PayDays { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal PendingAmount { get; set; }
        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]
        public string PayrollId { get; set; }
        public string PayrollName { get; set; }
        public PayFrecuency PayFrecuency { get; set; }
        public string EmployeeIdLoan { get; set; }
        [Required(ErrorMessage = "Cuotas" + ErrorMsg.Emptym)]
        public decimal AmountByDues { get; set; }
        public string EmployeeId
        {
            get
            {
                return EmployeeIdLoan;
            }
        }
        
       

        //public PayFrecuency PayFrecuency { get; set; }
        //public int PayDays { get; set; }

        public int TotalDues { get; set; }
        public int PendingDues { get; set; }

        [Required(ErrorMessage = "Frecuencia de pago" + ErrorMsg.Emptyf)]
        public int QtyPeriodForPaid { get; set; }
        [Required(ErrorMessage = ErrorMsg.Emptym)]
        public int StartPeriodForPaid { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();
            validationResults.Add((QtyPeriodForPaid == 0) ? new ValidationResult("Frecuencia de pago" + ErrorMsg.Empty0) : null);
            validationResults.Add((AmountByDues == 0) ? new ValidationResult( "Cuotas" + ErrorMsg.Empty0 ) : null);
            validationResults.Add((LoanAmount == 0) ?  new ValidationResult( "Monto" + ErrorMsg.Empty0): null);
            validationResults.Add((PendingAmount == 0) ?  new ValidationResult("Monto pendiente" + ErrorMsg.Empty0): null);
            return validationResults;
        }
    }
}
