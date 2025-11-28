/// <summary>
/// Modelo de datos para representar procesos de nómina.
/// Contiene información sobre la ejecución y cálculo de nóminas por período.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Proceso para PayrollProcess.
    /// </summary>
    public class PayrollProcess : AuditableCompanyModel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Id Proceso")]

        public string PayrollProcessId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        [CustomFilter("Descripción")]

        public string Description { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime PaymentDate { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public int EmployeeQuantity { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string ProjId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjCategoryId { get; set; }

        /// <summary>

        /// Fecha.

        /// </summary>

        [DataType(DataType.Date)]
        public DateTime PeriodStartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime PeriodEndDate { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public int PayCycleId { get; set; }

        /// <summary>

        /// Valor de texto para PayCycleFormat.

        /// </summary>

        public string PayCycleFormat {
            get {
                return $"[ {PeriodStartDate.ToString("dd-MM-yyyy")} ] - [ {PeriodEndDate.Date.ToString("dd-MM-yyyy")} ]";
            } 
        }

        //Campos agregados fuera del diseño
        /// <summary>
        /// Empleado.
        /// </summary>
        public int EmployeeQuantityForPay { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PrevProcessId { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public PayrollProcessStatus PayrollProcessStatus { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public List<PayrollProcessDetail> PayrollProcessDetails { get; set; }


        //Campos de tarjetas de totales
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal TotalEarnings { get; set; }
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal TotalDeductions { get; set; }
        /// <summary>
        /// Impuesto.
        /// </summary>
        public decimal TotalTaxes { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public decimal TotalLoans { get; set; }
        /// <summary>
        /// Total.
        /// </summary>
        public decimal Total { get; set; }
    }
}
