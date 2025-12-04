/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Employee.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Employees
{
    /// <summary>
    /// Manejador para operaciones de EmployeeQuery.
    /// </summary>
    public class EmployeeQueryHandler : IQueryHandler<Employee>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<Employee>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            string[] a = (string[])queryfilter;
            WorkStatus work = (WorkStatus)Enum.Parse(typeof(WorkStatus), a[1]);

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Employees
                .OrderBy(x => x.EmployeeId)
                .Where(x => x.EmployeeStatus == bool.Parse(a[0]) && x.WorkStatus == work)
                .AsQueryable();

            // Verificar si es busqueda en multiples campos (separados por coma)
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyName) &&
                !string.IsNullOrWhiteSpace(searchFilter.PropertyValue) &&
                searchFilter.PropertyName.Contains(","))
            {
                // Busqueda en multiples campos con OR
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    (x.EmployeeId != null && x.EmployeeId.ToLower().Contains(searchValue)) ||
                    (x.Name != null && x.Name.ToLower().Contains(searchValue)) ||
                    (x.LastName != null && x.LastName.ToLower().Contains(searchValue))
                ).AsQueryable();
            }
            else
            {
                // Busqueda en campo unico (comportamiento original)
                SearchFilter<Employee> validSearch = new SearchFilter<Employee>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<Employee>.GetLambdaExpession(validSearch);
                    tempResponse = tempResponse.Where(lambda).AsQueryable();
                }
            }

            // Obtener total de registros antes de paginar
            var totalRecords = await tempResponse.CountAsync();

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            var pagedResponse = new PagedResponse<IEnumerable<Employee>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<Employee>> GetId(object condition)
        {
            var response = await _dbContext.Employees
                .Where(x => x.EmployeeId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<Employee>(response);
        }
    }

}
