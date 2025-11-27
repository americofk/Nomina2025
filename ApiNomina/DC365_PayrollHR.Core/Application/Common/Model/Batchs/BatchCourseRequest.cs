/// <summary>
/// Modelo de solicitud para BatchCourse.
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

namespace DC365_PayrollHR.Core.Application.Common.Model.Batchs
{
    /// <summary>
    /// Modelo de solicitud para BatchCourse.
    /// </summary>
    public class BatchCourseRequest : GenericValidation<BatchCourseRequest>, IValidatableObject
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
        public int QtySessions { get; set; }
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

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseName), $"Course {CourseName} - El nombre del curso no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseTypeId), "El tipo de curso no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.ClassRoomId), "El salón del curso no puede estar vacío"),
                ForRule(this, x => x.StartDateTime == default, $"Course {CourseName} - La fecha desde no puede estar vacía"),
                ForRule(this, x => x.EndDateTime == default, $"Course {CourseName} - La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.EndDateTime < x.StartDateTime, $"Course {CourseName} - La fecha hasta no puede ser menor que la fecha desde"),
                ForRule(this, x => x.MinStudents == 0, $"Course {CourseName} - Los estudiantes mínimos no pueden ser 0"),
                ForRule(this, x => x.MaxStudents == 0, $"Course {CourseName} - Los estudiantes máximos no pueden ser 0"),

                ForRule(this, x => string.IsNullOrWhiteSpace(x.Objetives), "El salón del curso no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Topics), "El salón del curso no puede estar vacío")
            };

            return validationResults;
        }
    }
}
