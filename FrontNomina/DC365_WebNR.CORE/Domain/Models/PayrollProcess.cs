using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class PayrollProcess
    {
        [CustomFilter("Id Proceso")]

        public string PayrollProcessId { get; set; }
        public string PayrollId { get; set; }
        [CustomFilter("Descripción")]

        public string Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime PaymentDate { get; set; }
        public int EmployeeQuantity { get; set; }

        public string ProjId { get; set; }
        public string ProjCategoryId { get; set; }

        [DataType(DataType.Date)]
        public DateTime PeriodStartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime PeriodEndDate { get; set; }

        public int PayCycleId { get; set; }

        public string PayCycleFormat {
            get {
                return $"[ {PeriodStartDate.ToString("dd-MM-yyyy")} ] - [ {PeriodEndDate.Date.ToString("dd-MM-yyyy")} ]";
            } 
        }

        //Campos agregados fuera del diseño
        public int EmployeeQuantityForPay { get; set; }
        public string PrevProcessId { get; set; }
        public PayrollProcessStatus PayrollProcessStatus { get; set; }
        public List<PayrollProcessDetail> PayrollProcessDetails { get; set; }


        //Campos de tarjetas de totales
        public decimal TotalEarnings { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal TotalTaxes { get; set; }
        public decimal TotalLoans { get; set; }
        public decimal Total { get; set; }
    }
}
