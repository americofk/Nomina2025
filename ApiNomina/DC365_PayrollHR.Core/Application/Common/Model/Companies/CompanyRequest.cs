/// <summary>
/// Modelo de solicitud para Company.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Companies
{
    /// <summary>
    /// Modelo de solicitud para Company.
    /// </summary>
    public class CompanyRequest
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
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Telefono.
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Valor de texto para Responsible.
        /// </summary>
        public string Responsible { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string CountryId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CurrencyId { get; set; }

        /// <summary>

        /// Empresa.

        /// </summary>

        public string CompanyLogo { get; set; }


        /// <summary>


        /// Valor de texto para LicenseKey.


        /// </summary>


        public string LicenseKey { get; set; }
    }
}
