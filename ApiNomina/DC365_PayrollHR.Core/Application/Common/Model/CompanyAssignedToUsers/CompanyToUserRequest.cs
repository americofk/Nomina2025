/// <summary>
/// Modelo de solicitud para CompanyToUser.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers
{
    /// <summary>
    /// Modelo de solicitud para CompanyToUser.
    /// </summary>
    public class CompanyToUserRequest
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyId { get; set; }
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
    }
}
