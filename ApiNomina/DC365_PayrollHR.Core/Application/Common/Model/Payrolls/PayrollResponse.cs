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
