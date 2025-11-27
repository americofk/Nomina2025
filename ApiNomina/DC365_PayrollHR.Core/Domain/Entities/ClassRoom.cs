/// <summary>
/// Entidad de dominio para ClassRoom.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de ClassRoom.
    /// </summary>
    public class ClassRoom: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string ClassRoomId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string CourseLocationId { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public int MaxStudentQty { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public TimeSpan AvailableTimeStart { get; set; }
        ///// <summary>
        ///// Required
        ///// </summary>
        /// <summary>
        /// Obtiene o establece AvailableTimeEnd.
        /// </summary>
        public TimeSpan AvailableTimeEnd { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        public string Comment { get; set; }
    }
}
