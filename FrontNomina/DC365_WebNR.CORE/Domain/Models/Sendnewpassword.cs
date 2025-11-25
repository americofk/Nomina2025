using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class Sendnewpassword: IValidatableObject
    {
        [MaxLength(100)]
        [RegularExpression("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", ErrorMessage = ErrorMsg.Email)]
        [Required(ErrorMessage = "Correo" + ErrorMsg.Emptym)]
        public string Email { get; set; }
        public string TemporaryPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirPassword { get; set; }

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
