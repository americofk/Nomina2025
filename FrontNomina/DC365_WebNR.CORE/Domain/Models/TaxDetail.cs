/// <summary>
/// Modelo de datos para representar detalles de impuestos.
/// Define los rangos y escalas de cálculo para impuestos específicos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de TaxDetail.
    /// </summary>
    public class TaxDetail: IValidatableObject
    {
        //Salario anual superior a 
        /// <summary>
        /// Valor numerico para AnnualAmountHigher.
        /// </summary>
        [Required(ErrorMessage = "Salario anual superior a" + ErrorMsg.Emptym)]
        public decimal AnnualAmountHigher { get; set; }

        //Salario anual no excede 
        /// <summary>
        /// Valor numerico para AnnualAmountNotExceed.
        /// </summary>
        [Required(ErrorMessage = "Salario anual no excede" + ErrorMsg.Emptym)]
        public decimal AnnualAmountNotExceed { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        [Required(ErrorMessage = "% Tasa" + ErrorMsg.Emptym)]
        public decimal Percent { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        [Required(ErrorMessage = "Cuota fija" + ErrorMsg.Emptyf)]

        public decimal FixedAmount { get; set; }
        /// <summary>
        /// Valor numerico para ApplicableScale.
        /// </summary>
        [Required(ErrorMessage = "Escala aplicable" + ErrorMsg.Emptyf)]
        public decimal ApplicableScale { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [Required(ErrorMessage = "ID. Código" + ErrorMsg.Emptym)]

        public string TaxId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "ID. Código" + ErrorMsg.Emptym)]

        public int InternalId { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            //if (AnnualAmountHigher = EndDate)
            //{
            //    Error.Add(new ValidationResult("Fecha final debe ser mayor a la fecha inicial"));
            //}

            return Error;
        }
    }
}
