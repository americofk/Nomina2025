/// <summary>
/// Modelo de respuesta para PayrollProcess.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.PayrollsProcess
{
    /// <summary>
    /// Modelo de respuesta para PayrollProcess.
    /// </summary>
    public class PayrollProcessResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
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
        public DateTime PeriodStartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PeriodEndDate { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public int PayCycleId { get; set; }

        /// <summary>

        /// Empleado.

        /// </summary>

        public int EmployeeQuantityForPay { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public PayrollProcessStatus PayrollProcessStatus { get; set; }

        /// <summary>

        /// Nomina.

        /// </summary>

        public List<PayrollProcessDetail> PayrollProcessDetails { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        //Campos de tarjetas de totales
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal TotalEarnings { get; set; }
        /// <summary>
        /// Valor numerico para TotalExtraHours.
        /// </summary>
        public decimal TotalExtraHours { get; set; }
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
