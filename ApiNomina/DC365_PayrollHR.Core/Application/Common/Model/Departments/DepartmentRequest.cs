/// <summary>
/// Modelo de solicitud para Department.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Departments
{
    /// <summary>
    /// Modelo de solicitud para Department.
    /// </summary>
    public class DepartmentRequest: GenericValidation<DepartmentRequest>, IValidatableObject
    {
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
        /// Cuenta contable para exportación de asiento contable.
        /// </summary>
        public string AccountCode { get; set; }

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
                ForRule(this, x => x.StartDate == default(DateTime), "La fecha de inicio no puede estar vacía"),
                ForRule(this, x => x.EndDate == default(DateTime), "La fecha de fin no puede estar vacía"),
                ForRule(this, x => x.EndDate < x.StartDate, "La fecha de fin no puede ser menor que la fecha de inicio")
            };

            return validationResults;
        }
    }
}
