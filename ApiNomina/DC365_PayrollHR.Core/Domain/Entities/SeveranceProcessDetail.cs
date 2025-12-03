/// <summary>
/// Entidad de dominio para SeveranceProcessDetail (Detalle de Prestaciones por Empleado).
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
    /// Detalle de Prestaciones Laborales por Empleado.
    /// Contiene el cálculo individual de prestaciones para cada empleado.
    /// </summary>
    public class SeveranceProcessDetail : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador interno del detalle.
        /// </summary>
        public int InternalId { get; set; }

        /// <summary>
        /// Referencia al RecId del proceso de prestaciones (FK).
        /// </summary>
        public long SeveranceRefRecId { get; set; }

        /// <summary>
        /// Identificador del proceso de prestaciones.
        /// </summary>
        public string SeveranceProcessId { get; set; }

        /// <summary>
        /// Identificador del empleado (FK).
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>
        /// Nombre completo del empleado.
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Número de documento del empleado.
        /// </summary>
        public string Document { get; set; }

        /// <summary>
        /// Fecha de inicio de empleo.
        /// </summary>
        public DateTime StartWorkDate { get; set; }

        /// <summary>
        /// Fecha final de empleo (fecha de terminación).
        /// </summary>
        public DateTime EndWorkDate { get; set; }

        /// <summary>
        /// Tipo de cálculo de prestaciones.
        /// </summary>
        public SeveranceCalculationType CalculationType { get; set; }

        /// <summary>
        /// Frecuencia de pago del empleado.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; } = PayFrecuency.NoSeleccionado;

        /// <summary>
        /// Tipo de cálculo de salario (0=Ordinario, 1=Intermitente, -1=No seleccionado).
        /// </summary>
        public int SalaryCalculationType { get; set; } = -1;

        /// <summary>
        /// Tiempo laborando en texto descriptivo (ej: "2 años, 3 meses").
        /// </summary>
        public string TiempoLaborando { get; set; }

        /// <summary>
        /// Años completos trabajados.
        /// </summary>
        public int YearsWorked { get; set; }

        /// <summary>
        /// Meses adicionales trabajados (después de los años completos).
        /// </summary>
        public int MonthsWorked { get; set; }

        /// <summary>
        /// Días adicionales trabajados.
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
        /// Suma de salarios de los últimos 12 meses.
        /// </summary>
        public decimal SumaSalarios { get; set; }

        /// <summary>
        /// Salario promedio mensual (SumaSalarios / meses trabajados, máx 12).
        /// </summary>
        public decimal SalarioPromedioMensual { get; set; }

        /// <summary>
        /// Salario promedio diario (SalarioPromedioMensual / 23.83).
        /// </summary>
        public decimal SalarioPromedioDiario { get; set; }

        #endregion

        #region Preaviso (Art. 76)

        /// <summary>
        /// Indica si el empleado fue preavisado.
        /// Si fue preavisado, no se paga el monto de preaviso.
        /// </summary>
        public bool WasNotified { get; set; }

        /// <summary>
        /// Días de preaviso según tiempo trabajado.
        /// 3-6 meses = 7 días, 6-12 meses = 14 días, +1 año = 28 días.
        /// </summary>
        public int DiasPreaviso { get; set; }

        /// <summary>
        /// Monto calculado de preaviso.
        /// </summary>
        public decimal MontoPreaviso { get; set; }

        #endregion

        #region Cesantía (Art. 80)

        /// <summary>
        /// Indica si se debe incluir cesantía en el cálculo.
        /// </summary>
        public bool IncludeCesantia { get; set; }

        /// <summary>
        /// Días de cesantía según tiempo trabajado.
        /// 3-6 meses = 6 días, 6-12 meses = 13 días, 1-5 años = 21 días/año, +5 años = 23 días/año.
        /// </summary>
        public int DiasCesantia { get; set; }

        /// <summary>
        /// Monto calculado de cesantía.
        /// </summary>
        public decimal MontoCesantia { get; set; }

        #endregion

        #region Vacaciones (Art. 177)

        /// <summary>
        /// Indica si el empleado tomó las vacaciones del último año.
        /// Si no las tomó, se pagan los días pendientes.
        /// </summary>
        public bool TookVacations { get; set; }

        /// <summary>
        /// Días de vacaciones disponibles/pendientes.
        /// 1-5 años = 14 días, +5 años = 18 días.
        /// </summary>
        public decimal DiasVacaciones { get; set; }

        /// <summary>
        /// Monto calculado de vacaciones.
        /// </summary>
        public decimal MontoVacaciones { get; set; }

        #endregion

        #region Salario de Navidad (Art. 219)

        /// <summary>
        /// Indica si se debe incluir el salario de navidad en el cálculo.
        /// </summary>
        public bool IncludeNavidad { get; set; }

        /// <summary>
        /// Meses trabajados en el año calendario actual (para cálculo proporcional).
        /// </summary>
        public int MesesTrabajadosAnio { get; set; }

        /// <summary>
        /// Monto calculado de salario de navidad (duodécima parte del salario anual).
        /// </summary>
        public decimal MontoNavidad { get; set; }

        #endregion

        /// <summary>
        /// Total a recibir por el empleado (suma de todos los conceptos aplicables).
        /// </summary>
        public decimal TotalARecibir { get; set; }

        /// <summary>
        /// Comentarios o notas adicionales.
        /// </summary>
        public string Comments { get; set; }
    }
}
