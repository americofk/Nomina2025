/// <summary>
/// Entidad de dominio para Instructor.
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
    /// Clase para gestion de Instructor.
    /// </summary>
    public class Instructor: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string InstructorId { get; set; }
        /// <summary>
        /// Required, Max 50
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Max 20
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        public string Mail { get; set; }
        /// <summary>
        /// Required, Max 100
        /// </summary>
        public string Company { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        public string Comment { get; set; }
    }
}
