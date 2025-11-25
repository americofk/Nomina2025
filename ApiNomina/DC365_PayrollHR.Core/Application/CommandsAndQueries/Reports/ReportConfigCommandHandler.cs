using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Reports;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports
{
    public class ReportConfigCommandHandler :
        ICreateCommandHandler<ReportConfigRequest>
    {
        private readonly IApplicationDbContext _dbContext;

        public ReportConfigCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<Response<object>> Create(ReportConfigRequest model)
        {
            var response = await _dbContext.ReportsConfig.FirstOrDefaultAsync();

            if (response == null)
            {
                var entity = BuildDtoHelper<ReportConfig>.OnBuild(model, new ReportConfig());

                _dbContext.ReportsConfig.Add(entity);
                await _dbContext.SaveChangesAsync();

                return new Response<object>(entity)
                {
                    Message = "Registro creado correctamente"
                };
            }
            else
            {
                var entity = BuildDtoHelper<ReportConfig>.OnBuild(model, response);

                _dbContext.ReportsConfig.Update(entity);
                await _dbContext.SaveChangesAsync();

                return new Response<object>(entity)
                {
                    Message = "Registro actualizado correctamente"
                };
            }
        }
    }
}
