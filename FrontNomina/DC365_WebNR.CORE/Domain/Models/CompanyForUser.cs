/// <summary>
/// Modelo de datos para representar empresas asignadas a un usuario.
/// Contiene la información básica de las compañías accesibles por el usuario.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de CompanyForUser.
    /// </summary>
    public class CompanyForUser
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string companyId { get; set; }
        /// <summary>
        /// Valor de texto para name.
        /// </summary>
        public string name { get; set; }
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
