/// <summary>
/// Modelo de respuesta para autenticación de usuarios.
/// Contiene la información del usuario autenticado y sus permisos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de respuesta para User.
    /// </summary>
    public class UserResponse
    {
        /// <summary>
        /// Token de acceso.
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Valor de texto para Avatar.
        /// </summary>
        public string Avatar { get; set; }
        /// <summary>
        /// Codigo.
        /// </summary>
        public string FormatCode { get; set; }
        /// <summary>
        /// Empresa.
        /// </summary>
        public string DefaultCompany { get; set; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Usuario.
        /// </summary>
        public List<CompanyForUser> UserCompanies { get; set; }
    }
}
