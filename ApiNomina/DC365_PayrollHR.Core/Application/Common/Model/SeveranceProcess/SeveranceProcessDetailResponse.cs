/// <summary>
/// Modelo de respuesta para SeveranceProcessDetail.
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
    /// Modelo de respuesta para detalle de prestaciones por empleado.
    /// </summary>
    public class SeveranceProcessDetailResponse
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
        /// Identificador del empleado.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>
        /// Nombre completo del empleado.
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Documento del empleado.
        /// </summary>
        public string Document { get; set; }

        /// <summary>
        /// Fecha de inicio de empleo.
        /// </summary>
        public DateTime StartWorkDate { get; set; }

        /// <summary>
        /// Fecha final de empleo.
        /// </summary>
        public DateTime EndWorkDate { get; set; }

        /// <summary>
        /// Tipo de cálculo de prestaciones.
        /// </summary>
        public SeveranceCalculationType CalculationType { get; set; }

        /// <summary>
        /// Tiempo laborando en texto.
        /// </summary>
        public string TiempoLaborando { get; set; }

        /// <summary>
        /// Años trabajados.
        /// </summary>
        public int YearsWorked { get; set; }

        /// <summary>
        /// Meses trabajados.
        /// </summary>
        public int MonthsWorked { get; set; }

        /// <summary>
        /// Días trabajados.
        /// </summary>
        public int DaysWorked { get; set; }

        #region Salarios

        /// <summary>
        /// Suma de salarios.
        /// </summary>
        public decimal SumaSalarios { get; set; }

        /// <summary>
        /// Salario promedio mensual.
        /// </summary>
        public decimal SalarioPromedioMensual { get; set; }

        /// <summary>
        /// Salario promedio diario.
        /// </summary>
        public decimal SalarioPromedioDiario { get; set; }

        #endregion

        #region Preaviso

        /// <summary>
        /// Indica si fue preavisado.
        /// </summary>
        public bool WasNotified { get; set; }

        /// <summary>
        /// Días de preaviso.
        /// </summary>
        public int DiasPreaviso { get; set; }

        /// <summary>
        /// Monto de preaviso.
        /// </summary>
        public decimal MontoPreaviso { get; set; }

        #endregion

        #region Cesantía

        /// <summary>
        /// Indica si incluye cesantía.
        /// </summary>
        public bool IncludeCesantia { get; set; }

        /// <summary>
        /// Días de cesantía.
        /// </summary>
        public int DiasCesantia { get; set; }

        /// <summary>
        /// Monto de cesantía.
        /// </summary>
        public decimal MontoCesantia { get; set; }

        #endregion

        #region Vacaciones

        /// <summary>
        /// Indica si tomó vacaciones.
        /// </summary>
        public bool TookVacations { get; set; }

        /// <summary>
        /// Días de vacaciones.
        /// </summary>
        public decimal DiasVacaciones { get; set; }

        /// <summary>
        /// Monto de vacaciones.
        /// </summary>
        public decimal MontoVacaciones { get; set; }

        #endregion

        #region Navidad

        /// <summary>
        /// Indica si incluye salario navidad.
        /// </summary>
        public bool IncludeNavidad { get; set; }

        /// <summary>
        /// Meses trabajados en el año.
        /// </summary>
        public int MesesTrabajadosAnio { get; set; }

        /// <summary>
        /// Monto de salario navidad.
        /// </summary>
        public decimal MontoNavidad { get; set; }

        #endregion

        /// <summary>
        /// Total a recibir.
        /// </summary>
        public decimal TotalARecibir { get; set; }

        /// <summary>
        /// Comentarios.
        /// </summary>
        public string Comments { get; set; }
    }
}
