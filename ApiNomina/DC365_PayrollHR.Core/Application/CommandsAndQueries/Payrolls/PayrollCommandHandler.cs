/// <summary>
/// Manejador de comandos para operaciones CRUD de Payroll.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Payrolls;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.StoreServices.Payrolls
{
    public interface IPayrollCommandHandler: 
        ICreateCommandHandler<PayrollRequest>,
        IDeleteCommandHandler,
        IUpdateCommandHandler<PayrollRequestUpdate>
    {
        public Task<Response<object>> UpdateStatus(string id, bool status);
    }

    /// <summary>

    /// Manejador para operaciones de PayrollCommand.

    /// </summary>

    public class PayrollCommandHandler : IPayrollCommandHandler
    {
        private readonly IApplicationDbContext dbContext;

        public PayrollCommandHandler(IApplicationDbContext _applicationDbContext)
        {
            dbContext = _applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="_model">Parametro _model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(PayrollRequest _model)
        {
            var payroll = BuildDtoHelper<Payroll>.OnBuild(_model, new Payroll());

            dbContext.Payrolls.Add(payroll);
            await dbContext.SaveChangesAsync();

            return new Response<object>(payroll)
            {
                 Message = "Registros guardados con éxito" 
            };
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<bool>> Delete(List<string> ids)
        {
            using var transaction = dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await dbContext.Payrolls.Where(x => x.PayrollId == item).FirstOrDefaultAsync();
                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    var payrollprocess = await dbContext.PayrollsProcess.Where(x => x.PayrollId == item).FirstOrDefaultAsync();
                    if (payrollprocess != null)
                    {
                        throw new Exception($"La nómina no puede ser eliminada porque está seleccionada en un proceso de nómina - id {item}");
                    }

                    var paycycle = await dbContext.PayCycles.Where(x => x.PayrollId == item).FirstOrDefaultAsync();
                    if (paycycle != null)
                    {
                        throw new Exception($"La nómina no puede ser eliminada si tiene ciclos de pago generados - id {item}");
                    }

                    dbContext.Payrolls.Remove(response);
                    await dbContext.SaveChangesAsync();
                }

                transaction.Commit();
                return new Response<bool>(true) { Message = "Registros eliminados con éxito" };
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

        //Id = payrollid
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<object>> Update(string id, PayrollRequestUpdate model)
        {
            string message = string.Empty;

            var response = await dbContext.Payrolls.Where(x => x.PayrollId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<Payroll>.OnBuild(model, response);

            //Validar regalía
            if(response.IsRoyaltyPayroll != model.IsRoyaltyPayroll)
            {
                var payrollprocess = await dbContext.PayrollsProcess.Where(x => x.PayrollId == id && x.PayrollProcessStatus != PayrollProcessStatus.Canceled
                                                                            && x.PayrollProcessStatus != PayrollProcessStatus.Created)
                                                                    .FirstOrDefaultAsync();

                if (payrollprocess != null)                
                {
                    message = "El tipo de nómina regalía no se puede cambiar si ya se ha usado la nómina. Registro actualizado con éxito./n";
                }
            }
            
            //Validar si es por hora
            if(response.IsForHourPayroll != model.IsForHourPayroll)
            {
                var payrollprocess = await dbContext.PayrollsProcess.Where(x => x.PayrollId == id && x.PayrollProcessStatus != PayrollProcessStatus.Canceled
                                                                            && x.PayrollProcessStatus != PayrollProcessStatus.Created)
                                                                    .FirstOrDefaultAsync();

                if (payrollprocess != null)                
                {
                    message = "El tipo de nómina por hora no se puede cambiar si ya se ha usado la nómina. Registro actualizado con éxito./n";
                }
            }

            //Validar fecha de inicio
            if(response.ValidFrom != model.ValidFrom)
            {
                var paycycles = await dbContext.PayCycles.Where(x => x.PayrollId == id).FirstOrDefaultAsync();

                if (paycycles != null)
                {
                    message += "La fecha de inicio no se puede cambiar si hay ciclos de pago asociados. Registro actualizado con éxito.";
                    entity.ValidFrom = response.ValidFrom;
                }
            }

            message = string.IsNullOrEmpty(message)?"Registro actualizado con éxito":message;

            await dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = message };
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="status">Parametro status.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> UpdateStatus(string id, bool status)
        {
            var response = await dbContext.Payrolls.Where(x => x.PayrollId == (string)id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Message = "El registro seleccionado no existe"
                };
            }

            response.PayrollStatus = status;
            await dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }
}
