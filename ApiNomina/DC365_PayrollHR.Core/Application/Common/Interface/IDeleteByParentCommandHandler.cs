/// <summary>
/// Interfaz para DeleteByParentCommandHandler.
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
    /// Manejador para operaciones de IDeleteByParentCommand.
    /// </summary>
    public interface IDeleteByParentCommandHandler
    {
        public Task<Response<bool>> DeleteByParent(List<string> ids, string parentid);
    }
    
    /// <summary>
    
    /// Manejador para operaciones de IDeleteByParentCommand.
    
    /// </summary>
    
    public interface IDeleteByParentCommandHandler<T>
    {
        public Task<Response<bool>> DeleteByParent(List<T> ids, string parentid);
    }
}
