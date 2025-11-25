using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Companies;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Companies
{
    public interface ICompanyCommandHandler: ICreateCommandHandler<CompanyRequest>
    {
        public Task<Response<object>> UpdateStatus(string id, bool status);
    }

    public class CompanyCommandHandler : ICompanyCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public CompanyCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<object>> Create(CompanyRequest model)
        {
            var entity = BuildDtoHelper<Company>.OnBuild(model, new Company());

            _dbContext.Companies.Add(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }

        public async Task<Response<object>> UpdateStatus(string id, bool status)
        {
            var response = await _dbContext.Companies.Where(x => x.CompanyId == id)
                                                     .FirstOrDefaultAsync();
            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = response;
            entity.CompanyStatus = status;

            _dbContext.Companies.Update(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }
    }
}
