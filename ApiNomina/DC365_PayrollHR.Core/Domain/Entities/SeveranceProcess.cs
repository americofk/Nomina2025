/// <summary>
/// Entidad de dominio para SeveranceProcess (Proceso de Prestaciones Laborales).
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Proceso de Prestaciones Laborales.
    /// Representa un proceso de cálculo de prestaciones para uno o más empleados.
    /// </summary>
    public class SeveranceProcess : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador único del proceso de prestaciones (PK).
        /// Formato: PRES-000000001
        /// </summary>
        public string SeveranceProcessId { get; set; }

        /// <summary>
        /// Descripción del proceso de prestaciones.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Fecha del proceso (fecha de creación/ejecución).
        /// </summary>
        public DateTime ProcessDate { get; set; }

        /// <summary>
        /// Cantidad de empleados incluidos en el proceso.
        /// </summary>
        public int EmployeeQuantity { get; set; }

        /// <summary>
        /// Total de preaviso de todos los empleados.
        /// </summary>
        public decimal TotalPreaviso { get; set; }

        /// <summary>
        /// Total de cesantía de todos los empleados.
        /// </summary>
        public decimal TotalCesantia { get; set; }

        /// <summary>
        /// Total de vacaciones de todos los empleados.
        /// </summary>
        public decimal TotalVacaciones { get; set; }

        /// <summary>
        /// Total de salario de navidad de todos los empleados.
        /// </summary>
        public decimal TotalNavidad { get; set; }

        /// <summary>
        /// Total general a pagar (suma de todos los conceptos).
        /// </summary>
        public decimal TotalGeneral { get; set; }

        /// <summary>
        /// Estado del proceso de prestaciones.
        /// </summary>
        public SeveranceProcessStatus SeveranceProcessStatus { get; set; } = SeveranceProcessStatus.Creado;

        /// <summary>
        /// Lista de detalles por empleado (no mapeada a BD, solo para respuesta).
        /// </summary>
        public List<SeveranceProcessDetail> Details { get; set; }
    }
}
