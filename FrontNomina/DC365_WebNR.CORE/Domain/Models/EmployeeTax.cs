/// <summary>
/// Modelo de datos para representar impuestos asignados a empleados.
/// Define los impuestos específicos aplicables a cada empleado en la nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Domain.Const;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeTax.
    /// </summary>
    public class EmployeeTax: GenericError
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Código" + ErrorMsg.Emptym)]

        public string TaxId { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime ValidFrom { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]

        public string PayrollId { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdTax { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string PayrollName { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string EmployeeId
        {
            get
            {
                return EmployeeIdTax;
            }
        }
    }
}
