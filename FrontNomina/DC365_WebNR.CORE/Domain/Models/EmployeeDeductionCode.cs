/// <summary>
/// Modelo de datos para representar códigos de deducciones asignados a empleados.
/// Define las deducciones específicas aplicables a cada empleado en la nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeDeductionCode.
    /// </summary>
    public class EmployeeDeductionCode: GenericError
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Código" + ErrorMsg.Emptym)]
        public string DeductionCodeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal IndexDeduction { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        public decimal PercentDeduction { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        public decimal PercentContribution { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]
        public string PayrollId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Codigo.
        /// </summary>
        public string EmployeeIdDeductionCode { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string EmployeeId
        {
            get
            {
                return EmployeeIdDeductionCode;
            }
        }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string PayrollName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DeductionName { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal DeductionAmount { get; set; }


        /// <summary>


        /// Ganancia.


        /// </summary>


        public string IndexEarningMonthly { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public string IndexEarningMonthlyValidate { get; set; }

        //Actualización deducciones por período
        /// <summary>
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
    }
}
