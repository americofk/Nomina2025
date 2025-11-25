using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeExtraHour: GenericError
    {
        [DataType(DataType.Date)]
        public DateTime WorkedDay { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan StartHour { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan EndHour { get; set; }
        public int TotalHour { get; set; }
        public int TotalExtraHour { get; set; }
        public decimal Amount { get; set; }
        public decimal Indice { get; set; }
        public decimal Quantity { get; set; }
        public StatusExtraHour StatusExtraHour { get; set; }

        [CustomFilter("Código de nómina")]
        public string PayrollId { get; set; }

        [CustomFilter("Código hora extra")]
        public string EarningCodeId { get; set; }

        public string EmployeeIdExtraHour { get; set; }


        [CustomFilter("Nombre de nómina")]
        public string PayrollName { get; set; }

        [CustomFilter("Nombre hora extra")]
        public string EarningCodeName { get; set; }
        
        public string Comment { get; set; }

        //Actualización, campo para indicar la fecha de uso de horas extra
        [DataType(DataType.Date)]
        public DateTime CalcPayrollDate { get; set; }
        public string EmployeeId
        {
            get
            {
                return EmployeeIdExtraHour;
            }
        }
    }
}
