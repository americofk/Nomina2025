/// <summary>
/// Modelo de datos para representar códigos de ingresos.
/// Define los diferentes tipos de ingresos y beneficios aplicables a la nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EarningCode.
    /// </summary>
    public class EarningCode : AuditableCompanyModel, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Id Código")]
        public string EarningCodeId { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
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
        /// Identificador.
        /// </summary>
        [CustomFilter("Proyecto")]
        public string ProjId { get; set; }
        /// <summary>
        /// Valor numerico para Internalid.
        /// </summary>
        public int Internalid { get; set; }

        /// <summary>

        /// Fecha de ValidFrom.

        /// </summary>

        [CustomFilter("Válido desde")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido desde" + ErrorMsg.Emptym)]
        public DateTime ValidFrom { get; set; }

        /// <summary>

        /// Fecha de ValidTo.

        /// </summary>

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Válido hasta" + ErrorMsg.Emptym)]
        public DateTime ValidTo { get; set; }

        /// <summary>

        /// Descripcion.

        /// </summary>

        public string Description { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsEnabled { get; set; } = true;

        /// <summary>

        /// Obtiene o establece IndexBase.

        /// </summary>

        public IndexBaseTwo IndexBase { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        [Required(ErrorMessage = "Monto o porcentaje" + ErrorMsg.Emptym)]

        [CustomFilter("Monto/Porcentaje")]
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

        /// Estado.

        /// </summary>

        public bool EarningCodeStatus { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsVersion { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsUseDGT { get; set; }

        //Actualización para cálculo automático de horas extras
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsHoliday { get; set; }
        /// <summary>
        /// Obtiene o establece WorkFrom.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece WorkTo.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (IndexBase == IndexBaseTwo.Hour && MultiplyAmount==0)
            {
                Error.Add(new ValidationResult("Debe ingresar monto o porcentaje"));
            }

            return Error;
        }

    }
}
