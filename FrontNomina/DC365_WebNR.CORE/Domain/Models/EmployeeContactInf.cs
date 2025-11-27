/// <summary>
/// Modelo de datos para representar información de contacto de empleados.
/// Define los medios de comunicación asociados a cada empleado (teléfono, email, etc.).
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeContactInf.
    /// </summary>
    public class EmployeeContactInf: GenericError
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Direccion.
        /// </summary>
        [Required(ErrorMessage = "Correo o número" + ErrorMsg.Emptym)]
        [MaxLength(200)]
        public string NumberAddress { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        [MaxLength(200)]
        public string Comment { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdContactInf { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public ContactType ContactType { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string EmployeeId 
        { 
            get
            {
                return EmployeeIdContactInf;
            }
        }
    }
}
