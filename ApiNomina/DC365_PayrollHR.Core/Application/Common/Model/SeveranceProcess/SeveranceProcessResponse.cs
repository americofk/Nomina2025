/// <summary>
/// Modelo de respuesta para SeveranceProcess.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.SeveranceProcess
{
    /// <summary>
    /// Modelo de respuesta para proceso de prestaciones.
    /// </summary>
    public class SeveranceProcessResponse
    {
        // Campos de auditoría ISO 27001
        /// <summary>
        /// Identificador único del registro.
        /// </summary>
        public long RecId { get; set; }

        /// <summary>
        /// Identificador de la empresa.
        /// </summary>
        public string DataAreaId { get; set; }

        /// <summary>
        /// Usuario que creó el registro.
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Fecha de creación del registro.
        /// </summary>
        public DateTime CreatedOn { get; set; }

        /// <summary>
        /// Usuario que modificó el registro.
        /// </summary>
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Fecha de última modificación.
        /// </summary>
        public DateTime ModifiedOn { get; set; }

        /// <summary>
        /// Identificador del proceso de prestaciones.
        /// </summary>
        public string SeveranceProcessId { get; set; }

        /// <summary>
        /// Descripción del proceso.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Fecha del proceso.
        /// </summary>
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
        /// Detalles de prestaciones por empleado.
        /// </summary>
        public List<SeveranceProcessDetailResponse> Details { get; set; }
    }
}
