/// <summary>
/// Modelo de solicitud para actualización de Project.
/// Define los parámetros necesarios para actualizar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System.ComponentModel.DataAnnotations;

namespace DC365_PayrollHR.Core.Application.Common.Model.Projects
{
    /// <summary>
    /// Clase para gestion de ProjectRequestUpdate.
    /// </summary>
    public class ProjectRequestUpdate
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        [Required(ErrorMessage = "El nombre no puede estar vacío")]
        public string Name { get; set; }

        /// <summary>

        /// Valor de texto para LedgerAccount.

        /// </summary>

        public string LedgerAccount { get; set; }
    }
}
