/// <summary>
/// Entidad de dominio para CompanyForUser.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.User
{
    /// <summary>
    /// Clase para gestion de CompanyForUser.
    /// </summary>
    public class CompanyForUser
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para Key.
        /// </summary>
        public string Key { get; set; }
    }
}
