/// <summary>
/// Manejador de comandos para operaciones CRUD de EmployeeDeductionCode.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDeductionCodes
{
    public interface IEmployeeDeductionCodeCommandHandler :
        ICreateCommandHandler<EmployeeDeductionCodeRequest>,
        IDeleteByParentCommandHandler,
        IUpdateCommandHandler<EmployeeDeductionCodeRequestUpdate>
    {
        
    }

    /// <summary>

    /// Manejador para operaciones de EmployeeDeductionCodeCommand.

    /// </summary>

    public class EmployeeDeductionCodeCommandHandler : IEmployeeDeductionCodeCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeDeductionCodeCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(EmployeeDeductionCodeRequest model)
        {
            var payroll = await _dbContext.Payrolls.Where(x => x.PayrollId == model.PayrollId).FirstOrDefaultAsync();

            if (payroll == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "La nómina asociada no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<EmployeeDeductionCode>.OnBuild(model, new EmployeeDeductionCode());

            entity.PayFrecuency = payroll.PayFrecuency;

            _dbContext.EmployeeDeductionCodes.Add(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <param name="parentid">Parametro parentid.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<bool>> DeleteByParent(List<string> ids, string parentid)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.EmployeeDeductionCodes.Where(x => x.DeductionCodeId == item && x.EmployeeId == parentid).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    var payrollprocess = await _dbContext.PayrollsProcess
                                                            .Join(_dbContext.PayrollProcessActions,
                                                                pp => pp.PayrollProcessId,
                                                                pa => pa.PayrollProcessId,
                                                                (pp, pa) => new { Pp = pp, Pa = pa })
                                                            .Where(x => (response.FromDate <= x.Pp.PeriodEndDate || response.ToDate >= x.Pp.PeriodEndDate)
                                                                && x.Pp.PayrollId == response.PayrollId
                                                                && x.Pa.ActionId == item
                                                                && x.Pa.EmployeeId == parentid 
                                                                && x.Pp.PayrollProcessStatus != PayrollProcessStatus.Cancelado).FirstOrDefaultAsync();

                    if (payrollprocess != null)
                    {
                        throw new Exception($"El registro seleccionado no se puede eliminar porque ya fue procesado en una nómina - id {item}");
                    }

                    _dbContext.EmployeeDeductionCodes.Remove(response);
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

        public async Task<Response<object>> Update(string id, EmployeeDeductionCodeRequestUpdate model)
        {
            var response = await _dbContext.EmployeeDeductionCodes.Where(x => x.EmployeeId == id && x.DeductionCodeId == model.DeductionCodeId).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            //Validar fecha al actualizar
            if (response.FromDate > model.ToDate)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "La fecha desde no puede ser mayor a la fecha hasta" },
                    StatusHttp = 404
                };
            }

            if (response.DeductionCodeId != model.DeductionCodeId || response.PayrollId != model.PayrollId)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "No puede cambiar el código de descuento, ni la nómina asociada" },
                    StatusHttp = 404
                };
            }
            var entity = BuildDtoHelper<EmployeeDeductionCode>.OnBuild(model, response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }

}
