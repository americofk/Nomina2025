/// <summary>
/// Manejador de comandos para operaciones CRUD de MenuToUser.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.MenuAssignedToUsers
{
    /// <summary>
    /// Manejador para operaciones de IMenuToUserCommand.
    /// </summary>
    public interface IMenuToUserCommandHandler: 
        IUpdateCommandHandler<MenuToUserRequest>
    {
        public Task<Response<object>> CreateAll(List<MenuToUserRequest> request);

        public Task<Response<bool>> DeleteByAlias(List<string> ids, string alias);
    }

    /// <summary>

    /// Manejador para operaciones de MenuToUserCommand.

    /// </summary>

    public class MenuToUserCommandHandler : IMenuToUserCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public MenuToUserCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> CreateAll(List<MenuToUserRequest> request)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var model in request)
                {
                    var user = _dbContext.Users.Where(x => x.Alias == model.Alias).FirstOrDefaultAsync();
                    if (await user == null)
                    {
                        throw new Exception($"El usuario asignado no existe - Id {model.Alias}");
                    }

                    var menu = _dbContext.MenusApp.Where(x => x.MenuId == model.MenuId).FirstOrDefaultAsync();
                    if (await menu == null)
                    {
                        throw new Exception($"El rol asignado no existe - Id {model.MenuId}");
                    }

                    // IgnoreQueryFilters para encontrar registros soft-deleted y reactivarlos
                    var menutouser = await _dbContext.MenuAssignedToUsers
                        .IgnoreQueryFilters()
                        .Where(x => x.MenuId == model.MenuId && x.Alias == model.Alias)
                        .FirstOrDefaultAsync();

                    if (menutouser != null)
                    {
                        var entity = BuildDtoHelper<MenuAssignedToUser>.OnBuild(model, menutouser);
                        // Reactivar si estaba eliminado
                        entity.IsDeleted = false;
                        entity.DeletedBy = null;
                        entity.DeletedOn = null;

                        await _dbContext.SaveChangesAsync();
                    }
                    else
                    {
                        var entity = BuildDtoHelper<MenuAssignedToUser>.OnBuild(model, new MenuAssignedToUser());

                        _dbContext.MenuAssignedToUsers.Add(entity);
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
                    //Validar si el departamento tiene empleados asociados para no permitir eliminar
                    var response = await _dbContext.MenuAssignedToUsers.Where(x => x.Alias == alias && x.MenuId == item).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no de usuario y rol existe - user {alias}, rol {item}");

                    }

                    _dbContext.MenuAssignedToUsers.Remove(response);
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

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Update(string id, MenuToUserRequest model)
        {
            var response = await _dbContext.MenuAssignedToUsers.Where(x => x.Alias == id && x.MenuId == model.MenuId).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>(){ "El registro seleccionado de usuario y rol no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<MenuAssignedToUser>.OnBuild(model, response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }
}
