/// <summary>
/// Modelo de solicitud para Course.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Course
{
    /// <summary>
    /// Modelo de solicitud para Course.
    /// </summary>
    public class CourseRequest: GenericValidation<CourseRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CourseName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseTypeId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsMatrixTraining { get; set; }
        /// <summary>
        /// Valor numerico para InternalExternal.
        /// </summary>
        public InternalExternal InternalExternal { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseParentId { get; set; }
        //public string CourseLocationId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ClassRoomId { get; set; }
        /// <summary>
        /// Hora.
        /// </summary>
        public DateTime StartDateTime { get; set; }
        /// <summary>
        /// Hora.
        /// </summary>
        public DateTime EndDateTime { get; set; }
        /// <summary>
        /// Valor numerico para MinStudents.
        /// </summary>
        public int MinStudents { get; set; }
        /// <summary>
        /// Valor numerico para MaxStudents.
        /// </summary>
        public int MaxStudents { get; set; }
        /// <summary>
        /// Valor numerico para Periodicity.
        /// </summary>
        public int Periodicity { get; set; }
        /// <summary>
        /// Valor numerico para QtySessions.
        /// </summary>
        public int QtySessions { get; set; } = 1;

        /// <summary>

        /// Descripcion.

        /// </summary>

        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para Objetives.
        /// </summary>
        public string Objetives { get; set; }
        /// <summary>
        /// Valor de texto para Topics.
        /// </summary>
        public string Topics { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public CourseStatus CourseStatus { get; set; } = 0;

        /// <summary>

        /// Valor de texto para URLDocuments.

        /// </summary>

        public string URLDocuments { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseName), "El nombre no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseTypeId), "El tipo de curso no puede estar vacío"),
                //ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseLocationId), "La ubicación del curso no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.ClassRoomId), "El aula del curso no puede estar vacío"),
                ForRule(this, x => x.StartDateTime == default, "La fecha de inicio no puede estar vacía"),
                ForRule(this, x => x.EndDateTime == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.EndDateTime < x.StartDateTime, "La fecha final no puede ser menor que la fecha inicial"),
                ForRule(this, x => x.MinStudents == 0, "El mínimo de participantes no puede ser cero"),
                ForRule(this, x => x.MaxStudents == 0, "El máximo de participantes no puede ser cero"),
                ForRule(this, x => x.MinStudents > x.MaxStudents, "El máximo de participantes no puede ser menor al mínimo de participantes"),  
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Objetives), "Los objetivos del curso no pueden estar vacíos"),  
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Topics), "Los temas del curso no pueden estar vacíos"),

                ForRule(this, x => !Enum.IsDefined(typeof(InternalExternal), x.InternalExternal), "El tipo interno o externo suministrado no es válido"),
                ForRule(this, x => !Enum.IsDefined(typeof(CourseStatus), x.CourseStatus), "El estado suministrado no es válido")
            };

            return validationResults;
        }
    }
}
