/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de DisabilityType.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DisabilityTypes
{
    /// <summary>
    /// Manejador para operaciones de DisabilityTypeQuery.
    /// </summary>
    public class DisabilityTypeQueryHandler: IQueryAllWithoutSearchHandler<DisabilityType>
    {
        private readonly IApplicationDbContext _dbContext;

        public DisabilityTypeQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<DisabilityType>>> GetAll(PaginationFilter filter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var response = await _dbContext.DisabilityTypes
                            .OrderBy(x => x.DisabilityTypeId)
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<DisabilityType>>(response, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
