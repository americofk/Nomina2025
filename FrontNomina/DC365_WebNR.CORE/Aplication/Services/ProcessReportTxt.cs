/// <summary>
/// Servicio para la gestión de reportes de texto.
/// Administra la generación de reportes en formato de texto plano.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Reports;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessReportTxt.
    /// </summary>
    public class ProcessReportTxt: ServiceBase
    {
        private const string Endpoint = "reportstxt";
        public ProcessReportTxt(string _token)
        {
            Token = _token;
        }

        //Lista txt dgt2
        /// <summary>
        /// Ejecuta TXT_DGT2 de forma asincrona.
        /// </summary>
        /// <param name="year">Parametro year.</param>
        /// <param name="month">Parametro month.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<MemoryStream> TXT_DGT2(int year, int month)
        {
            TXTModelDGT2 _model = new TXTModelDGT2();
            string Header = string.Empty;
            string DataEmployee = string.Empty;
            string Summary = string.Empty;

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt2?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<TXTModelDGT2>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }
           
            Header = $"{_model.ResgisterType}{_model.Process}{_model.RNC}{_model.Period}";
            Summary = $"{_model.ResgisterTypeSummary}{_model.RegisterQty}";
            foreach (var item in _model.Details)
            {
                DataEmployee = $"{DataEmployee}{item.ResgisterType}{item.ActionType}{item.DocumentType}{item.DocumentNumber}{item.Location}{item.AmountByNormalHour}{item.DayH}{item.Reason}\n";
            }

            MemoryStream ms = new MemoryStream();
            byte[] da = Encoding.UTF8.GetBytes($"{Header}\n{DataEmployee}{Summary}");
            ms.Write(da);
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }
        
        //Lista txt dgt3
        /// <summary>
        /// Ejecuta TXT_DGT3 de forma asincrona.
        /// </summary>
        /// <param name="year">Parametro year.</param>
        /// <param name="month">Parametro month.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<MemoryStream> TXT_DGT3(int year, int month)
        {
            TXTModelDGT3 _model = new TXTModelDGT3();
            string Header = string.Empty;
            string DataEmployee = string.Empty;
            string Summary = string.Empty;

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt3?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<TXTModelDGT3>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }
           
            Header = $"{_model.ResgisterType}{_model.Process}{_model.RNC}{_model.Period}";
            Summary = $"{_model.ResgisterTypeSummary}{_model.RegisterQty}";
            foreach (var item in _model.Details)
            {
                DataEmployee = $"{DataEmployee}{item.ResgisterType}{item.ActionType}{item.DocumentType}{item.DocumentNumber}{item.Name}{item.LastName}{item.SecondLastName}{item.BirthDate}{item.Gender}{item.Salary}{item.AdmissionDate}{item.Occupation}{item.OccupationDescription}{item.StartVacation}{item.EndVacation}{item.Turn}{item.Location}{item.EductionalLevel}{item.Disability}\n";
            }

            MemoryStream ms = new MemoryStream();
            byte[] da = Encoding.UTF8.GetBytes($"{Header}\n{DataEmployee}{Summary}");
            ms.Write(da);
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }
        
        //Lista txt dgt4
        /// <summary>
        /// Ejecuta TXT_DGT4 de forma asincrona.
        /// </summary>
        /// <param name="year">Parametro year.</param>
        /// <param name="month">Parametro month.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<MemoryStream> TXT_DGT4(int year, int month)
        {
            TXTModelDGT4 _model = new TXTModelDGT4();
            string Header = string.Empty;
            string DataEmployee = string.Empty;
            string Summary = string.Empty;

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt4?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<TXTModelDGT4>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }
           
            Header = $"{_model.ResgisterType}{_model.Process}{_model.RNC}{_model.Period}";
            Summary = $"{_model.ResgisterTypeSummary}{_model.RegisterQty}";
            foreach (var item in _model.Details)
            {
                DataEmployee = $"{DataEmployee}{item.ResgisterType}{item.ActionType}{item.DocumentType}{item.DocumentNumber}{item.Name}{item.LastName}{item.SecondLastName}{item.BirthDate}{item.Gender}{item.Salary}{item.AdmissionDate}{item.DismissDate}{item.Occupation}{item.OccupationDescription}{item.StartVacation}{item.EndVacation}{item.Turn}{item.Location}{item.Nationality}{item.DateChange}{item.EductionalLevel}{item.Disability}\n";
            }

            MemoryStream ms = new MemoryStream();
            byte[] da = Encoding.UTF8.GetBytes($"{Header}\n{DataEmployee}{Summary}");
            ms.Write(da);
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }
        
        //Lista txt dgt5
        /// <summary>
        /// Ejecuta TXT_DGT5 de forma asincrona.
        /// </summary>
        /// <param name="year">Parametro year.</param>
        /// <param name="month">Parametro month.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<MemoryStream> TXT_DGT5(int year, int month)
        {
            TXTModelDGT5 _model = new TXTModelDGT5();
            string Header = string.Empty;
            string DataEmployee = string.Empty;
            string Summary = string.Empty;

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt5?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<TXTModelDGT5>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }
           
            Header = $"{_model.ResgisterType}{_model.Process}{_model.RNC}{_model.Period}";
            Summary = $"{_model.ResgisterTypeSummary}{_model.RegisterQty}";
            foreach (var item in _model.Details)
            {
                DataEmployee = $"{DataEmployee}{item.ResgisterType}{item.ActionType}{item.DocumentType}{item.DocumentNumber}{item.Salary}{item.AdmissionDate}{item.Occupation}{item.OccupationDescription}{item.Turn}{item.Location}{item.WorkedDays}{item.SalaryDiary}{item.EductionalLevel}{item.Disability}\n";
            }

            MemoryStream ms = new MemoryStream();
            byte[] da = Encoding.UTF8.GetBytes($"{Header}\n{DataEmployee}{Summary}");
            ms.Write(da);
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }

        //Lista txt TSS
        /// <summary>
        /// Ejecuta TXT_TSS de forma asincrona.
        /// </summary>
        /// <param name="year">Parametro year.</param>
        /// <param name="month">Parametro month.</param>
        /// <param name="payrollid">Parametro payrollid.</param>
        /// <param name="typetss">Parametro typetss.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<MemoryStream> TXT_TSS(int year, int month, string payrollid, string typetss)
        {
            TXTModelTSS _model = new TXTModelTSS();
            string Header = string.Empty;
            string DataEmployee = string.Empty;
            string Summary = string.Empty;

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/tss?year={year}&month={month}&payrollid={payrollid}&typetss={typetss}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<TXTModelTSS>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            Header = $"{_model.ResgisterType}{_model.Process}{_model.RNC}{_model.Period}";
            Summary = $"{_model.ResgisterTypeSummary}{_model.RegisterQty}";
            foreach (var item in _model.Details)
            {
                DataEmployee = $"{DataEmployee}{item.ResgisterType}{item.PayrollCode}{item.DocumentType}{item.DocumentNumber}{item.EmployeeName}{item.EmployeeLastName}{item.EmployeeSecondLastName}{item.Gender}{item.BirthDate}{item.Salary}{item.EmptyAmount}{item.Salary_ISR}{item.EmptyAmount}           {item.EmptyAmount}{item.EmptyAmount}{item.EmptyAmount}{item.EmptyAmount}000001{item.EmptyAmount}02{item.EmptyAmount}03{item.EmptyAmount}\n";
            }

            MemoryStream ms = new MemoryStream();
            byte[] da = Encoding.UTF8.GetBytes($"{Header}\n{DataEmployee}{Summary}");
            ms.Write(da);
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }

        //Txt payroll
        /// <summary>
        /// Ejecuta TXT_Payroll de forma asincrona.
        /// </summary>
        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>
        /// <param name="payrollid">Parametro payrollid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<MemoryStream> TXT_Payroll(string payrollprocessid, string payrollid)
        {
            TXTModelPayrollBP _model = new TXTModelPayrollBP();
            string Header = string.Empty;
            string DataEmployee = string.Empty;
            string Summary = string.Empty;

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/txtpayroll?payrollprocessid={payrollprocessid}&payrollid={payrollid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<TXTModelPayrollBP>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");
                }
            }

            Header = $"{_model.Type}{_model.RNC}{_model.CompanyName}{_model.Sequence}{_model.ServiceType}{_model.EfectiveDate}{_model.QtyDebit}{_model.TotalAmountDebit}{_model.QtyCredit}{_model.TotalAmountCredit}{_model.NoMID}{_model.SendDate}{_model.Email}{_model.Status}{_model.Filler}";
            foreach (var item in _model.Details)
            {
                DataEmployee = $"{DataEmployee}{item.Type}{item.RNC}" +
                    $"{item.Sequence}{item.TransactionSequence}{item.ToAccount}" +
                    $"{item.ToAccountType}{item.Currency}{item.ToBankCode}" +
                    $"{item.ToVerficatorDigitBank}{item.OperationCode}{item.TransactionAmount}" +
                    $"{item.IdentificationType}{item.IdentificationNumber}{item.EmployeeName}" +
                    $"{item.ReferenceNumber}{item.Description}{item.DueDate}" +
                    $"{item.ContactForm}{item.EmployeeEmail}{item.EmployeePhone}" +
                    $"{item.PaymentProcess}{item.EmptyValue}{item.Filler}\n";
            }

            MemoryStream ms = new MemoryStream();
            byte[] da = Encoding.UTF8.GetBytes($"{Header}\n{DataEmployee}{Summary}");
            ms.Write(da);
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }
    }
}
