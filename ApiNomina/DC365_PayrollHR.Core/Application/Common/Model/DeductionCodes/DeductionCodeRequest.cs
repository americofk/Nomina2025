/// <summary>
/// Modelo de solicitud para DeductionCode.
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
    /// Modelo de solicitud para DeductionCode.
    /// </summary>
    public class DeductionCodeRequest: GenericValidation<DeductionCodeRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string ProjId { get; set; }
        /// <summary>
        /// Valor de texto para ProjCategory.
        /// </summary>
        public string ProjCategory { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public string Department { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public PayrollAction PayrollAction { get; set; }


        /// <summary>


        /// Obtiene o establece Ctbution_IndexBase.


        /// </summary>


        public IndexBase Ctbution_IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Ctbution_MultiplyAmount { get; set; }
        /// <summary>
        /// Obtiene o establece Ctbution_PayFrecuency.
        /// </summary>
        public PayFrecuency Ctbution_PayFrecuency { get; set; }
        /// <summary>
        /// Obtiene o establece Ctbution_LimitPeriod.
        /// </summary>
        public PayFrecuency Ctbution_LimitPeriod { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Ctbution_LimitAmount { get; set; }
        /// <summary>
        /// Valor numerico para Ctbution_LimitAmountToApply.
        /// </summary>
        public decimal Ctbution_LimitAmountToApply { get; set; }

        /// <summary>

        /// Obtiene o establece Dduction_IndexBase.

        /// </summary>

        public IndexBase Dduction_IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Dduction_MultiplyAmount { get; set; }
        /// <summary>
        /// Obtiene o establece Dduction_PayFrecuency.
        /// </summary>
        public PayFrecuency Dduction_PayFrecuency { get; set; }
        /// <summary>
        /// Obtiene o establece Dduction_LimitPeriod.
        /// </summary>
        public PayFrecuency Dduction_LimitPeriod { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Dduction_LimitAmount { get; set; }
        /// <summary>
        /// Valor numerico para Dduction_LimitAmountToApply.
        /// </summary>
        public decimal Dduction_LimitAmountToApply { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsForTaxCalc { get; set; }


        //Modificación para el calculo de las deducciones
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTssCalc { get; set; }

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
                ForRule(this, x => x.ValidFrom == default(DateTime), "La fecha de inicio no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default(DateTime), "La fecha de fin no puede estar vacía"),
                ForRule(this, x => x.ValidTo < x.ValidFrom, "La fecha de fin no puede ser menor que la fecha de inicio"),       
                ForRule(this, x => x.PayrollAction == PayrollAction.Contribution && x.Ctbution_MultiplyAmount == 0, "El monto o porcentaje no puede ser 0"),   
                ForRule(this, x => x.PayrollAction == PayrollAction.Deduction && x.Dduction_MultiplyAmount == 0, "El monto o porcentaje no puede ser 0"),   
                ForRule(this, x => x.PayrollAction == PayrollAction.Both && (x.Dduction_MultiplyAmount == 0 || x.Ctbution_MultiplyAmount == 0), "El monto o porcentaje no puede ser 0")   
            };

            return validationResults;
        }
    }
}
