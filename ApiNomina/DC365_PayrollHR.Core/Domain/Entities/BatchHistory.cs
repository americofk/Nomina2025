/// <summary>
/// Entidad de dominio para BatchHistory.
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
    /// Clase para gestion de BatchHistory.
    /// </summary>
    public class BatchHistory: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Obtiene o establece BatchEntity.
        /// </summary>
        public BatchEntity BatchEntity { get; set; }
        /// <summary>
        /// Valor de texto para Information.
        /// </summary>
        public string Information { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsError { get; set; } = false;
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsFinished { get; set; } = false;

    }
}
