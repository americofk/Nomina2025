/// <summary>
/// Modelo de datos para representar ciclos de pago.
/// Define los perÃ­odos y fechas de pago de las nÃ³minas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class PayCycle
    {
        public int PayCycleId { get; set; }
        [DataType(DataType.Date)]
        public DateTime PeriodStartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime PeriodEndDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime DefaultPayDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime PayDate { get; set; }
        public decimal AmountPaidPerPeriod { get; set; }
        public StatusPeriod StatusPeriod { get; set; }

        //propiedad de navegación
        public string PayrollId { get; set; }
        //public Payroll Payroll { get; set; }

        public bool IsForTax { get; set; }

        public PayFrecuency PayFrecuency { get; set; }

        //Modificación para calcular el tss
        public bool IsForTss { get; set; }
    }
}
