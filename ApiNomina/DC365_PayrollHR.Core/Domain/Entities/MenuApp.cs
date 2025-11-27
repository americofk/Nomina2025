/// <summary>
/// Entidad de dominio para MenuApp.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de MenuApp.
    /// </summary>
    public class MenuApp : AuditableEntity
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string MenuName { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para Action.
        /// </summary>
        public string Action { get; set; }
        /// <summary>
        /// Valor de texto para Icon.
        /// </summary>
        public string Icon { get; set; }
        /// <summary>
        /// Valor numerico para Sort.
        /// </summary>
        public int Sort { get; set; }


        //Relations with class menú
        /// <summary>
        /// Valor de texto para MenuFather.
        /// </summary>
        public string MenuFather { get; set; }

        //Primary Key
        /// <summary>
        /// Identificador.
        /// </summary>
        public string MenuId { get; set; }


        /// <summary>


        /// Indica si.


        /// </summary>


        public bool IsViewMenu { get; set; }
    }
}
