/// <summary>
/// Modelo de solicitud para actualización de Payroll.
/// Define los parámetros necesarios para actualizar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Payrolls
{
    /// <summary>
    /// Clase para gestion de PayrollRequestUpdate.
    /// </summary>
    public class PayrollRequestUpdate: GenericValidation<PayrollRequestUpdate>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }

        //Verificar si la nómina ya se usó en un proceso para no permitir cambiar este valor 
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsRoyaltyPayroll { get; set; }
        

        //Verificar si la nómina tiene ciclos de pago no permitir cambiar la fecha
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }

        //Verificar si la nómina ya se usó en un proceso para no permitir cambiar este valor 
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForHourPayroll { get; set; }


        /// <summary>


        /// Valida los datos.


        /// </summary>


        /// <param name="validationContext">Parametro validationContext.</param>


        /// <returns>Resultado de la operacion.</returns>


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "El nombre de la nómina no puede estar vacío"),
                ForRule(this, x => x.ValidTo == default, "La fecha inicial no puede estar vacía"),
                ForRule(this, x => x.ValidFrom == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.ValidFrom > x.ValidTo, "La fecha final no puede ser menor que la fecha inicial")
            };

            return validationResults;
        }
    }
}
