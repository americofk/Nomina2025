/// <summary>
/// Modelo de datos para representar instructores de cursos.
/// Contiene la información de los instructores que imparten capacitaciones.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Instructor.
    /// </summary>
    public class Instructor: IValidatableObject
    {
        /// <summary>
        /// Automatic
        /// </summary>
        /// 
        [CustomFilter("Id Instructor")]

        public string InstructorId { get; set; }
        /// <summary>
        /// Required, Max 50
        /// </summary>
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        /// <summary>
        /// Max 20
        /// </summary>
        [MaxLength(20)]
        [CustomFilter("Teléfono")]

        public string Phone { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        [MaxLength(100)]
        [RegularExpression("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", ErrorMessage = ErrorMsg.Email)]
        [CustomFilter("Email")]

        public string Mail { get; set; }
        /// <summary>
        /// Required, Max 100
        /// </summary>
        [MaxLength(100)]
        [Required(ErrorMessage = "Empresa" + ErrorMsg.Emptyf)]
        public string Company { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        [MaxLength(100)]
        public string Comment { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();

            if (string.IsNullOrEmpty(Phone) && string.IsNullOrEmpty(Mail))
            {
                Error.Add(new ValidationResult("Debe suministrar al menos un medio de contacto"));
            }

            return Error;
        }
    }
}
