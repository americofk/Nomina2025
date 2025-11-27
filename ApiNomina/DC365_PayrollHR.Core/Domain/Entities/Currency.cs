/// <summary>
/// Entidad de dominio para Currency.
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
    /// Clase para gestion de Currency.
    /// </summary>
    public class Currency : AuditableEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CurrencyId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
    }
}
