/// <summary>
/// Entidad de dominio para EarningCodeVersion.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EarningCodeVersion.
    /// </summary>
    public class EarningCodeVersion : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsTSS { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsISR { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsExtraHours { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsUseDGT { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string ProjId { get; set; }
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

        /// Obtiene o establece IndexBase.

        /// </summary>

        public IndexBase IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal MultiplyAmount { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public string Department { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        //Actualización para cálculo automático de horas extras
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsHoliday { get; set; }
        /// <summary>
        /// Obtiene o establece WorkFrom.
        /// </summary>
        public TimeSpan WorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece WorkTo.
        /// </summary>
        public TimeSpan WorkTo { get; set; }
    }
}
