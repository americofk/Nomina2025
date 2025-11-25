using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Reports;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class ProcessReports: ServiceBase
    {
        private const string Endpoint = "reports";
        public ProcessReports(string _token)
        {
            Token = _token;
        }

        //Lista Pagos Nomina
        public async Task<IEnumerable<ReportPayrollpayment>> PagosNomina(string payrollprocessid,string deparmentId, string employeeId)
        {
            List<ReportPayrollpayment> _model = new List<ReportPayrollpayment>();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/payrollpayment?payrollprocessid={payrollprocessid}&departmentid={deparmentId}&employeeid={employeeId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<ReportPayrollpayment>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }

        //Envio de correo 
        public async Task<ResponseUI> EnvioCorreoPagosNomina(string payrollprocessid, string deparmentId, string employeeId)
        {
            Response<string> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}emailreports/payrollpayment?payrollprocessid={payrollprocessid}&departmentid={deparmentId}&employeeid={employeeId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }


            return responseUI;
        }

        //Reporte de empleados
        public async Task<ReportEmployeeResponse> GetAllEmployeeReport(string deparmentId)
        {
            ReportEmployeeResponse _model = new ReportEmployeeResponse();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/employees?departmentId={deparmentId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportEmployeeResponse>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }

        //Reporte nómina
        public async Task<ReportPayrollProcess> GetAllDataPayrollReport (string payrollprocessid, string deparmentId)
        {
            ReportPayrollProcess _model = new ReportPayrollProcess();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/payrollprocess?payrollprocessid={payrollprocessid}&departmentid={deparmentId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportPayrollProcess>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }
        
        //Reporte tss
        public async Task<ReportTSSFileResponse> GetAllDataTssReport(string payrollid, int year, int month, string typetss)
        {
            ReportTSSFileResponse _model = new ReportTSSFileResponse();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/tss?payrollid={payrollid}&year={year}&month={month}&typetss={typetss}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportTSSFileResponse>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }

        //Reporte nómina DGT4
        public async Task<ReportDGT4> GetAllDataDGT4Report(int year, int month)
        {
            ReportDGT4 _model = new ReportDGT4();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt4?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT4>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }

        //Reporte nómina DGT2
        public async Task<ReportDGT2> GetAllDataDGT2Report(int year, int month)
        {
            ReportDGT2 _model = new ReportDGT2();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt2?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT2>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }
        
        //Reporte nómina DGT3
        public async Task<ReportDGT3> GetAllDataDGT3Report(int year, int month)
        {
            ReportDGT3 _model = new ReportDGT3();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt3?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT3>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }
        
        //Reporte nómina DGT5
        public async Task<ReportDGT5> GetAllDataDGT5Report(int year, int month)
        {
            ReportDGT5 _model = new ReportDGT5();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt5?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT5>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }
        
        //Reporte nómina DGT9
        public async Task<ReportDGT9> GetAllDataDGT9Report(int year, int month)
        {
            ReportDGT9 _model = new ReportDGT9();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt9?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT9>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }
        
        //Reporte nómina DGT11
        public async Task<ReportDGT11> GetAllDataDGT11Report(int year, int month)
        {
            ReportDGT11 _model = new ReportDGT11();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt4?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT11>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }
        //Reporte nómina DGT12
        public async Task<ReportDGT12> GetAllDataDGT12Report(int year, int month)
        {
            ReportDGT12 _model = new ReportDGT12();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/dgt12?year={year}&month={month}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);


            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<ReportDGT12>>(Api.Content.ReadAsStringAsync().Result);

                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }


        //Lista Resumen Pagos Nomina
        public async Task<IEnumerable<ReportResumePayrollResponse>> ResumenPagosNomina(string payrollprocessid, string deparmentId)
        {
            List<ReportResumePayrollResponse> _model = new List<ReportResumePayrollResponse>();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/payrollresume?payrollprocessid={payrollprocessid}&departmentid={deparmentId}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<ReportResumePayrollResponse>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }

    }
}
