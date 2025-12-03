/// <summary>
/// Modelo de datos para representar el detalle de prestaciones por empleado.
/// Contiene los cálculos específicos de preaviso, cesantía, vacaciones y navidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Domain.Models.Common;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Detalle de Prestaciones Laborales por Empleado.
    /// </summary>
    public class SeveranceProcessDetail : AuditableCompanyModel
    {
        /// <summary>
        /// Referencia al RecId del proceso de prestaciones.
        /// </summary>
        public long SeveranceRefRecId { get; set; }

        /// <summary>
        /// Identificador del proceso.
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
        [DataType(DataType.Date)]
        public DateTime StartWorkDate { get; set; }

        /// <summary>
        /// Fecha final de empleo.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime EndWorkDate { get; set; }

        /// <summary>
        /// Tipo de cálculo.
        /// </summary>
        public SeveranceCalculationType CalculationType { get; set; }

        /// <summary>
        /// Frecuencia de pago del empleado.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }

        /// <summary>
        /// Tipo de calculo de salario (0=Ordinario, 1=Intermitente).
        /// </summary>
        public int SalaryCalculationType { get; set; }

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

        #region Salarios Mensuales

        /// <summary>Salario mes 1.</summary>
        public decimal SalarioMes1 { get; set; }
        /// <summary>Salario mes 2.</summary>
        public decimal SalarioMes2 { get; set; }
        /// <summary>Salario mes 3.</summary>
        public decimal SalarioMes3 { get; set; }
        /// <summary>Salario mes 4.</summary>
        public decimal SalarioMes4 { get; set; }
        /// <summary>Salario mes 5.</summary>
        public decimal SalarioMes5 { get; set; }
        /// <summary>Salario mes 6.</summary>
        public decimal SalarioMes6 { get; set; }
        /// <summary>Salario mes 7.</summary>
        public decimal SalarioMes7 { get; set; }
        /// <summary>Salario mes 8.</summary>
        public decimal SalarioMes8 { get; set; }
        /// <summary>Salario mes 9.</summary>
        public decimal SalarioMes9 { get; set; }
        /// <summary>Salario mes 10.</summary>
        public decimal SalarioMes10 { get; set; }
        /// <summary>Salario mes 11.</summary>
        public decimal SalarioMes11 { get; set; }
        /// <summary>Salario mes 12.</summary>
        public decimal SalarioMes12 { get; set; }

        /// <summary>Comisión mes 1.</summary>
        public decimal ComisionMes1 { get; set; }
        /// <summary>Comisión mes 2.</summary>
        public decimal ComisionMes2 { get; set; }
        /// <summary>Comisión mes 3.</summary>
        public decimal ComisionMes3 { get; set; }
        /// <summary>Comisión mes 4.</summary>
        public decimal ComisionMes4 { get; set; }
        /// <summary>Comisión mes 5.</summary>
        public decimal ComisionMes5 { get; set; }
        /// <summary>Comisión mes 6.</summary>
        public decimal ComisionMes6 { get; set; }
        /// <summary>Comisión mes 7.</summary>
        public decimal ComisionMes7 { get; set; }
        /// <summary>Comisión mes 8.</summary>
        public decimal ComisionMes8 { get; set; }
        /// <summary>Comisión mes 9.</summary>
        public decimal ComisionMes9 { get; set; }
        /// <summary>Comisión mes 10.</summary>
        public decimal ComisionMes10 { get; set; }
        /// <summary>Comisión mes 11.</summary>
        public decimal ComisionMes11 { get; set; }
        /// <summary>Comisión mes 12.</summary>
        public decimal ComisionMes12 { get; set; }

        #endregion

        #region Salarios Totales

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
