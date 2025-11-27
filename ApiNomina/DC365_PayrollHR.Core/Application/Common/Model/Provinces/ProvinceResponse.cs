/// <summary>
/// Modelo de respuesta para Province.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Provinces
{
    /// <summary>
    /// Modelo de respuesta para Province.
    /// </summary>
    public class ProvinceResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProvinceId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
    }
}
