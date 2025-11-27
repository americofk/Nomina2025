/// <summary>
/// Modelo de respuesta para Course.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Course
{
    /// <summary>
    /// Modelo de respuesta para Course.
    /// </summary>
    public class CourseResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CourseName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseTypeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CourseTypeName { get; set; }

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
        /// Nombre.
        /// </summary>
        public string ClassRoomName { get; set; }

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

        /// Valor de texto para URLDocuments.

        /// </summary>

        public string URLDocuments { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public CourseStatus CourseStatus { get; set; }
    }
}
