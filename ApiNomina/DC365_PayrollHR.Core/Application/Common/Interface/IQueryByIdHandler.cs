/// <summary>
/// Interfaz para QueryByIdHandler.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    /// <summary>
    /// Manejador para operaciones de IQueryById.
    /// </summary>
    public interface IQueryByIdHandler<T>
    {
        public Task<Response<T>> GetId(string id);
    }
}
