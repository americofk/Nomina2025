using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeDeductionCode: GenericError
    {
        [Required(ErrorMessage = "Código" + ErrorMsg.Emptym)]
        public string DeductionCodeId { get; set; }
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        public decimal IndexDeduction { get; set; }
        public decimal PercentDeduction { get; set; }
        public decimal PercentContribution { get; set; }
        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]
        public string PayrollId { get; set; }
        public string Comment { get; set; }
        public string EmployeeIdDeductionCode { get; set; }

        public string EmployeeId
        {
            get
            {
                return EmployeeIdDeductionCode;
            }
        }

        public string PayrollName { get; set; }
        public string DeductionName { get; set; }

        public decimal DeductionAmount { get; set; }


        public string IndexEarningMonthly { get; set; }
        public string IndexEarningMonthlyValidate { get; set; }

        //Actualización deducciones por período
        public int QtyPeriodForPaid { get; set; }
        public int StartPeriodForPaid { get; set; }
        public PayFrecuency PayFrecuency { get; set; }
    }
}
