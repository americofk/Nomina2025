/// <summary>
/// Manejador de comandos para operaciones CRUD de SeveranceProcess.
/// Gestiona creación, actualización y eliminación de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.SeveranceProcess;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.SeveranceProcesses
{
    /// <summary>
    /// Manejador para operaciones de ISeveranceProcessCommand.
    /// </summary>
    public interface ISeveranceProcessCommandHandler : ICreateCommandHandler<SeveranceProcessRequest>, IDeleteCommandHandler, IUpdateCommandHandler<SeveranceProcessRequest>
    {
        public Task<Response<object>> UpdateStatus(string id, int status);
        public Task<Response<object>> AddEmployee(string processId, string employeeId);
        public Task<Response<SeveranceProcessDetail>> GetDetail(string processId, string employeeId);
        public Task<Response<object>> UpdateDetail(SeveranceProcessDetail model);
        public Task<Response<bool>> DeleteEmployee(string processId, string employeeId);
        public Task<Response<SeveranceCalculationResult>> CalculateSeverance(string processId, string employeeId);
    }

    /// <summary>
    /// Manejador para operaciones de SeveranceProcessCommand.
    /// </summary>
    public class SeveranceProcessCommandHandler : ISeveranceProcessCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public SeveranceProcessCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>
        /// Crea un nuevo registro.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<object>> Create(SeveranceProcessRequest model)
        {
            var entity = new SeveranceProcess
            {
                Description = model.Description,
                ProcessDate = model.ProcessDate,
                EmployeeQuantity = 0,
                TotalPreaviso = 0,
                TotalCesantia = 0,
                TotalVacaciones = 0,
                TotalNavidad = 0,
                TotalGeneral = 0,
                SeveranceProcessStatus = SeveranceProcessStatus.Created
            };

            _dbContext.SeveranceProcesses.Add(entity);
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
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<bool>> Delete(List<string> ids)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.SeveranceProcesses.Where(x => x.SeveranceProcessId == item).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    // Verificar que no esté pagado
                    if (response.SeveranceProcessStatus == SeveranceProcessStatus.Paid)
                    {
                        throw new Exception($"El registro no se puede eliminar porque ya ha sido pagado - id {item}");
                    }

                    // Si EmployeeQuantity > 0, no permitir eliminar
                    if (response.EmployeeQuantity > 0)
                    {
                        throw new Exception($"El registro no se puede eliminar porque tiene empleados asociados - id {item}");
                    }

                    _dbContext.SeveranceProcesses.Remove(response);
                    await _dbContext.SaveChangesAsync();
                }

                transaction.Commit();
                return new Response<bool>(true) { Message = "Registros eliminados con éxito" };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { errorMessage },
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
        public async Task<Response<object>> Update(string id, SeveranceProcessRequest model)
        {
            var response = await _dbContext.SeveranceProcesses.Where(x => x.SeveranceProcessId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            response.Description = model.Description;
            response.ProcessDate = model.ProcessDate;

            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }

        /// <summary>
        /// Actualiza el estado del proceso.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="status">Parametro status.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<object>> UpdateStatus(string id, int status)
        {
            var response = await _dbContext.SeveranceProcesses.Where(x => x.SeveranceProcessId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Message = "El registro seleccionado no existe"
                };
            }

            response.SeveranceProcessStatus = (SeveranceProcessStatus)status;
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }

        /// <summary>
        /// Agrega un empleado al proceso de prestaciones.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<object>> AddEmployee(string processId, string employeeId)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                // Obtener el proceso
                var process = await _dbContext.SeveranceProcesses
                    .Where(x => x.SeveranceProcessId == processId)
                    .FirstOrDefaultAsync();

                if (process == null)
                {
                    return new Response<object>(false)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { "El proceso seleccionado no existe" },
                        StatusHttp = 404
                    };
                }

                // Obtener el empleado
                var employee = await _dbContext.Employees
                    .Where(x => x.EmployeeId == employeeId)
                    .FirstOrDefaultAsync();

                if (employee == null)
                {
                    return new Response<object>(false)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { "El empleado seleccionado no existe" },
                        StatusHttp = 404
                    };
                }

                // Verificar si el empleado ya está en el proceso (incluyendo eliminados)
                var existingDetail = await _dbContext.SeveranceProcessDetails
                    .IgnoreQueryFilters()
                    .Where(x => x.SeveranceProcessId == processId && x.EmployeeId == employeeId)
                    .FirstOrDefaultAsync();

                if (existingDetail != null)
                {
                    // Si existe pero está eliminado, reactivarlo
                    if (existingDetail.IsDeleted)
                    {
                        existingDetail.IsDeleted = false;
                        existingDetail.DeletedBy = null;
                        existingDetail.DeletedOn = null;
                        existingDetail.EmployeeName = $"{employee.Name} {employee.LastName}";
                        existingDetail.Document = employee.NSS ?? "";
                        existingDetail.StartWorkDate = employee.StartWorkDate;
                        existingDetail.EndWorkDate = DateTime.Now;
                        existingDetail.PayFrecuency = PayFrecuency.NotSelected;
                        existingDetail.SalaryCalculationType = -1;

                        _dbContext.SeveranceProcessDetails.Update(existingDetail);

                        // Incrementar la cantidad de empleados en el proceso
                        process.EmployeeQuantity++;

                        await _dbContext.SaveChangesAsync();
                        transaction.Commit();

                        return new Response<object>(true) { Message = "Empleado reactivado en el proceso correctamente" };
                    }
                    else
                    {
                        return new Response<object>(false)
                        {
                            Succeeded = false,
                            Errors = new List<string>() { "El empleado ya está agregado al proceso" },
                            StatusHttp = 400
                        };
                    }
                }

                // Crear el detalle
                var detail = new SeveranceProcessDetail
                {
                    InternalId = process.EmployeeQuantity + 1,
                    SeveranceRefRecId = process.RecId,
                    SeveranceProcessId = processId,
                    EmployeeId = employeeId,
                    EmployeeName = $"{employee.Name} {employee.LastName}",
                    Document = employee.NSS ?? "",
                    StartWorkDate = employee.StartWorkDate,
                    EndWorkDate = DateTime.Now,
                    CalculationType = SeveranceCalculationType.Desahucio,
                    PayFrecuency = PayFrecuency.NotSelected,
                    SalaryCalculationType = -1,
                    TiempoLaborando = "",
                    YearsWorked = 0,
                    MonthsWorked = 0,
                    DaysWorked = 0,
                    SumaSalarios = 0,
                    SalarioPromedioMensual = 0,
                    SalarioPromedioDiario = 0,
                    WasNotified = false,
                    DiasPreaviso = 0,
                    MontoPreaviso = 0,
                    IncludeCesantia = true,
                    DiasCesantia = 0,
                    MontoCesantia = 0,
                    TookVacations = false,
                    DiasVacaciones = 0,
                    MontoVacaciones = 0,
                    IncludeNavidad = true,
                    MesesTrabajadosAnio = 0,
                    MontoNavidad = 0,
                    TotalARecibir = 0,
                    Comments = ""
                };

                _dbContext.SeveranceProcessDetails.Add(detail);

                // Incrementar la cantidad de empleados en el proceso
                process.EmployeeQuantity++;

                await _dbContext.SaveChangesAsync();
                transaction.Commit();

                return new Response<object>(true) { Message = "Empleado agregado correctamente al proceso" };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { errorMessage },
                    StatusHttp = 500
                };
            }
        }

        /// <summary>
        /// Obtiene el detalle de un empleado en el proceso.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Detalle del empleado.</returns>
        public async Task<Response<SeveranceProcessDetail>> GetDetail(string processId, string employeeId)
        {
            var detail = await _dbContext.SeveranceProcessDetails
                .Where(x => x.SeveranceProcessId == processId && x.EmployeeId == employeeId)
                .FirstOrDefaultAsync();

            if (detail == null)
            {
                return new Response<SeveranceProcessDetail>(null)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El detalle no existe" },
                    StatusHttp = 404
                };
            }

            return new Response<SeveranceProcessDetail>(detail);
        }

        /// <summary>
        /// Actualiza el detalle de un empleado en el proceso.
        /// </summary>
        /// <param name="model">Modelo con los datos actualizados.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<object>> UpdateDetail(SeveranceProcessDetail model)
        {
            var detail = await _dbContext.SeveranceProcessDetails
                .Where(x => x.SeveranceProcessId == model.SeveranceProcessId && x.EmployeeId == model.EmployeeId)
                .FirstOrDefaultAsync();

            if (detail == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El detalle no existe" },
                    StatusHttp = 404
                };
            }

            // Actualizar campos editables
            detail.StartWorkDate = model.StartWorkDate;
            detail.EndWorkDate = model.EndWorkDate;
            detail.CalculationType = model.CalculationType;

            // Salarios mensuales
            detail.SalarioMes1 = model.SalarioMes1;
            detail.SalarioMes2 = model.SalarioMes2;
            detail.SalarioMes3 = model.SalarioMes3;
            detail.SalarioMes4 = model.SalarioMes4;
            detail.SalarioMes5 = model.SalarioMes5;
            detail.SalarioMes6 = model.SalarioMes6;
            detail.SalarioMes7 = model.SalarioMes7;
            detail.SalarioMes8 = model.SalarioMes8;
            detail.SalarioMes9 = model.SalarioMes9;
            detail.SalarioMes10 = model.SalarioMes10;
            detail.SalarioMes11 = model.SalarioMes11;
            detail.SalarioMes12 = model.SalarioMes12;

            // Comisiones mensuales
            detail.ComisionMes1 = model.ComisionMes1;
            detail.ComisionMes2 = model.ComisionMes2;
            detail.ComisionMes3 = model.ComisionMes3;
            detail.ComisionMes4 = model.ComisionMes4;
            detail.ComisionMes5 = model.ComisionMes5;
            detail.ComisionMes6 = model.ComisionMes6;
            detail.ComisionMes7 = model.ComisionMes7;
            detail.ComisionMes8 = model.ComisionMes8;
            detail.ComisionMes9 = model.ComisionMes9;
            detail.ComisionMes10 = model.ComisionMes10;
            detail.ComisionMes11 = model.ComisionMes11;
            detail.ComisionMes12 = model.ComisionMes12;

            // Totales de salarios
            detail.SumaSalarios = model.SumaSalarios;
            detail.SalarioPromedioMensual = model.SalarioPromedioMensual;
            detail.SalarioPromedioDiario = model.SalarioPromedioDiario;

            // Preaviso, cesantía, vacaciones, navidad
            detail.WasNotified = model.WasNotified;
            detail.MontoPreaviso = model.MontoPreaviso;
            detail.IncludeCesantia = model.IncludeCesantia;
            detail.MontoCesantia = model.MontoCesantia;
            detail.TookVacations = model.TookVacations;
            detail.DiasVacaciones = model.DiasVacaciones;
            detail.MontoVacaciones = model.MontoVacaciones;
            detail.IncludeNavidad = model.IncludeNavidad;
            detail.MontoNavidad = model.MontoNavidad;
            detail.TotalARecibir = model.TotalARecibir;

            // Marcar entidad como modificada para que EF Core detecte los cambios y aplique auditoría
            _dbContext.SeveranceProcessDetails.Update(detail);

            await _dbContext.SaveChangesAsync();

            // Actualizar totales del proceso
            await UpdateProcessTotals(model.SeveranceProcessId);

            return new Response<object>(true) { Message = "Detalle actualizado correctamente" };
        }

        /// <summary>
        /// Elimina un empleado del proceso de prestaciones.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<bool>> DeleteEmployee(string processId, string employeeId)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                var detail = await _dbContext.SeveranceProcessDetails
                    .Where(x => x.SeveranceProcessId == processId && x.EmployeeId == employeeId)
                    .FirstOrDefaultAsync();

                if (detail == null)
                {
                    return new Response<bool>(false)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { "El detalle no existe" },
                        StatusHttp = 404
                    };
                }

                _dbContext.SeveranceProcessDetails.Remove(detail);

                // Decrementar cantidad de empleados
                var process = await _dbContext.SeveranceProcesses
                    .Where(x => x.SeveranceProcessId == processId)
                    .FirstOrDefaultAsync();

                if (process != null && process.EmployeeQuantity > 0)
                {
                    process.EmployeeQuantity--;
                }

                await _dbContext.SaveChangesAsync();
                transaction.Commit();

                // Actualizar totales del proceso
                await UpdateProcessTotals(processId);

                return new Response<bool>(true) { Message = "Empleado eliminado del proceso correctamente" };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { errorMessage },
                    StatusHttp = 500
                };
            }
        }

        /// <summary>
        /// Actualiza los totales del proceso sumando todos los detalles.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        private async Task UpdateProcessTotals(string processId)
        {
            var process = await _dbContext.SeveranceProcesses
                .Where(x => x.SeveranceProcessId == processId)
                .FirstOrDefaultAsync();

            if (process == null) return;

            var details = await _dbContext.SeveranceProcessDetails
                .Where(x => x.SeveranceProcessId == processId)
                .ToListAsync();

            process.TotalPreaviso = details.Sum(x => x.MontoPreaviso);
            process.TotalCesantia = details.Sum(x => x.MontoCesantia);
            process.TotalVacaciones = details.Sum(x => x.MontoVacaciones);
            process.TotalNavidad = details.Sum(x => x.MontoNavidad);
            process.TotalGeneral = details.Sum(x => x.TotalARecibir);

            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Calcula las prestaciones laborales de un empleado.
        /// Basado en el Código de Trabajo de RD (Ley 16-92).
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado del cálculo.</returns>
        public async Task<Response<SeveranceCalculationResult>> CalculateSeverance(string processId, string employeeId)
        {
            try
            {
                // Obtener el detalle del empleado en el proceso
                var detail = await _dbContext.SeveranceProcessDetails
                    .Where(x => x.SeveranceProcessId == processId && x.EmployeeId == employeeId)
                    .FirstOrDefaultAsync();

                if (detail == null)
                {
                    return new Response<SeveranceCalculationResult>(null)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { "El empleado no existe en el proceso" },
                        StatusHttp = 404
                    };
                }

                var result = new SeveranceCalculationResult
                {
                    EmployeeId = employeeId,
                    EmployeeName = detail.EmployeeName,
                    StartWorkDate = detail.StartWorkDate,
                    EndWorkDate = detail.EndWorkDate
                };

                // 1. Calcular tiempo laborado
                CalculateTiempoLaborado(result);

                // 2. Obtener salarios de los últimos 12 meses desde la vista
                await GetSalariosMensuales(result, employeeId, detail.EndWorkDate);

                // Validar que existan datos de pago
                if (result.SalariosMensuales == null || result.SalariosMensuales.Sum(x => x.Total) == 0)
                {
                    return new Response<SeveranceCalculationResult>(null)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { $"El empleado {detail.EmployeeName} no tiene movimientos de pago en los últimos 12 meses. Verifique que existan nóminas procesadas con códigos de ganancia marcados como 'Aplica Prestaciones'." },
                        StatusHttp = 400
                    };
                }

                // 3. Calcular salario promedio
                CalculateSalarioPromedio(result);

                // 4. Calcular preaviso (Art. 76)
                CalculatePreaviso(result, detail.WasNotified);

                // 5. Calcular cesantía (Art. 80)
                CalculateCesantia(result, detail.IncludeCesantia);

                // 6. Calcular vacaciones (Art. 177-179)
                CalculateVacaciones(result, detail.TookVacations, detail.DiasVacaciones);

                // 7. Calcular salario de navidad (Art. 219)
                CalculateNavidad(result, detail.IncludeNavidad);

                // 8. Calcular total
                result.TotalARecibir = result.MontoPreaviso + result.MontoCesantia +
                                       result.MontoVacaciones + result.MontoNavidad;

                // 9. Guardar los valores calculados en el detalle
                detail.TiempoLaborando = result.TiempoLaborando;
                detail.YearsWorked = result.YearsWorked;
                detail.MonthsWorked = result.MonthsWorked;
                detail.DaysWorked = result.DaysWorked;

                // Salarios mensuales
                if (result.SalariosMensuales != null && result.SalariosMensuales.Count > 0)
                {
                    detail.SalarioMes1 = result.SalariosMensuales.Count > 0 ? result.SalariosMensuales[0].Salario : 0;
                    detail.SalarioMes2 = result.SalariosMensuales.Count > 1 ? result.SalariosMensuales[1].Salario : 0;
                    detail.SalarioMes3 = result.SalariosMensuales.Count > 2 ? result.SalariosMensuales[2].Salario : 0;
                    detail.SalarioMes4 = result.SalariosMensuales.Count > 3 ? result.SalariosMensuales[3].Salario : 0;
                    detail.SalarioMes5 = result.SalariosMensuales.Count > 4 ? result.SalariosMensuales[4].Salario : 0;
                    detail.SalarioMes6 = result.SalariosMensuales.Count > 5 ? result.SalariosMensuales[5].Salario : 0;
                    detail.SalarioMes7 = result.SalariosMensuales.Count > 6 ? result.SalariosMensuales[6].Salario : 0;
                    detail.SalarioMes8 = result.SalariosMensuales.Count > 7 ? result.SalariosMensuales[7].Salario : 0;
                    detail.SalarioMes9 = result.SalariosMensuales.Count > 8 ? result.SalariosMensuales[8].Salario : 0;
                    detail.SalarioMes10 = result.SalariosMensuales.Count > 9 ? result.SalariosMensuales[9].Salario : 0;
                    detail.SalarioMes11 = result.SalariosMensuales.Count > 10 ? result.SalariosMensuales[10].Salario : 0;
                    detail.SalarioMes12 = result.SalariosMensuales.Count > 11 ? result.SalariosMensuales[11].Salario : 0;

                    detail.ComisionMes1 = result.SalariosMensuales.Count > 0 ? result.SalariosMensuales[0].Comision : 0;
                    detail.ComisionMes2 = result.SalariosMensuales.Count > 1 ? result.SalariosMensuales[1].Comision : 0;
                    detail.ComisionMes3 = result.SalariosMensuales.Count > 2 ? result.SalariosMensuales[2].Comision : 0;
                    detail.ComisionMes4 = result.SalariosMensuales.Count > 3 ? result.SalariosMensuales[3].Comision : 0;
                    detail.ComisionMes5 = result.SalariosMensuales.Count > 4 ? result.SalariosMensuales[4].Comision : 0;
                    detail.ComisionMes6 = result.SalariosMensuales.Count > 5 ? result.SalariosMensuales[5].Comision : 0;
                    detail.ComisionMes7 = result.SalariosMensuales.Count > 6 ? result.SalariosMensuales[6].Comision : 0;
                    detail.ComisionMes8 = result.SalariosMensuales.Count > 7 ? result.SalariosMensuales[7].Comision : 0;
                    detail.ComisionMes9 = result.SalariosMensuales.Count > 8 ? result.SalariosMensuales[8].Comision : 0;
                    detail.ComisionMes10 = result.SalariosMensuales.Count > 9 ? result.SalariosMensuales[9].Comision : 0;
                    detail.ComisionMes11 = result.SalariosMensuales.Count > 10 ? result.SalariosMensuales[10].Comision : 0;
                    detail.ComisionMes12 = result.SalariosMensuales.Count > 11 ? result.SalariosMensuales[11].Comision : 0;
                }

                detail.SumaSalarios = result.SumaSalarios;
                detail.SalarioPromedioMensual = result.SalarioPromedioMensual;
                detail.SalarioPromedioDiario = result.SalarioPromedioDiario;

                // Preaviso
                detail.DiasPreaviso = result.DiasPreaviso;
                detail.MontoPreaviso = result.MontoPreaviso;

                // Cesantía
                detail.DiasCesantia = result.DiasCesantia;
                detail.MontoCesantia = result.MontoCesantia;

                // Vacaciones
                detail.DiasVacaciones = result.DiasVacaciones;
                detail.MontoVacaciones = result.MontoVacaciones;

                // Navidad
                detail.MesesTrabajadosAnio = result.MesesTrabajadosAnio;
                detail.MontoNavidad = result.MontoNavidad;

                // Total
                detail.TotalARecibir = result.TotalARecibir;

                _dbContext.SeveranceProcessDetails.Update(detail);
                await _dbContext.SaveChangesAsync();

                return new Response<SeveranceCalculationResult>(result)
                {
                    Message = "Cálculo realizado correctamente"
                };
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return new Response<SeveranceCalculationResult>(null)
                {
                    Succeeded = false,
                    Errors = new List<string>() { errorMessage },
                    StatusHttp = 500
                };
            }
        }

        /// <summary>
        /// Calcula el tiempo laborado entre las fechas.
        /// </summary>
        private void CalculateTiempoLaborado(SeveranceCalculationResult result)
        {
            var startDate = result.StartWorkDate;
            var endDate = result.EndWorkDate;

            int years = endDate.Year - startDate.Year;
            int months = endDate.Month - startDate.Month;
            int days = endDate.Day - startDate.Day;

            if (days < 0)
            {
                months--;
                var lastMonth = new DateTime(endDate.Year, endDate.Month, 1).AddDays(-1);
                days += lastMonth.Day;
            }

            if (months < 0)
            {
                years--;
                months += 12;
            }

            result.YearsWorked = years;
            result.MonthsWorked = months;
            result.DaysWorked = days;

            // Construir texto descriptivo
            var partes = new List<string>();
            if (years > 0) partes.Add($"{years} {(years == 1 ? "año" : "años")}");
            if (months > 0) partes.Add($"{months} {(months == 1 ? "mes" : "meses")}");
            if (days > 0 || partes.Count == 0) partes.Add($"{days} {(days == 1 ? "día" : "días")}");

            result.TiempoLaborando = string.Join(", ", partes);
        }

        /// <summary>
        /// Obtiene los salarios de los últimos 12 meses desde la vista View_SeveranceInfo.
        /// </summary>
        private async Task GetSalariosMensuales(SeveranceCalculationResult result, string employeeId, DateTime endDate)
        {
            // Fecha límite: 12 meses antes de la fecha de terminación
            var startLimit = endDate.AddMonths(-12);

            // Obtener pagos del empleado desde la vista
            var pagos = await _dbContext.ViewSeveranceInfo
                .Where(x => x.EmployeeId == employeeId &&
                           x.PaymentDate >= startLimit &&
                           x.PaymentDate <= endDate)
                .ToListAsync();

            // Agrupar por mes y año
            var pagosPorMes = pagos
                .GroupBy(x => new { x.PaymentDate.Year, x.PaymentDate.Month })
                .Select(g => new
                {
                    Anio = g.Key.Year,
                    Mes = g.Key.Month,
                    Total = g.Sum(x => x.ActionAmount)
                })
                .OrderByDescending(x => x.Anio)
                .ThenByDescending(x => x.Mes)
                .Take(12)
                .ToList();

            // Crear lista de 12 meses (rellenar con 0 los meses sin datos)
            result.SalariosMensuales = new List<MonthlySalary>();
            var currentDate = endDate;

            for (int i = 1; i <= 12; i++)
            {
                var mesActual = currentDate.AddMonths(-(i - 1));
                var pagoMes = pagosPorMes.FirstOrDefault(x => x.Anio == mesActual.Year && x.Mes == mesActual.Month);

                result.SalariosMensuales.Add(new MonthlySalary
                {
                    MesNumero = i,
                    Periodo = mesActual.ToString("MMM yyyy"),
                    Salario = pagoMes?.Total ?? 0,
                    Comision = 0, // Por ahora todo va a salario, luego se puede separar
                    Total = pagoMes?.Total ?? 0
                });
            }

            // Invertir para que mes 1 sea el más antiguo
            result.SalariosMensuales.Reverse();
        }

        /// <summary>
        /// Calcula el salario promedio mensual y diario.
        /// Divisor legal: 23.83
        /// </summary>
        private void CalculateSalarioPromedio(SeveranceCalculationResult result)
        {
            const decimal DIVISOR_LEGAL = 23.83m;

            result.SumaSalarios = result.SalariosMensuales.Sum(x => x.Total);
            result.SalarioPromedioMensual = result.SumaSalarios / 12;
            result.SalarioPromedioDiario = result.SalarioPromedioMensual / DIVISOR_LEGAL;
        }

        /// <summary>
        /// Calcula el preaviso según Art. 76 del Código de Trabajo.
        /// </summary>
        private void CalculatePreaviso(SeveranceCalculationResult result, bool wasNotified)
        {
            if (wasNotified)
            {
                result.DiasPreaviso = 0;
                result.MontoPreaviso = 0;
                return;
            }

            int totalMeses = (result.YearsWorked * 12) + result.MonthsWorked;

            // Art. 76: Días de preaviso según antigüedad
            if (totalMeses < 3)
            {
                result.DiasPreaviso = 0;
            }
            else if (totalMeses >= 3 && totalMeses < 6)
            {
                result.DiasPreaviso = 7;
            }
            else if (totalMeses >= 6 && totalMeses < 12)
            {
                result.DiasPreaviso = 14;
            }
            else
            {
                result.DiasPreaviso = 28;
            }

            result.MontoPreaviso = result.SalarioPromedioDiario * result.DiasPreaviso;
        }

        /// <summary>
        /// Calcula la cesantía según Art. 80 del Código de Trabajo (después de 1992).
        /// </summary>
        private void CalculateCesantia(SeveranceCalculationResult result, bool includeCesantia)
        {
            if (!includeCesantia)
            {
                result.DiasCesantia = 0;
                result.MontoCesantia = 0;
                return;
            }

            int totalMeses = (result.YearsWorked * 12) + result.MonthsWorked;
            decimal diasCesantia = 0;

            // Art. 80 después de 1992
            if (totalMeses < 3)
            {
                diasCesantia = 0;
            }
            else if (totalMeses >= 3 && totalMeses < 6)
            {
                diasCesantia = 6;
            }
            else if (totalMeses >= 6 && totalMeses < 12)
            {
                diasCesantia = 13;
            }
            else if (result.YearsWorked >= 1 && result.YearsWorked < 5)
            {
                // 21 días por año trabajado (proporcional)
                decimal aniosCompletos = result.YearsWorked + (result.MonthsWorked / 12.0m) + (result.DaysWorked / 365.0m);
                diasCesantia = 21 * aniosCompletos;
            }
            else if (result.YearsWorked >= 5)
            {
                // 23 días por año trabajado (proporcional)
                decimal aniosCompletos = result.YearsWorked + (result.MonthsWorked / 12.0m) + (result.DaysWorked / 365.0m);
                diasCesantia = 23 * aniosCompletos;
            }

            result.DiasCesantia = (int)Math.Ceiling(diasCesantia);
            result.MontoCesantia = result.SalarioPromedioDiario * diasCesantia;
        }

        /// <summary>
        /// Calcula las vacaciones según Art. 177-179 del Código de Trabajo.
        /// </summary>
        private void CalculateVacaciones(SeveranceCalculationResult result, bool tookVacations, decimal diasPendientes)
        {
            if (tookVacations)
            {
                // Si ya tomó vacaciones, calcular proporcional de los meses trabajados después
                int diasBase = result.YearsWorked >= 5 ? 18 : 14;
                decimal diasProporcionales = (diasBase / 12.0m) * result.MonthsWorked;
                result.DiasVacaciones = diasPendientes > 0 ? diasPendientes : diasProporcionales;
            }
            else
            {
                // No tomó vacaciones del último año
                int diasBase = result.YearsWorked >= 5 ? 18 : 14;

                // Días proporcionales por los meses trabajados en el año actual
                decimal diasProporcionales = (diasBase / 12.0m) * (result.MonthsWorked > 0 ? result.MonthsWorked : 12);
                result.DiasVacaciones = diasPendientes > 0 ? diasPendientes : diasProporcionales;
            }

            result.MontoVacaciones = result.SalarioPromedioDiario * result.DiasVacaciones;
        }

        /// <summary>
        /// Calcula el salario de navidad según Art. 219 del Código de Trabajo.
        /// </summary>
        private void CalculateNavidad(SeveranceCalculationResult result, bool includeNavidad)
        {
            if (!includeNavidad)
            {
                result.MesesTrabajadosAnio = 0;
                result.DiasTrabajadosAnio = 0;
                result.MontoNavidad = 0;
                return;
            }

            // Calcular meses trabajados en el año actual (desde enero hasta la fecha de terminación)
            var inicioAnio = new DateTime(result.EndWorkDate.Year, 1, 1);
            var fechaInicio = result.StartWorkDate > inicioAnio ? result.StartWorkDate : inicioAnio;

            int mesesEnAnio = result.EndWorkDate.Month - fechaInicio.Month;
            int diasEnAnio = result.EndWorkDate.Day - fechaInicio.Day;

            if (diasEnAnio < 0)
            {
                mesesEnAnio--;
                diasEnAnio += 30;
            }

            if (mesesEnAnio < 0)
            {
                mesesEnAnio = 0;
                diasEnAnio = 0;
            }

            result.MesesTrabajadosAnio = mesesEnAnio;
            result.DiasTrabajadosAnio = diasEnAnio;

            // Salario de navidad = (Salario mensual / 12) * meses trabajados
            decimal proporcion = mesesEnAnio + (diasEnAnio / 30.0m);
            result.MontoNavidad = (result.SalarioPromedioMensual / 12) * proporcion;
        }
    }
}
