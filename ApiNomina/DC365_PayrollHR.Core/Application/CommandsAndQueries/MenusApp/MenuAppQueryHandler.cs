/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de MenuApp.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.MenusApp
{
    /// <summary>
    /// Manejador para operaciones de IMenuAppQuery.
    /// </summary>
    public interface IMenuAppQueryHandler : IQueryAllWithoutSearchHandler<MenuApp>
    {
        public Task<Response<IEnumerable<MenuApp>>> GetRoles();
    };

    /// <summary>

    /// Manejador para operaciones de MenuAppQuery.

    /// </summary>

    public class MenuAppQueryHandler : IMenuAppQueryHandler
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserInformation _currentUserInformation;

        public MenuAppQueryHandler(IApplicationDbContext applicationDbContext, ICurrentUserInformation currentUserInformation)
        {
            _dbContext = applicationDbContext;
            _currentUserInformation = currentUserInformation;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="queryFilter">Parametro queryFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<MenuApp>>> GetAll(PaginationFilter filter, object queryFilter = null)
        {
            var adminType = (AdminType)Enum.Parse(typeof(AdminType), _currentUserInformation.ElevationType);

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            List<MenuApp> response;

            if (adminType == AdminType.AdministradorLocal)
            {
                response = await _dbContext.MenusApp
                    .Where(x => x.IsViewMenu == true)
                    .OrderBy(x => x.Sort)
                    .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                    .Take(validFilter.PageSize)
                    .ToListAsync();
            }
            else
            {
                response = await _dbContext.MenuAssignedToUsers.Where(x => x.Alias == _currentUserInformation.Alias)
                    .Join(_dbContext.MenusApp,
                            assigned => assigned.MenuId,
                            menu => menu.MenuId,
                            (assigned, menu) => new { Assigned = assigned, Menu = menu })
                    .Where(x => x.Menu.IsViewMenu == true)
                    .Select(x => new MenuApp
                    {
                        MenuId = x.Menu.MenuId,
                        MenuFather = x.Menu.MenuFather,
                        Description = x.Menu.Description,
                        Action = x.Menu.Action,
                        Icon = x.Menu.Icon,
                        MenuName = x.Menu.MenuName,
                        Sort = x.Menu.Sort
                    })
                    .OrderBy(x => x.Sort)
                    .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                    .Take(validFilter.PageSize)
                    .ToListAsync();

                var parentsId = response.Where(x => !string.IsNullOrEmpty(x.MenuFather))
                    .GroupBy(x => x.MenuFather)
                    .Select(x => new
                    {
                        id = x.Key
                    });

                foreach (var item in parentsId.ToList())
                {
                    var a = await _dbContext.MenusApp.Where(x => x.MenuId == item.id).FirstOrDefaultAsync();

                    response.Add(a);
                }
            }

            return new PagedResponse<IEnumerable<MenuApp>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<IEnumerable<MenuApp>>> GetRoles()
        {
            var adminType = (AdminType)Enum.Parse(typeof(AdminType), _currentUserInformation.ElevationType);

            List<MenuApp> response;

            if (adminType == AdminType.AdministradorLocal)
            {
                response = await _dbContext.MenusApp.Where(x => !string.IsNullOrEmpty(x.MenuFather))
                    .ToListAsync();
            }
            else
            {
                response = new List<MenuApp>();
            }

            return new Response<IEnumerable<MenuApp>>(response);
        }
    }
}
