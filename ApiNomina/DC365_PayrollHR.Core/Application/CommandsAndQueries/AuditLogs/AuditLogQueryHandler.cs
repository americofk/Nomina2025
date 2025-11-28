/// <summary>
/// Manejador de consultas para obtención de datos de AuditLog.
/// Facilita la recuperación de información de auditoría ISO 27001.
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
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.AuditLogs
{
    /// <summary>
    /// Interfaz para el manejador de consultas de AuditLog.
    /// </summary>
    public interface IAuditLogQueryHandler
    {
        /// <summary>
        /// Obtiene todos los registros de auditoría paginados.
        /// </summary>
        Task<PagedResponse<IEnumerable<AuditLog>>> GetAll(PaginationFilter filter, SearchFilter searchFilter);

        /// <summary>
        /// Obtiene un registro de auditoría por su RecId.
        /// </summary>
        Task<Response<AuditLog>> GetById(long recId);
    }

    /// <summary>
    /// Manejador para operaciones de consulta de AuditLog.
    /// </summary>
    public class AuditLogQueryHandler : IAuditLogQueryHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public AuditLogQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>
        /// Obtiene todos los registros de auditoría paginados.
        /// </summary>
        /// <param name="filter">Filtro de paginación.</param>
        /// <param name="searchFilter">Filtro de búsqueda.</param>
        /// <returns>Respuesta paginada con los registros de auditoría.</returns>
        public async Task<PagedResponse<IEnumerable<AuditLog>>> GetAll(PaginationFilter filter, SearchFilter searchFilter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.AuditLogs
                                .OrderByDescending(x => x.ChangedAt)
                                .AsQueryable();

            SearchFilter<AuditLog> validSearch = new SearchFilter<AuditLog>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<AuditLog>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<AuditLog>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>
        /// Obtiene un registro de auditoría por su RecId.
        /// </summary>
        /// <param name="recId">Identificador único del registro.</param>
        /// <returns>Respuesta con el registro de auditoría.</returns>
        public async Task<Response<AuditLog>> GetById(long recId)
        {
            var response = await _dbContext.AuditLogs
                .Where(x => x.RecId == recId)
                .FirstOrDefaultAsync();

            return new Response<AuditLog>(response);
        }
    }
}
