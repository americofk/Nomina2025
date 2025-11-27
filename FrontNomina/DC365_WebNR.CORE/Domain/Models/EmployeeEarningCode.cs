/// <summary>
/// Modelo de datos para representar códigos de ingresos asignados a empleados.
/// Define los ingresos y beneficios específicos aplicables a cada empleado en la nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeEarningCode.
    /// </summary>
    public class EmployeeEarningCode : GenericError
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [CustomFilter("Id Código")]
        [Required(ErrorMessage = "Código" + ErrorMsg.Emptym)]
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]

        public DateTime FromDate { get; set; }

        /// <summary>

        /// Fecha.

        /// </summary>

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]

        public DateTime ToDate { get; set; }

        /// <summary>

        /// Ganancia.

        /// </summary>

        public decimal IndexEarning { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        [Required(ErrorMessage = "Índice mensual" + ErrorMsg.Emptyf)]

        public decimal IndexEarningMonthly { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningMonthlyValidate { get { return IndexEarningMonthly;}}

        /// <summary>

        /// Obtiene o establece PayFrecuency.

        /// </summary>

        public PayFrecuency PayFrecuency { get; set; }

        /// <summary>

        /// Valor numerico para Quantity.

        /// </summary>

        public int Quantity { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Código de nómina")]
        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]
        public string PayrollId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        [Required(ErrorMessage = "Período de inicio" + ErrorMsg.Emptym)]
        public int StartPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        [Required(ErrorMessage = "Periodo para pago" + ErrorMsg.Emptym)]

        public int QtyPeriodForPaid { get; set; }

        /// <summary>

        /// Codigo.

        /// </summary>

        [Required(ErrorMessage = "Código de ganancia" + ErrorMsg.Emptym)]
        public string EmployeeIdEarningCode { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string EmployeeId
        {
            get
            {
                return EmployeeIdEarningCode;
            }
        }
        /// <summary>
        /// Nombre.
        /// </summary>
        [CustomFilter("Nombre de nómina")]
        public string PayrollName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        [CustomFilter("Nombre de del código")]

        public string EarningName { get; set; }

        /// <summary>

        /// Ganancia.

        /// </summary>

        public decimal IndexEarningDiary { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsUseDGT { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsForDGT { get; set; } //es para guardar en el historial

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsUseCalcHour { get; set; }

        /// <summary>

        /// Ganancia.

        /// </summary>

        public decimal IndexEarningHour { get; set; }
    }
}
