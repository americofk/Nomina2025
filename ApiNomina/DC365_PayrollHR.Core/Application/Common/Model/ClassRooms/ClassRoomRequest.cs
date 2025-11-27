/// <summary>
/// Modelo de solicitud para ClassRoom.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.ClassRooms
{
    /// <summary>
    /// Modelo de solicitud para ClassRoom.
    /// </summary>
    public class ClassRoomRequest: GenericValidation<ClassRoomRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseLocationId { get; set; }
        /// <summary>
        /// Valor numerico para MaxStudentQty.
        /// </summary>
        public int MaxStudentQty { get; set; }
        /// <summary>
        /// Obtiene o establece AvailableTimeStart.
        /// </summary>
        public TimeSpan AvailableTimeStart { get; set; }
        /// <summary>
        /// Obtiene o establece AvailableTimeEnd.
        /// </summary>
        public TimeSpan AvailableTimeEnd { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "El nombre no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseLocationId), "La ubicación no puede estar vacío"),
                ForRule(this, x => x.AvailableTimeStart == x.AvailableTimeEnd, "La hora de inicio y la hora final no pueden ser iguales"),
                ForRule(this, x => x.AvailableTimeEnd < x.AvailableTimeStart, "El tiempo final no puede ser menor al tiempo inicial"),
            };

            return validationResults;
        }
    }
}
