/// <summary>
/// Manejador de comandos para operaciones CRUD de EmployeeAddress.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeAddress;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeesAddress
{
    public interface IEmployeeAddressCommandHandler :
        ICreateCommandHandler<EmployeeAddressRequest>,
        IUpdateCommandHandler<EmployeeAddressRequest>
    {
        public Task<Response<bool>> DeleteByEmployeeId(List<string> ids, string employeeid);

    }

    /// <summary>

    /// Manejador para operaciones de EmployeeAddressCommand.

    /// </summary>

    public class EmployeeAddressCommandHandler : IEmployeeAddressCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeAddressCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(EmployeeAddressRequest model)
        {
            EmployeeAddress principalEntity = null;

            var address = await _dbContext.EmployeesAddress.Where(x => x.EmployeeId == model.EmployeeId).OrderByDescending(x =>x.InternalId).FirstOrDefaultAsync();
            var entity = BuildDtoHelper<EmployeeAddress>.OnBuild(model, new EmployeeAddress());

            entity.InternalId = address == null ? 1 : address.InternalId + 1;

            if(model.IsPrincipal)
            {
                principalEntity = await _dbContext.EmployeesAddress.Where(x => x.EmployeeId == model.EmployeeId
                                                                           && x.IsPrincipal == true).FirstOrDefaultAsync();
            }

            var province = await _dbContext.Provinces.Where(x => x.ProvinceId == model.Province).FirstOrDefaultAsync();

            if (province == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "La provincia no existe" },
                    StatusHttp = (int)HttpStatusCode.NotFound
                };
            }

            entity.ProvinceName = province.Name;

            //Guardo la nueva dirección
            _dbContext.EmployeesAddress.Add(entity);
            await _dbContext.SaveChangesAsync();

            //Actualizo la entidad que era principal
            if(principalEntity != null)
            {
                principalEntity.IsPrincipal = false;
                _dbContext.EmployeesAddress.Update(principalEntity);
                await _dbContext.SaveChangesAsync();
            }

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<bool>> DeleteByEmployeeId(List<string> ids, string employeeid)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.EmployeesAddress.Where(x => x.EmployeeId == employeeid 
                                            && x.InternalId == int.Parse(item)).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");

                    }

                    _dbContext.EmployeesAddress.Remove(response);
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


        public async Task<Response<object>> Update(string id, EmployeeAddressRequest model)
        {
            EmployeeAddress principalEntity = null;

            var response = await _dbContext.EmployeesAddress.Where(x => x.InternalId == int.Parse(id)
                                    && x.EmployeeId == model.EmployeeId).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = (int)HttpStatusCode.NotFound
                };
            }

            if (model.IsPrincipal)
            {
                principalEntity = await _dbContext.EmployeesAddress.Where(x => x.EmployeeId == model.EmployeeId
                                                                           && x.IsPrincipal == true).FirstOrDefaultAsync();
            }            

            var entity = BuildDtoHelper<EmployeeAddress>.OnBuild(model, response);

            var province = await _dbContext.Provinces.Where(x => x.ProvinceId == model.Province).FirstOrDefaultAsync();

            if (province == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "La provincia no existe" },
                    StatusHttp = (int)HttpStatusCode.NotFound
                };
            }
            entity.ProvinceName = province.Name;

            await _dbContext.SaveChangesAsync();

            //Actualizo la entidad que era principal
            if (principalEntity != null)
            {
                principalEntity.IsPrincipal = false;
                await _dbContext.SaveChangesAsync();
            }

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }

}
