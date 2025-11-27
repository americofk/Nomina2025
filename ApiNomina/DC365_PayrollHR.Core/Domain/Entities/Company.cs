/// <summary>
/// Entidad de dominio para Company.
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
    /// Clase para gestion de Company.
    /// </summary>
    public class Company : AuditableEntity
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
        /// Valor de texto para Identification.
        /// </summary>
        public string Identification { get; set; }
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


        /// <summary>


        /// Estado.


        /// </summary>


        public bool CompanyStatus { get; set; } = true;
    }
}
