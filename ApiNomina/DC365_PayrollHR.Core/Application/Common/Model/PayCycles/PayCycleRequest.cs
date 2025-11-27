/// <summary>
/// Modelo de solicitud para PayCycle.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.StoreServices.PayCycles
{
    /// <summary>
    /// Modelo de solicitud para PayCycle.
    /// </summary>
    public class PayCycleRequest : IValidatableObject
    {
        //public DateTime StartDate { get; set; }
        /// <summary>
        /// Valor numerico para PayCycleQty.
        /// </summary>
        public int PayCycleQty { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        //public bool IsFirstPeriod { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();

            if (PayCycleQty == 0)
                errors.Add(new ValidationResult("La cantidad de períodos no puede ser 0"));

            //if (IsFirstPeriod)
            //{
            //    if(StartDate == default(DateTime))
            //        errors.Add(new ValidationResult("La fecha de inicio es necesaria si se solicita generar los primeros periodos de pago de una nómina."));
            //}

            //else if (StartDate != default(DateTime))
            //    errors.Add(new ValidationResult("La fecha de inicio no es necesaria si ya existen periodos de pago generados."));

            if(string.IsNullOrEmpty(PayrollId))
                errors.Add(new ValidationResult("Es necesario el id de la nómina"));

            return errors;
        }
    }
}
