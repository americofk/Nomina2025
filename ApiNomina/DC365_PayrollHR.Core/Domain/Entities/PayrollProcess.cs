/// <summary>
/// Entidad de dominio para PayrollProcess.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Proceso para PayrollProcess.
    /// </summary>
    public class PayrollProcess: AuditableCompanyEntity
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

        //Campos agregados fuera del diseño
        /// <summary>
        /// Empleado.
        /// </summary>
        public int EmployeeQuantityForPay { get; set; }
        //public string PrevProcessId { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public PayrollProcessStatus PayrollProcessStatus { get; set; } = PayrollProcessStatus.Creado;



        //Campo de la actualización
        /// <summary>
        /// Impuesto.
        /// </summary>
        public bool UsedForTax { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPayCycleTax { get; set; }

        /// <summary>

        /// Valor numerico para TotalAmountToPay.

        /// </summary>

        public decimal TotalAmountToPay { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        //Modificación para el cálculo de deducciones
        /// <summary>
        /// Indica el estado de UsedForTss.
        /// </summary>
        public bool UsedForTss { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPayCycleTss { get; set; }


        /// <summary>


        /// Indica si.


        /// </summary>


        public bool IsForHourPayroll { get; set; }
    }
}
