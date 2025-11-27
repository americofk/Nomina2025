/// <summary>
/// Modelo de respuesta para Company.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Companies
{
    /// <summary>
    /// Modelo de respuesta para Company.
    /// </summary>
    public class CompanyResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public bool CompanyStatus { get; set; }
    }
}
