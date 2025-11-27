/// <summary>
/// Interfaz para QueryHandler.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    //public interface IQueryHandler<T>
    //{
    //    public Task<PagedResponse<IEnumerable<T>>> GetAll(PaginationFilter filter, object queryfilter = null);

    //    public Task<Response<T>> GetId(object condition);
    //}

    /// <summary>

    /// Manejador para operaciones de IQuery.

    /// </summary>

    public interface IQueryHandler<T>
    {
        public Task<PagedResponse<IEnumerable<T>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null);

        public Task<Response<T>> GetId(object condition);
    }
}
