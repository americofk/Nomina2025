using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.ProjCategories;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.ProjCategories
{
    public interface IProjCategoryCommandHandler :
        ICreateCommandHandler<ProjCategoryRequest>,
        IDeleteCommandHandler,
        IUpdateCommandHandler<ProjCategoryRequestUpdate>
    {
        public Task<Response<object>> UpdateStatus(string id, bool status);
    }

    public class ProjCategoryCommandHandler : IProjCategoryCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public ProjCategoryCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }


        public async Task<Response<object>> Create(ProjCategoryRequest model)
        {
            var entity = BuildDtoHelper<ProjCategory>.OnBuild(model, new ProjCategory());

            _dbContext.ProjCategories.Add(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }


        public async Task<Response<bool>> Delete(List<string> ids)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.ProjCategories.Where(x => x.ProjCategoryId == item).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    _dbContext.ProjCategories.Remove(response);
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


        public async Task<Response<object>> Update(string id, ProjCategoryRequestUpdate model)
        {
            var response = await _dbContext.ProjCategories.Where(x => x.ProjCategoryId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<ProjCategory>.OnBuild(model, response);
            _dbContext.ProjCategories.Update(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }


        public async Task<Response<object>> UpdateStatus(string id, bool status)
        {
            var response = await _dbContext.ProjCategories.Where(x => x.ProjCategoryId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Message = "El registro seleccionado no existe"
                };
            }

            response.ProjCategoryStatus = status;
            _dbContext.ProjCategories.Update(response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }

}
