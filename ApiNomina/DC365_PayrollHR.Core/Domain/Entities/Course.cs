/// <summary>
/// Entidad de dominio para Course.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de Course.
    /// </summary>
    public class Course : AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string CourseId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string CourseName { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string CourseTypeId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsMatrixTraining { get; set; }
        /// <summary>
        /// Internal = 0, External = 1
        /// </summary>
        public InternalExternal InternalExternal { get; set; }
        /// <summary>
        /// Max 20
        /// </summary>
        public string CourseParentId { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string ClassRoomId { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public DateTime StartDateTime { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public DateTime EndDateTime { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public int MinStudents { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public int MaxStudents { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public int Periodicity { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public int QtySessions { get; set; }

        /// <summary>
        /// Max 300
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Required / Max 1000
        /// </summary>
        public string Objetives { get; set; }
        /// <summary>
        /// Required / Max 1000
        /// </summary>
        public string Topics { get; set; }

        /// <summary>
        /// Created = 0, InProcess = 1, Closed = 2
        /// </summary>
        public CourseStatus CourseStatus { get; set; }

        /// <summary>

        /// Valor de texto para URLDocuments.

        /// </summary>

        public string URLDocuments { get; set; }

    }
}
