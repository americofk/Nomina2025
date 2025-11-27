/// <summary>
/// Modelo de respuesta para Payroll.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Payrolls
{
    /// <summary>
    /// Modelo de respuesta para Payroll.
    /// </summary>
    public class PayrollResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string CurrencyId { get; set; }

        /// <summary>

        /// Coleccion de PayCycles.

        /// </summary>

        public List<PayCycle> PayCycles { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsForHourPayroll { get; set; }

    }
}
