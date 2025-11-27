/// <summary>
/// Modelo de datos para representar aulas o salones de capacitación.
/// Define los espacios físicos disponibles para impartir cursos y su capacidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de ClassRoom.
    /// </summary>
    public class ClassRoom: IValidatableObject
    {
        /// <summary>
        /// Automatic
        /// </summary>
        /// 
        [CustomFilter("Id Salón")]
        public string ClassRoomId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [Required(ErrorMessage = "Ubicación" + ErrorMsg.Emptyf)]
        [CustomFilter("Ubicación")]
        public string CourseLocationId { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Capacidad" + ErrorMsg.Emptyf)]
        public int MaxStudentQty { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Hora de desde" + ErrorMsg.Emptyf)]
        [DataType(DataType.Time)]
        public TimeSpan AvailableTimeStart { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Hora hasta" + ErrorMsg.Emptyf)]
        [DataType(DataType.Time)]
        public TimeSpan AvailableTimeEnd { get; set; }
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
            if (MaxStudentQty <= 0)
            {
                Error.Add(new ValidationResult("Capacidad debe ser mayor a 0"));
            }
            if (AvailableTimeStart == AvailableTimeEnd)
            {
                Error.Add(new ValidationResult("la hora desde no puede ser igual a la hora hasta"));
            }

            return Error;
        }
    }
}
