/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EducationLevel.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EducationLevels
{

    /// <summary>

    /// Manejador para operaciones de EducationLevelQuery.

    /// </summary>

    public class EducationLevelQueryHandler : IQueryAllWithoutSearchHandler<EducationLevel>
    {
        private readonly IApplicationDbContext _dbContext;

        public EducationLevelQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<EducationLevel>>> GetAll(PaginationFilter filter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var response = await _dbContext.EducationLevels
                            .OrderBy(x => x.EducationLevelId)
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EducationLevel>>(response, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
