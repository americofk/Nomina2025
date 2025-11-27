/// <summary>
/// Entidad de dominio para Position.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Puesto
    /// </summary>
    public class Position: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatico
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Reqhuired / Max 50
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsVacant { get; set; } = false;

        /// <summary>
        /// Required / Max 20
        /// </summary>
        //Foreign key for department
        public string DepartmentId { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        //Foreign key for job - Cargo
        public string JobId { get; set; }

        /// <summary>
        /// Max 20
        /// </summary>
        //Foreign key for job
        public string NotifyPositionId { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public bool PositionStatus { get; set; } = true;
        /// <summary>
        /// Required
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Max 200
        /// </summary>
        public string Description { get; set; }
    }
}
