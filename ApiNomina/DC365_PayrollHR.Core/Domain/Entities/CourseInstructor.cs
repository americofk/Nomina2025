/// <summary>
/// Entidad de dominio para CourseInstructor.
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
    /// Clase para gestion de CourseInstructor.
    /// </summary>
    public class CourseInstructor: AuditableCompanyEntity
    {
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string CourseId { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string InstructorId { get; set; }
        /// <summary>
        /// Max 300
        /// </summary>
        public string  Comment { get; set; }
    }
}
