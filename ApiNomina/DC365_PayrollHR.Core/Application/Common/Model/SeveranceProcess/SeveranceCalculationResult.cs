/// <summary>
/// Modelo de resultado del cálculo de prestaciones laborales.
/// Contiene todos los valores calculados según el Código de Trabajo (Ley 16-92).
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;

namespace DC365_PayrollHR.Core.Application.Common.Model.SeveranceProcess
{
    /// <summary>
    /// Resultado del cálculo de prestaciones laborales.
    /// </summary>
    public class SeveranceCalculationResult
    {
        /// <summary>
        /// ID del empleado.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>
        /// Nombre del empleado.
        /// </summary>
        public string EmployeeName { get; set; }

        #region Tiempo Laborado

        /// <summary>
        /// Fecha de inicio de trabajo.
        /// </summary>
        public DateTime StartWorkDate { get; set; }

        /// <summary>
        /// Fecha de terminación.
        /// </summary>
        public DateTime EndWorkDate { get; set; }

        /// <summary>
        /// Años trabajados.
        /// </summary>
        public int YearsWorked { get; set; }

        /// <summary>
        /// Meses trabajados (adicionales a los años).
        /// </summary>
        public int MonthsWorked { get; set; }

        /// <summary>
        /// Días trabajados (adicionales a los meses).
        /// </summary>
        public int DaysWorked { get; set; }

        /// <summary>
        /// Tiempo laborado en texto descriptivo.
        /// </summary>
        public string TiempoLaborando { get; set; }

        #endregion

        #region Salarios Mensuales

        /// <summary>
        /// Lista de salarios mensuales (12 meses).
        /// </summary>
        public List<MonthlySalary> SalariosMensuales { get; set; } = new List<MonthlySalary>();

        /// <summary>
        /// Suma total de los 12 meses de salarios.
        /// </summary>
        public decimal SumaSalarios { get; set; }

        /// <summary>
        /// Salario promedio mensual (SumaSalarios / 12).
        /// </summary>
        public decimal SalarioPromedioMensual { get; set; }

        /// <summary>
        /// Salario promedio diario (SalarioPromedioMensual / 23.83).
        /// </summary>
        public decimal SalarioPromedioDiario { get; set; }

        #endregion

        #region Preaviso

        /// <summary>
        /// Días de preaviso según antigüedad.
        /// </summary>
        public int DiasPreaviso { get; set; }

        /// <summary>
        /// Monto de preaviso.
        /// </summary>
        public decimal MontoPreaviso { get; set; }

        #endregion

        #region Cesantía

        /// <summary>
        /// Días de cesantía según antigüedad.
        /// </summary>
        public int DiasCesantia { get; set; }

        /// <summary>
        /// Monto de cesantía.
        /// </summary>
        public decimal MontoCesantia { get; set; }

        #endregion

        #region Vacaciones

        /// <summary>
        /// Días de vacaciones pendientes.
        /// </summary>
        public decimal DiasVacaciones { get; set; }

        /// <summary>
        /// Monto de vacaciones.
        /// </summary>
        public decimal MontoVacaciones { get; set; }

        #endregion

        #region Salario de Navidad

        /// <summary>
        /// Meses trabajados en el año actual.
        /// </summary>
        public int MesesTrabajadosAnio { get; set; }

        /// <summary>
        /// Días adicionales trabajados en el año.
        /// </summary>
        public int DiasTrabajadosAnio { get; set; }

        /// <summary>
        /// Monto de salario de navidad proporcional.
        /// </summary>
        public decimal MontoNavidad { get; set; }

        #endregion

        /// <summary>
        /// Total a recibir (suma de todos los conceptos).
        /// </summary>
        public decimal TotalARecibir { get; set; }
    }

    /// <summary>
    /// Representa el salario de un mes.
    /// </summary>
    public class MonthlySalary
    {
        /// <summary>
        /// Número del mes (1-12).
        /// </summary>
        public int MesNumero { get; set; }

        /// <summary>
        /// Año y mes en formato texto.
        /// </summary>
        public string Periodo { get; set; }

        /// <summary>
        /// Monto del salario base.
        /// </summary>
        public decimal Salario { get; set; }

        /// <summary>
        /// Monto de comisiones.
        /// </summary>
        public decimal Comision { get; set; }

        /// <summary>
        /// Total del mes (Salario + Comision).
        /// </summary>
        public decimal Total { get; set; }
    }
}
