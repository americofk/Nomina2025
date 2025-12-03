/// <summary>
/// Modelo de solicitud para EarningCode.
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

namespace DC365_PayrollHR.Core.Application.Common.Model
{
    /// <summary>
    /// Modelo de solicitud para EarningCode.
    /// </summary>
    public class EarningCodeRequest : GenericValidation<EarningCodeRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsTSS { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsISR { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsExtraHours { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsUseDGT { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Obtiene o establece IndexBase.
        /// </summary>
        public IndexBase IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal MultiplyAmount { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public string Department { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        //Actualización para cálculo automático de horas extras
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsHoliday { get; set; }
        /// <summary>
        /// Obtiene o establece WorkFrom.
        /// </summary>
        public TimeSpan WorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece WorkTo.
        /// </summary>
        public TimeSpan WorkTo { get; set; }

        /// <summary>
        /// Indica si aplica para el cálculo de prestaciones laborales.
        /// </summary>
        public bool IsSeverance { get; set; }

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
                ForRule(this, x => x.ValidFrom == default, "La fecha inicial no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.ValidFrom > x.ValidTo, "La fecha final no puede ser menor que la fecha final"),
                ForRule(this, x => !Enum.IsDefined(typeof(IndexBase), x.IndexBase), "La base índice suministrada no existe"),
                ForRule(this, x => x.IndexBase != IndexBase.Hour && x.IndexBase != IndexBase.FixedAmount, "La base índice suministrada debe ser tipo hora o monto fijo"),
                ForRule(this, x => x.IndexBase == IndexBase.Hour && x.MultiplyAmount == 0, "Si la base índice es hora el monto debe ser diferente de 0"),
                ForRule(this, x => x.IndexBase == IndexBase.Hour && x.IsExtraHours == true, "Si la base índice es hora el código no puede aplicar para el cálculo de horas extras"),
                


                //ForRule(this, x => x.WorkFrom > x.WorkTo, "La hora desde no puede ser mayor a la hora hasta"),
            };

            return validationResults;
        }
    }
}
