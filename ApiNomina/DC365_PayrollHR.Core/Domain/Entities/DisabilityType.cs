/// <summary>
/// Entidad de dominio para DisabilityType.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de DisabilityType.
    /// </summary>
    public class DisabilityType : AuditableEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DisabilityTypeId { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
