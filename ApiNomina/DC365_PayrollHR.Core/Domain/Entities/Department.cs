/// <summary>
/// Entidad de dominio para Department.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de Department.
    /// </summary>
    public class Department: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Valor numerico para QtyWorkers.
        /// </summary>
        public int QtyWorkers { get; set; }

        //Foreign key for employee
        //public string ResponsibleId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public bool DepartamentStatus { get; set; } = true;

        //Compañia por la que va a guardar y buscar 
        //[MaxLength(5)]
        //public string InCompany { get; set; }

    }
}
