/// <summary>
/// Manejador de comandos para operaciones CRUD de Report.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Reports;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports
{
    /// <summary>
    /// Manejador para operaciones de IReportCommand.
    /// </summary>
    public interface IReportCommandHandler
    {
        public Task<Response<object>> SendEmail(string payrollProcessId, string employeeid, string departmentid, string[] session, string partialRoute);
    }

    /// <summary>

    /// Manejador para operaciones de ReportCommand.

    /// </summary>

    public class ReportCommandHandler : IReportCommandHandler
    {
        private IApplicationDbContext _NewDbContext;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public ReportCommandHandler(IApplicationDbContext newDbContext, IServiceScopeFactory serviceScopeFactory)
        {
            _NewDbContext = newDbContext;
            _serviceScopeFactory = serviceScopeFactory;
        }


        /// <summary>


        /// Envia.


        /// </summary>


        /// <param name="payrollProcessId">Parametro payrollProcessId.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <param name="departmentid">Parametro departmentid.</param>


        /// <param name="session">Parametro session.</param>


        /// <param name="partialRoute">Parametro partialRoute.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<object>> SendEmail(string payrollProcessId, string employeeid, string departmentid, string[] session, string partialRoute)
        {
            bool isError = false;
            int internalid = 0;
            string information = string.Empty;
            int count = 0;

            using (var scope = _serviceScopeFactory.CreateScope())
            {
                _NewDbContext = scope.ServiceProvider.GetService<IApplicationDbContext>();
                IEmailServices _EmailService = scope.ServiceProvider.GetService<IEmailServices>();

                internalid = await CreateHistory(BatchEntity.SendReportEmail, session);

                using var transaction = _NewDbContext.Database.BeginTransaction();

                try
                {
                    var models = await PayrollPaymentReport(payrollProcessId, employeeid, departmentid, session);

                    foreach (var item in models)
                    {                        
                        var emailemployee = await _NewDbContext.EmployeeContactsInf.Where(x => x.EmployeeId == item.EmployeeId && x.IsPrincipal == true
                                                                && x.ContactType == ContactType.Correo
                                                                && x.DataAreaId == session[0]).IgnoreQueryFilters().FirstOrDefaultAsync();

                        if (emailemployee == null)
                        {
                            isError = true;
                            information += $"Empleado: {item.EmployeeName} - No tiene correo asociado como principal. |";
                        }

                        if (!isError)
                        {
                            string bodyEmail = EmailReportEmployeeTemplate.Template(item, partialRoute);
                            string emailResponse = await _EmailService.SendEmailFile(emailemployee.NumberAddress, bodyEmail, item.PaymentDate);

                            int httpStatus = int.Parse(emailResponse.Substring(0, 3));

                            if (httpStatus != 200)
                            {
                                information += $"Empleado: {item.EmployeeName} - {emailResponse.Substring(4)}. |";
                            }       
                            else
                            {
                                count++;
                            }
                        }
                    }

                    if (string.IsNullOrEmpty(information))
                    {
                        information = $"Se enviaron {count} registro/s correctamente";
                    }

                    await UpdateHistory(internalid, isError, information, session);

                    transaction.Commit();

                    return new Response<object>(string.Empty)
                    {
                        Succeeded = true,
                        Message = "Operacion completada, vea la información para saber los detalles de la solicitud",
                        StatusHttp = 200,
                    };
                }
                catch (Exception ex)
                {
                    transaction.Rollback();

                    await UpdateHistory(internalid, true, ex.Message, session);

                    string path = Path.Combine(partialRoute, @$"BatchLog\EmployeeProcess-{internalid}.txt");
                    using (FileStream fs = File.Create(path))
                    {
                        byte[] content = new UTF8Encoding(true).GetBytes(ex.Message);
                        fs.Write(content, 0, content.Length);
                    }

                    return new Response<object>(string.Empty)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { ex.Message },
                        StatusHttp = 404
                    };
                }
            }
        }

        private async Task<int> CreateHistory(BatchEntity entity, string[] session)
        {
            var newEntity = new BatchHistory()
            {
                BatchEntity = entity,
                StartDate = DateTime.Now,

                DataAreaId = session[0],
                CreatedBy = session[1],
                CreatedOn = DateTime.Now
            };

            _NewDbContext.BatchHistories.Add(newEntity);
            await _NewDbContext.SaveChangesAsync();

            return newEntity.InternalId;
        }

        private async Task UpdateHistory(int internalid, bool iserror, string information, string[] session)
        {
            var response = await _NewDbContext.BatchHistories.Where(x => x.InternalId == internalid
                                                                    && x.DataAreaId == session[0]).IgnoreQueryFilters().FirstOrDefaultAsync();

            response.IsError = iserror;
            response.Information = information;
            response.IsFinished = true;
            response.EndDate = DateTime.Now;

            await _NewDbContext.SaveChangesAsync();
        }

        //Reporte de recibo de pago de nómina
        /// <summary>
        /// Obtiene una coleccion de datos.
        /// </summary>
        /// <param name="payrollProcessId">Parametro payrollProcessId.</param>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="departmentid">Parametro departmentid.</param>
        /// <param name="session">Parametro session.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<ReportPayrollPaymentResponse>> PayrollPaymentReport(string payrollProcessId, string employeeid, string departmentid, string[] session)
        {
            List<ReportPayrollPaymentResponse> report = new List<ReportPayrollPaymentResponse>();
            //Loan, ExtraHours, Tax
            var configuration = await _NewDbContext.ReportsConfig.Where(x => x.DataAreaId == session[0]).IgnoreQueryFilters().FirstOrDefaultAsync();

            if (configuration == null)
            {
                configuration = new ReportConfig();
            };

            if (string.IsNullOrEmpty(departmentid))
                departmentid = "-";

            if (string.IsNullOrEmpty(employeeid))
                employeeid = "-";


            var a = await _NewDbContext.PayrollsProcess
                .Join(_NewDbContext.PayrollProcessDetails,
                    pp => pp.PayrollProcessId,
                    ppd => ppd.PayrollProcessId,
                    (pp, ppd) => new { Pp = pp, Ppd = ppd })
                .Where(x => x.Pp.PayrollProcessId == payrollProcessId
                        && x.Pp.DataAreaId == session[0]
                        && x.Ppd.DepartmentId.Contains(departmentid)
                        && x.Ppd.EmployeeId.Contains(employeeid)
                        && x.Pp.PayrollProcessStatus == PayrollProcessStatus.Pagado
                        || x.Pp.PayrollProcessStatus == PayrollProcessStatus.Cerrado)
                .Select(x => new
                {
                    EmployeeName = x.Ppd.EmployeeName,
                    EmployeeId = x.Ppd.EmployeeId,
                    StartWorkDate = DateTime.Today,
                    Document = x.Ppd.Document,
                    Department = x.Ppd.DepartmentName,
                    PayrollName = x.Pp.PayrollId,
                    Period = $"{x.Pp.PeriodStartDate.ToShortDateString()} - {x.Pp.PeriodEndDate.ToShortDateString()}",
                    PaymentDate = x.Pp.PaymentDate,
                    PayMethod = x.Ppd.PayMethod,
                    Total = x.Ppd.TotalAmount,
                    PositionName = _NewDbContext.EmployeePositions
                                         .Join(_NewDbContext.Positions,
                                            ep => ep.PositionId,
                                            p => p.PositionId,
                                            (ep, p) => new { ep.EmployeeId, ep.EmployeePositionStatus, p.PositionName, ep.DataAreaId})
                                         .Where(y => y.EmployeeId == x.Ppd.EmployeeId && y.EmployeePositionStatus == true && y.DataAreaId == session[0])
                                         .Select(x => x.PositionName)
                                         .IgnoreQueryFilters()
                                         .FirstOrDefault()
                }).IgnoreQueryFilters().ToListAsync();

            if (a != null)
            {
                var actions = await _NewDbContext.PayrollProcessActions.Where(x => x.PayrollProcessId == payrollProcessId
                                                                              && x.DataAreaId == session[0]).IgnoreQueryFilters().ToListAsync();

                foreach (var item in a)
                {
                    var b = actions.Where(x => x.EmployeeId == item.EmployeeId).ToList();

                    var s = b.Where(x => x.ActionId == configuration.Salary).Select(x => x.ActionAmount).ToList().Sum();
                    var com = b.Where(x => x.ActionId == configuration.Comission).Select(x => x.ActionAmount).ToList().Sum();
                    var eh = b.Where(x => x.PayrollActionType == PayrollActionType.HorasExtras).Select(x => x.ActionAmount).ToList().Sum();
                    var oEarning = b.Where(x => x.PayrollActionType == PayrollActionType.Ingreso && x.ActionId != configuration.Salary && x.ActionId != configuration.Comission)
                                    .Select(x => x.ActionAmount).ToList().Sum();


                    var afp = b.Where(x => x.ActionId == configuration.AFP && x.PayrollActionType == PayrollActionType.Deduccion).Select(x => x.ActionAmount).ToList().Sum();
                    var sfs = b.Where(x => x.ActionId == configuration.SFS && x.PayrollActionType == PayrollActionType.Deduccion).Select(x => x.ActionAmount).ToList().Sum();
                    var loanCoop = b.Where(x => x.ActionId == configuration.LoanCooperative).Select(x => x.ActionAmount).ToList().Sum();
                    var t = b.Where(x => x.PayrollActionType == PayrollActionType.Impuesto).Select(x => x.ActionAmount).ToList().Sum();
                    var loan = b.Where(x => x.PayrollActionType == PayrollActionType.Prestamo).Select(x => x.ActionAmount).ToList().Sum();
                    var oDiscount = b.Where(x => x.PayrollActionType == PayrollActionType.Deduccion && x.ActionId != configuration.AFP && x.ActionId != configuration.LoanCooperative && x.ActionId != configuration.SFS)
                                    .Select(x => x.ActionAmount).ToList().Sum();

                    //Actualización abono de cooperativa
                    var deductCoop = b.Where(x => x.ActionId == configuration.DeductionCooperative).Select(x => x.ActionAmount).ToList().Sum();

                    report.Add(new ReportPayrollPaymentResponse
                    {
                        EmployeeId = item.EmployeeId,
                        EmployeeName = item.EmployeeName,
                        StartWorkDate = item.StartWorkDate,
                        Document = item.Document,
                        Department = item.Department,
                        PayrollName = item.PayrollName,
                        Period = item.Period,
                        PaymentDate = item.PaymentDate,
                        PayMethod = item.PayMethod,
                        PositionName = string.IsNullOrEmpty(item.PositionName) ? "N/A" : item.PositionName,
                        Salary = s,
                        ExtraHour = eh,
                        Commision = com,
                        OtherEarning = oEarning,

                        AFP = afp,
                        SFS = sfs,
                        DeductionCooperative = deductCoop,

                        LoanCooperative = loanCoop,
                        Loan = Math.Abs(loan - loanCoop),

                        ISR = t,
                        OtherDiscount = oDiscount,

                        Total = item.Total
                    });
                }
            }


            return report;

        }
    }
}
