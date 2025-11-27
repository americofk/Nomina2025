/// <summary>
/// Modelo de datos para el cambio de contraseña de usuarios.
/// Gestiona el proceso de restablecimiento y actualización de contraseñas.
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
    /// Clase para gestion de Sendnewpassword.
    /// </summary>
    public class Sendnewpassword: IValidatableObject
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
        public string TemporaryPassword { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public string NewPassword { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public string ConfirPassword { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (NewPassword != ConfirPassword)
            {
                Error.Add(new ValidationResult("No coinciden la confirmación de contraseña y la nueva contraseña"));
            }
            if (string.IsNullOrEmpty(NewPassword))
            {
                Error.Add(new ValidationResult("Ingrese nueva contraseña"));
            }
            if (string.IsNullOrEmpty(TemporaryPassword))
            {
                Error.Add(new ValidationResult("Ingrese contraseña temporal"));
            }
            if (string.IsNullOrEmpty(ConfirPassword))
            {
                Error.Add(new ValidationResult("Ingrese confirmación de contraseña"));
            }

            return Error;
        }
    }
}
