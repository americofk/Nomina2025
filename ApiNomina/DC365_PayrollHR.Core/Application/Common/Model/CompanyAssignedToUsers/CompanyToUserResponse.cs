/// <summary>
/// Modelo de respuesta para CompanyToUser.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers
{
    /// <summary>
    /// Modelo de respuesta para CompanyToUser.
    /// </summary>
    public class CompanyToUserResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyId { get; set; }
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CompanyName { get; set; }
    }
}
