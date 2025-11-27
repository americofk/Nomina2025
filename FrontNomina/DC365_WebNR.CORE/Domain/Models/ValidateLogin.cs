/// <summary>
/// Modelo de datos para validar inicio de sesión de usuarios.
/// Define las credenciales necesarias para autenticarse en el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de ValidateLogin.
    /// </summary>
    public class ValidateLogin
    {
        [MaxLength(100)]
        [RegularExpression("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", ErrorMessage = ErrorMsg.Email)]
        /// <summary>
        /// Correo electronico.
        /// </summary>
        [Required(ErrorMessage = "Correo" + ErrorMsg.Emptym)]
        public string Email { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsValidateUser { get; set; }
    }
}
