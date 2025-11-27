/// <summary>
/// Modelo de datos para cambiar la empresa activa del usuario.
/// Permite al usuario alternar entre diferentes compañías asignadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de ChangeCompany.
    /// </summary>
    public class ChangeCompany
    {
        /// <summary>
        /// Token de acceso.
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
    }
}
