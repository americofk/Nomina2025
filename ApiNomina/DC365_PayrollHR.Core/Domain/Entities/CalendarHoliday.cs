/// <summary>
/// Entidad de dominio para CalendarHoliday.
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
    /// Clase para gestion de CalendarHoliday.
    /// </summary>
    public class CalendarHoliday : AuditableEntity
    {
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalendarDate { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
