using DC365_WebNR.CORE.Aplication.ProcessHelper;
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
    public class ProcessEmployeeAssist: ServiceBase
    {
        private const string Endpoint = "employeeworkcontrolcalendars";
        public ProcessEmployeeAssist(string _token)
        {
            Token = _token;
        }

        //lista
        public async Task<IEnumerable<EmployeeWorkControlCalendarResponse>> GetAllDataAsync(string employeeid, int _PageNumber = 1, string PropertyName = "", string PropertyValue = "")
        {
            List<EmployeeWorkControlCalendarResponse> _model = new List<EmployeeWorkControlCalendarResponse>();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{employeeid}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EmployeeWorkControlCalendarResponse>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
                return ValidateRolHelper<EmployeeWorkControlCalendarResponse>.validate(Api, new EmployeeWorkControlCalendarResponse());

            }

            return _model;
        }

        //guardar
        public async Task<ResponseUI> PostDataAsync(EmployeeWorkControlCalendarRequest _model)
        {
            Response<EmployeeWorkControlCalendarResponse> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            //string urlData = urlsServices.GetUrl("Extrahours");
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeWorkControlCalendarResponse>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //editar
        public async Task<ResponseUI> PutDataAsync(string employeeid, EmployeeWorkControlCalendarRequest _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{_model.InternalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);
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

        //eliminar
        public async Task<ResponseUI> DeleteDataAsync(List<EmployeeWorkCalendarDeleteRequest> Obj, string employeeid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{employeeid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Delete);

            if (Api.IsSuccessStatusCode)
            {

                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                if (!DataApi.Succeeded)
                {
                    responseUI.Type = "error";
                    responseUI.Errors = DataApi.Errors;
                }
                else
                {
                    responseUI.Message = DataApi.Message;
                    responseUI.Type = "success";
                }

            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //buscar por id
        public async Task<EmployeeWorkControlCalendarResponse> GetDataAsync(string employeeid, string internalId)
        {
            EmployeeWorkControlCalendarResponse _model = new EmployeeWorkControlCalendarResponse();
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}?employeeid={employeeid}&workedday={internalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<EmployeeWorkControlCalendarResponse>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }
    }
}
