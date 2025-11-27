/// <summary>
/// Manejador de comandos para operaciones CRUD de EmployeeLoan.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeLoans
{
    public interface IEmployeeLoanCommandHandler :
        ICreateCommandHandler<EmployeeLoanRequest>,
        IDeleteByParentCommandHandler,
        IUpdateCommandHandler<EmployeeLoanRequestUpdate>
    {
    }

    /// <summary>

    /// Manejador para operaciones de EmployeeLoanCommand.

    /// </summary>

    public class EmployeeLoanCommandHandler : IEmployeeLoanCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeLoanCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(EmployeeLoanRequest model)
        {
            var employeeLoan = await _dbContext.EmployeeLoans.Where(x => x.EmployeeId == model.EmployeeId).OrderByDescending(x => x.InternalId).FirstOrDefaultAsync();
           
            var entity = BuildDtoHelper<EmployeeLoan>.OnBuild(model, new EmployeeLoan());

            entity.InternalId = employeeLoan == null ? 1 : employeeLoan.InternalId + 1;

            _dbContext.EmployeeLoans.Add(entity);
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
                    var response = await _dbContext.EmployeeLoans.Where(x => x.InternalId == int.Parse(item) && x.EmployeeId == parentid).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    var payrollprocess = await _dbContext.PayrollsProcess
                                                            .Join(_dbContext.PayrollProcessActions,
                                                                pp => pp.PayrollProcessId,
                                                                pa => pa.PayrollProcessId,
                                                                (pp, pa) => new { Pp = pp, Pa = pa })
                                                            .Where(x => (response.ValidFrom <= x.Pp.PeriodEndDate || response.ValidTo >= x.Pp.PeriodEndDate)
                                                                && x.Pp.PayrollId == response.PayrollId
                                                                && x.Pp.PayrollProcessStatus != PayrollProcessStatus.Canceled
                                                                && x.Pa.ActionId == response.LoanId
                                                                && x.Pa.EmployeeId == parentid).FirstOrDefaultAsync();

                    if (payrollprocess != null)
                    {
                        throw new Exception($"El registro seleccionado no se puede eliminar porque ya fue procesado en una nómina - id {item}");
                    }

                    _dbContext.EmployeeLoans.Remove(response);
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
                    Errors = new List<string>() { ex.Message },
                    StatusHttp = 404
                };
            }
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Update(string id, EmployeeLoanRequestUpdate model)
        {
            var response = await _dbContext.EmployeeLoans.Where(x => x.InternalId == model.InternalId && x.EmployeeId == id).FirstOrDefaultAsync();

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
            if (response.ValidFrom > model.ValidTo)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "La fecha desde no puede ser mayor a la fecha hasta" },
                    StatusHttp = 404
                };
            }


            //var payrollprocess = await _dbContext.PayrollsProcess.Where(x => (response.ValidFrom <= x.PeriodEndDate || response.ValidTo >= x.PeriodEndDate)
            //                                                                         && x.PayrollId == response.PayrollId 
            //                                                                         && x.PayrollProcessStatus != PayrollProcessStatus.Canceled).FirstOrDefaultAsync();
            
            var payrollprocess = await _dbContext.PayrollsProcess
                                                    .Join(_dbContext.PayrollProcessActions,
                                                        pp => pp.PayrollProcessId,
                                                        pa => pa.PayrollProcessId,
                                                        (pp, pa) => new { Pp = pp, Pa = pa })
                                                    .Where(x => (response.ValidFrom <= x.Pp.PeriodEndDate || response.ValidTo >= x.Pp.PeriodEndDate)
                                                        && x.Pp.PayrollId == response.PayrollId
                                                        && x.Pp.PayrollProcessStatus != PayrollProcessStatus.Canceled
                                                        && x.Pa.ActionId == response.LoanId
                                                        && x.Pa.EmployeeId == model.EmployeeId).FirstOrDefaultAsync();
            string message = string.Empty;

            if (payrollprocess != null)
            {
                if(response.ValidTo != model.ValidTo)
                {
                    message = $"El registro seleccionado ya fue procesado en una nómina, se actualizó la fecha hasta";

                    response.ValidTo = model.ValidTo;
                    _dbContext.EmployeeLoans.Update(response);
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    return new Response<object>(false)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { $"El registro seleccionado no se puede editar porque ya fue procesado en una nómina, " +
                                                  $"los préstamos se actualizan automáticamente al pagar las nóminas" },
                        StatusHttp = 404
                    };
                }
            }

            if(!string.IsNullOrEmpty(message))
            {
                return new Response<object>(true) { Message = message };
            }
            else
            {
                var entity = BuildDtoHelper<EmployeeLoan>.OnBuild(model, response);
                _dbContext.EmployeeLoans.Update(entity);
                await _dbContext.SaveChangesAsync();

                return new Response<object>(true) { Message = "Registro actualizado con éxito" };
            }
        }
    }
}
