/// <summary>
/// Manejador de comandos para operaciones CRUD de CompanyToUser.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CompanyAssignedToUsers
{
    /// <summary>
    /// Manejador para operaciones de ICompanyToUserCommand.
    /// </summary>
    public interface ICompanyToUserCommandHandler
    {
        public Task<Response<object>> CreateAll(List<CompanyToUserRequest> request);

        public Task<Response<bool>> DeleteByAlias(List<string> ids, string alias);
    }

    /// <summary>

    /// Manejador para operaciones de CompanyToUserCommand.

    /// </summary>

    public class CompanyToUserCommandHandler : ICompanyToUserCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public CompanyToUserCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> CreateAll(List<CompanyToUserRequest> request)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var model in request)
                {
                    var companyAssigned = _dbContext.CompaniesAssignedToUsers.Where(x => x.Alias == model.Alias && x.CompanyId == model.CompanyId).FirstOrDefaultAsync();

                    if (await companyAssigned == null)
                    {
                        var user = _dbContext.Users.Where(x => x.Alias == model.Alias).FirstOrDefaultAsync();
                        if (await user == null)
                        {
                            throw new Exception($"El usuario asignado no existe - Id {model.Alias}");
                        }

                        var company = _dbContext.Companies.Where(x => x.CompanyId == model.CompanyId).FirstOrDefaultAsync();
                        if (await company == null)
                        {
                            throw new Exception($"La empresa asignada no existe - Id {model.CompanyId}");
                        }

                        var entity = BuildDtoHelper<CompaniesAssignedToUser>.OnBuild(model, new CompaniesAssignedToUser());

                        _dbContext.CompaniesAssignedToUsers.Add(entity);
                        await _dbContext.SaveChangesAsync();
                    }
                }

                transaction.Commit();
                return new Response<object>(true)
                {
                    Message = "Registros creados correctamente"
                };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <param name="alias">Parametro alias.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<bool>> DeleteByAlias(List<string> ids, string alias)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.CompaniesAssignedToUsers.Where(x => x.Alias == alias && x.CompanyId == item).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado de usuario y compañía no existe - Usuario {alias}, Compañía {item}");

                    }

                    _dbContext.CompaniesAssignedToUsers.Remove(response);
                    await _dbContext.SaveChangesAsync();
                }
                transaction.Commit();
                return new Response<bool>(true) { Message = "Registros elimandos con éxito" };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }
    }
}
