/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Department.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Departments
{
    /// <summary>
    /// Manejador para operaciones de DepartmentQuery.
    /// </summary>
    public class DepartmentQueryHandler : IQueryHandler<Department>
    {
        private readonly IApplicationDbContext _dbContext;

        public DepartmentQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="filter">Parametro filter.</param>


        /// <param name="searchFilter">Parametro searchFilter.</param>


        /// <param name="queryFilter">Parametro queryFilter.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<PagedResponse<IEnumerable<Department>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Departments
                                .OrderBy(x => x.DepartmentId)
                                .Where(x => x.DepartamentStatus == (bool)queryFilter)
                                .AsQueryable();

            // Verificar si es busqueda en multiples campos (separados por coma)
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyName) &&
                !string.IsNullOrWhiteSpace(searchFilter.PropertyValue) &&
                searchFilter.PropertyName.Contains(","))
            {
                // Busqueda en multiples campos con OR
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    (x.DepartmentId != null && x.DepartmentId.ToLower().Contains(searchValue)) ||
                    (x.Name != null && x.Name.ToLower().Contains(searchValue))
                ).AsQueryable();
            }
            else
            {
                // Busqueda en campo unico (comportamiento original)
                SearchFilter<Department> validSearch = new SearchFilter<Department>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<Department>.GetLambdaExpession(validSearch);
                    tempResponse = tempResponse.Where(lambda).AsQueryable();
                }
            }

            // Obtener total de registros antes de paginar
            var totalRecords = await tempResponse.CountAsync();

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            var pagedResponse = new PagedResponse<IEnumerable<Department>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<Department>> GetId(object condition)
        {
            var response = await _dbContext.Departments
                .Where(x => x.DepartmentId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<Department>(response);
        }


        //public async Task<Response<Department>> GetById(object id)
        //{
        //    var response = await _dbContext.Departments.Where(x => x.DepartmentId == (string)id).FirstOrDefaultAsync();

        //    if (response == null)
        //    {
        //        return new Response<Department>()
        //        {
        //            Succeeded = false,
        //            Message = "El registro seleccionado no existe"
        //        };
        //    }
        //    return new Response<Department>(response);
        //}
    }
}
