using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EarningCode: IValidatableObject
    {
        [CustomFilter("Id Código")]
        public string EarningCodeId { get; set; }

        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        public bool IsTSS { get; set; }
        public bool IsISR { get; set; }
        public bool IsExtraHours { get; set; }
        [CustomFilter("Proyecto")]
        public string ProjId { get; set; }
        public int Internalid { get; set; }

        [CustomFilter("Válido desde")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido desde" + ErrorMsg.Emptym)]
        public DateTime ValidFrom { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido hasta" + ErrorMsg.Emptym)]
        public DateTime ValidTo { get; set; }

        public string Description { get; set; }

        public bool IsEnabled { get; set; } = true;

        public IndexBaseTwo IndexBase { get; set; }
        [Required(ErrorMessage = "Monto o porcentaje" + ErrorMsg.Emptym)]

        [CustomFilter("Monto/Porcentaje")]
        public decimal MultiplyAmount { get; set; }
     
        public string LedgerAccount { get; set; }

        public string Department { get; set; }

        public bool EarningCodeStatus { get; set; }

        public bool IsRoyaltyPayroll { get; set; }

        public bool IsVersion { get; set; }

        public bool IsUseDGT { get; set; }

        //Actualización para cálculo automático de horas extras
        public bool IsHoliday { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (IndexBase == IndexBaseTwo.Hour && MultiplyAmount==0)
            {
                Error.Add(new ValidationResult("Debe ingresar monto o porcentaje"));
            }

            return Error;
        }

    }
}
