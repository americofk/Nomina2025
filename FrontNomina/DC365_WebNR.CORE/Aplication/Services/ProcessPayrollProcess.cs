using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class ProcessPayrollProcess : ServiceBase
    {
        public ProcessPayrollProcess(string _token)
        {
            Token = _token;
        }

        //Seleccionar todos
        public async Task<IEnumerable<PayrollProcess>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<PayrollProcess> payrollsProcess = new List<PayrollProcess>();

            //string urlData = $"{urlsServices.GetUrl("PayrollProcess")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<PayrollProcess>>>(Api.Content.ReadAsStringAsync().Result);
                payrollsProcess = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return payrollsProcess;
        }

        //guardar
        public async Task<ResponseUI<PayrollProcess>> PostDataAsync(PayrollProcess _model)
        {
            Response<PayrollProcess> DataApi = null;
            ResponseUI<PayrollProcess> responseUI = new ResponseUI<PayrollProcess>();

            string urlData = urlsServices.GetUrl("PayrollProcess");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<PayrollProcess>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                responseUI.Obj = DataApi.Data;
            }
            else
            {
                if (Api.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = resulError.Errors;
                }
                else
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
                }
            }

            return responseUI;
        }


        //editar
        public async Task<ResponseUI<PayrollProcess>> PutDataAsync(string id, PayrollProcess _model)
        {
            ResponseUI<PayrollProcess> responseUI = new ResponseUI<PayrollProcess>();

            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);
            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                if (Api.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = resulError.Errors;
                }
                else
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
                }
            }

            return responseUI;
        }


        //eliminar
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("PayrollProcess");

            var Api = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Delete);
            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //seleccionar por id
        public async Task<PayrollProcess> GetIdDataAsync(string id)
        {
            PayrollProcess _model = new PayrollProcess();

            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<PayrollProcess>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }


        //procesar nómina
        public async Task<ResponseUI<List<PayrollProcessDetail>>> Process(string _processpayrollid)
        {
            Response<List<PayrollProcessDetail>> DataApi = null;
            ResponseUI<List<PayrollProcessDetail>> responseUI = new ResponseUI<List<PayrollProcessDetail>>();


            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/process/{_processpayrollid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<List<PayrollProcessDetail>>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                responseUI.Obj = DataApi.Data;
            }
            else
            {
                if (Api.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = resulError.Errors;
                }
                else
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
                }
            }

            return responseUI;
        }


        //calcular nómina
        public async Task<ResponseUI> CalcProcess(string _processpayrollid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/calculate/{_processpayrollid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }


        //procesar nómina
        public async Task<ResponseUI<List<PayrollProcessDetail>>> ProcessDetail(string _processpayrollid, string PropertyName = "", string PropertyValue = "")
        {
            Response<List<PayrollProcessDetail>> DataApi = null;
            ResponseUI<List<PayrollProcessDetail>> responseUI = new ResponseUI<List<PayrollProcessDetail>>();


            string urlData = $"{urlsServices.urlBaseOne}payrollprocessdetails/{_processpayrollid}?PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<List<PayrollProcessDetail>>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                responseUI.Obj = DataApi.Data;
            }
            else
            {
                if (Api.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = resulError.Errors;
                }
                else
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
                }
            }

            return responseUI;
        }


        //pagar nómina
        public async Task<ResponseUI> PayPayroll(string _processpayrollid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/pay/{_processpayrollid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }


        //Cancelar nómina
        public async Task<ResponseUI> CancelPayroll(string _processpayrollid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/cancel/{_processpayrollid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //Lista de periodos de nomina
        public async Task<IEnumerable<PayrollProcess>> GetListPayrollProcess(string payrollid, string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<PayrollProcess> payrollsProcess = new List<PayrollProcess>();

            string urlData = $"{urlsServices.GetUrl("PayrollProcess")}/payroll/{payrollid}?PageNumber={_PageNumber}&PageSize=40";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<PayrollProcess>>>(Api.Content.ReadAsStringAsync().Result);
                payrollsProcess = response.Data;
            }

            return payrollsProcess;
        }

    }
}
