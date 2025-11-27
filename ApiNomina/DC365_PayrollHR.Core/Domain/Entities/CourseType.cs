/// <summary>
/// Entidad de dominio para CourseType.
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
    /// Clase para gestion de CourseType.
    /// </summary>
    public class CourseType: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string CourseTypeId { get; set; }

        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Required / Max 200
        /// </summary>
        public string Description { get; set; }
    }
}
