/// <summary>
/// Modelo de solicitud para ProjCategory.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.ProjCategories
{
    /// <summary>
    /// Modelo de solicitud para ProjCategory.
    /// </summary>
    public class ProjCategoryRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjCategoryId { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        [Required(ErrorMessage = "El nombre no puede estar vacío")]
        public string CategoryName { get; set; }

        /// <summary>

        /// Valor de texto para LedgerAccount.

        /// </summary>

        public string LedgerAccount { get; set; }
    }
}
