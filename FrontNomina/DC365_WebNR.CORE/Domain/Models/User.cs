/// <summary>
/// Modelo de datos para representar usuarios del sistema.
/// Define la información de acceso y permisos de los usuarios de la aplicación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Common;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class User : AuditableCompanyModel, IValidatableObject
    {
        [Required(ErrorMessage = "Alias" + ErrorMsg.Emptym)]
        [CustomFilter("Alias")]
        public string Alias { get; set; }
        [Required(ErrorMessage = "Email" + ErrorMsg.Emptym)]

        [CustomFilter("Email")]
        public string Email { get; set; }

        public string Password { get; set; }
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]

        [CustomFilter("Nombre")]
        public string Name { get; set; }
        public string FormatCodeId { get; set; }

        public AdminType ElevationType {
            get {
                return ElevationTypeBool ? AdminType.AdministradorLocal : AdminType.Usuario;
            }

            set
            {
                ElevationTypeBool = (value == AdminType.AdministradorLocal);
            }
        }

        public Boolean ElevationTypeBool { get; set; }

        public string CompanyDefaultId { get; set; }
        public bool test { get; set; } = false;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (string.IsNullOrEmpty(Name))
            {
                Error.Add(new ValidationResult("Nombre no puede estar vac�o"));
            }

            if (string.IsNullOrEmpty(Alias))
            {
                Error.Add(new ValidationResult("Alias no puede estar vac�o"));
            }
          
            
            return Error;
        }

    }
}
