/// <summary>
/// Modelo de respuesta para Paged.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model
{
    /// <summary>
    /// Modelo de respuesta para Paged.
    /// </summary>
    public class PagedResponse<T>: Response<T>
    {
        /// <summary>
        /// Numero.
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// Valor numerico para PageSize.
        /// </summary>
        public int PageSize { get; set; }
        public PagedResponse(T data, int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.Data = data;
            this.Message = null;
            this.Succeeded = true;
            this.Errors = null;
            this.StatusHttp = 200;
        }
    }
}
