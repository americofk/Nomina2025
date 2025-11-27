/// <summary>
/// Modelo de datos para representar direcciones de empleados.
/// Define las ubicaciones y domicilios asociados a cada empleado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeAddress.
    /// </summary>
    public class EmployeeAddress: GenericError
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Valor de texto para Street.
        /// </summary>
        [Required(ErrorMessage = "Calle" + ErrorMsg.Emptyf)]
        public string Street { get; set; }
        /// <summary>
        /// Valor de texto para Home.
        /// </summary>
        [Required(ErrorMessage = "Casa" + ErrorMsg.Emptyf)]
        public string Home { get; set; }
        /// <summary>
        /// Valor de texto para Sector.
        /// </summary>
        [Required(ErrorMessage = "Sector" + ErrorMsg.Emptym)]
        public string Sector { get; set; }
        /// <summary>
        /// Ciudad.
        /// </summary>
        [Required(ErrorMessage = "Ciudad" + ErrorMsg.Emptyf)]
        public string City { get; set; }
        /// <summary>
        /// Provincia.
        /// </summary>
        [Required(ErrorMessage = "Provincia" + ErrorMsg.Emptyf)]
        public string Province { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string ProvinceName { get; set; }


        /// <summary>


        /// Valor de texto para Comment.


        /// </summary>


        public string Comment { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdAddres { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string CountryId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId
        {
            get { return EmployeeIdAddres; }

        }

    }

    /// <summary>

    /// Clase para gestion de EmployeeAddressTwo.

    /// </summary>

    public class EmployeeAddressTwo
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Valor de texto para Street.
        /// </summary>
        public string Street { get; set; }
        /// <summary>
        /// Valor de texto para Home.
        /// </summary>
        public string Home { get; set; }
        /// <summary>
        /// Valor de texto para Sector.
        /// </summary>
        public string Sector { get; set; }
        /// <summary>
        /// Ciudad.
        /// </summary>
        public string City { get; set; }
        /// <summary>
        /// Provincia.
        /// </summary>
        public string Province { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CountryId { get; set; }
    }
}
