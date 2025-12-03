/// <summary>
/// Modelo de datos para representar procesos de prestaciones laborales.
/// Contiene información sobre el cálculo de prestaciones por terminación de contrato.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Proceso de Prestaciones Laborales.
    /// </summary>
    public class SeveranceProcess : AuditableCompanyModel
    {
        /// <summary>
        /// Identificador del proceso de prestaciones.
        /// </summary>
        [CustomFilter("Id Proceso")]
        public string SeveranceProcessId { get; set; }

        /// <summary>
        /// Descripción del proceso.
        /// </summary>
        [CustomFilter("Descripción")]
        public string Description { get; set; }

        /// <summary>
        /// Fecha del proceso.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime ProcessDate { get; set; }

        /// <summary>
        /// Cantidad de empleados en el proceso.
        /// </summary>
        public int EmployeeQuantity { get; set; }

        /// <summary>
        /// Total de preaviso.
        /// </summary>
        public decimal TotalPreaviso { get; set; }

        /// <summary>
        /// Total de cesantía.
        /// </summary>
        public decimal TotalCesantia { get; set; }

        /// <summary>
        /// Total de vacaciones.
        /// </summary>
        public decimal TotalVacaciones { get; set; }

        /// <summary>
        /// Total de salario de navidad.
        /// </summary>
        public decimal TotalNavidad { get; set; }

        /// <summary>
        /// Total general a pagar.
        /// </summary>
        public decimal TotalGeneral { get; set; }

        /// <summary>
        /// Estado del proceso.
        /// </summary>
        public SeveranceProcessStatus SeveranceProcessStatus { get; set; }

        /// <summary>
        /// Lista de detalles por empleado.
        /// </summary>
        public List<SeveranceProcessDetail> Details { get; set; }
    }
}
