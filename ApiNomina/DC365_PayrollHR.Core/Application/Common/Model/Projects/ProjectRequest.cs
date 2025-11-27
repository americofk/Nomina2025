/// <summary>
/// Modelo de solicitud para Project.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System.ComponentModel.DataAnnotations;

namespace DC365_PayrollHR.Core.Application.Common.Model.Projects
{
    /// <summary>
    /// Modelo de solicitud para Project.
    /// </summary>
    public class ProjectRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }

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
