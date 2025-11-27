/// <summary>
/// Modelo de datos para representar horas extras de empleados.
/// Registra las horas trabajadas fuera del horario regular y su compensación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeExtraHour.
    /// </summary>
    public class EmployeeExtraHour: GenericError
    {
        /// <summary>
        /// Fecha de WorkedDay.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime WorkedDay { get; set; }
        /// <summary>
        /// Obtiene o establece StartHour.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan StartHour { get; set; }
        /// <summary>
        /// Obtiene o establece EndHour.
        /// </summary>
        [DataType(DataType.Time)]
        public TimeSpan EndHour { get; set; }
        /// <summary>
        /// Valor numerico para TotalHour.
        /// </summary>
        public int TotalHour { get; set; }
        /// <summary>
        /// Valor numerico para TotalExtraHour.
        /// </summary>
        public int TotalExtraHour { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Amount { get; set; }
        /// <summary>
        /// Valor numerico para Indice.
        /// </summary>
        public decimal Indice { get; set; }
        /// <summary>
        /// Valor numerico para Quantity.
        /// </summary>
        public decimal Quantity { get; set; }
        /// <summary>
        /// Obtiene o establece StatusExtraHour.
        /// </summary>
        public StatusExtraHour StatusExtraHour { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [CustomFilter("Código de nómina")]
        public string PayrollId { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [CustomFilter("Código hora extra")]
        public string EarningCodeId { get; set; }

        /// <summary>

        /// Empleado.

        /// </summary>

        public string EmployeeIdExtraHour { get; set; }


        /// <summary>


        /// Nombre.


        /// </summary>


        [CustomFilter("Nombre de nómina")]
        public string PayrollName { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        [CustomFilter("Nombre hora extra")]
        public string EarningCodeName { get; set; }
        
        /// <summary>
        
        /// Valor de texto para Comment.
        
        /// </summary>
        
        public string Comment { get; set; }

        //Actualización, campo para indicar la fecha de uso de horas extra
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime CalcPayrollDate { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId
        {
            get
            {
                return EmployeeIdExtraHour;
            }
        }
    }
}
