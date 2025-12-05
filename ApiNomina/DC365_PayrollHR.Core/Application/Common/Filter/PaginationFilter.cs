using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Filter
{
    /// <summary>
    /// Filtro para Pagination.
    /// </summary>
    public class PaginationFilter
    {
        /// <summary>
        /// Numero.
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// Valor numerico para PageSize.
        /// </summary>
        public int PageSize { get; set; }
        //public int TotalRecord { get; set; }
        public PaginationFilter()
        {
            this.PageNumber = 1;
            this.PageSize = 10000;
        }
        public PaginationFilter(int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize < 1 ? 10000 : pageSize;
        }
    }
}
