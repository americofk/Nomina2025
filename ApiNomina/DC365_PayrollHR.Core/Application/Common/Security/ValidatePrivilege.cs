using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries
{
    /// <summary>
    /// Clase para gestion de ValidatePrivilege.
    /// </summary>
    public class ValidatePrivilege : IValidatePrivilege
    {
        private readonly IApplicationDbContext _dbContext;

        public ValidatePrivilege(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="Alias">Parametro Alias.</param>

        /// <param name="MenuId">Parametro MenuId.</param>

        /// <param name="View">Parametro View.</param>

        /// <param name="Delete">Parametro Delete.</param>

        /// <param name="Edit">Parametro Edit.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<bool> ValidateAction(string Alias, string MenuId, bool View, bool Delete, bool Edit)
        {
            if (Delete)
            {
                return await _dbContext.MenuAssignedToUsers
                             .AnyAsync(x => x.Alias == Alias &&
                             x.MenuId == MenuId && x.PrivilegeDelete == true);
            }

            if (Edit)
            {
                return await _dbContext.MenuAssignedToUsers
                             .AnyAsync(x => x.Alias == Alias &&
                             x.MenuId == MenuId && ( x.PrivilegeDelete == true || x.PrivilegeEdit == true));
            }

            if(View)
            {
                return await _dbContext.MenuAssignedToUsers
                             .AnyAsync(x => x.Alias == Alias &&
                             x.MenuId == MenuId && (x.PrivilegeDelete == true || x.PrivilegeEdit == true || x.PrivilegeView == true));
            }

            return false;
        }
    }
}
