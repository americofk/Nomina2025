using DC365_WebNR.CORE.Aplication;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeEarningCode : GenericError
    {
        public int InternalId { get; set; }

        [CustomFilter("Id Código")]
        [Required(ErrorMessage = "Código" + ErrorMsg.Emptym)]
        public string EarningCodeId { get; set; }
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]

        public DateTime FromDate { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]

        public DateTime ToDate { get; set; }

        public decimal IndexEarning { get; set; }
        [Required(ErrorMessage = "Índice mensual" + ErrorMsg.Emptyf)]

        public decimal IndexEarningMonthly { get; set; }
        public decimal IndexEarningMonthlyValidate { get { return IndexEarningMonthly;}}

        public PayFrecuency PayFrecuency { get; set; }

        public int Quantity { get; set; }
        [CustomFilter("Código de nómina")]
        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]
        public string PayrollId { get; set; }
        public string Comment { get; set; }
        [Required(ErrorMessage = "Período de inicio" + ErrorMsg.Emptym)]
        public int StartPeriodForPaid { get; set; }
        [Required(ErrorMessage = "Periodo para pago" + ErrorMsg.Emptym)]

        public int QtyPeriodForPaid { get; set; }

        [Required(ErrorMessage = "Código de ganancia" + ErrorMsg.Emptym)]
        public string EmployeeIdEarningCode { get; set; }

        public string EmployeeId
        {
            get
            {
                return EmployeeIdEarningCode;
            }
        }
        [CustomFilter("Nombre de nómina")]
        public string PayrollName { get; set; }
        [CustomFilter("Nombre de del código")]

        public string EarningName { get; set; }

        public decimal IndexEarningDiary { get; set; }

        public bool IsUseDGT { get; set; }

        public bool IsForDGT { get; set; } //es para guardar en el historial

        public bool IsUseCalcHour { get; set; }

        public decimal IndexEarningHour { get; set; }
    }
}
