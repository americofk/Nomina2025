using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class ProcessEmployeeWorkCalendar : ServiceBase
    {
        public ProcessEmployeeWorkCalendar(string _token)
        {
            Token = _token;
        }

        //lista
        public async Task<IEnumerable<EmployeeWorkCalendar>> GetAllDataAsync(string employeeid, int _PageNumber = 1)
        {
            List<EmployeeWorkCalendar> _model = new List<EmployeeWorkCalendar>();


            string urlData = $"{urlsServices.GetUrl("HorarioEmpleado")}/{employeeid}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EmployeeWorkCalendar>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
                return ValidateRolHelper<EmployeeWorkCalendar>.validate(Api, new EmployeeWorkCalendar());

            }

            return _model;
        }

        //guardar
        public async Task<ResponseUI> PostDataAsync(EmployeeWorkCalendar _model)
        {
            Response<EmployeeWorkCalendar> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("HorarioEmpleado");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeWorkCalendar>>(Api.Content.ReadAsStringAsync().Result);
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
        public async Task<ResponseUI> PutDataAsync(int InternalId, EmployeeWorkCalendar _model)
        {
            ResponseUI responseUI = new ResponseUI();
            //EmployeeWorkCalendarRequest calendarRequest = new EmployeeWorkCalendarRequest()
            //{
            //    EmployeeId = _model.EmployeeId,
            //    CalendarDate = _model.CalendarDate,
            //    WorkFrom = _model.WorkFrom,
            //    WorkTo = _model.WorkTo,
            //    BreakWorkFrom = _model.BreakWorkFrom,
            //    BreakWorkTo = _model.BreakWorkTo,
            //};

            string urlData = $"{urlsServices.GetUrl("HorarioEmpleado")}/{InternalId}";

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

            string urlData = $"{urlsServices.GetUrl("HorarioEmpleado")}/{employeeid}";

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
                if (Api.StatusCode == HttpStatusCode.BadRequest)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = "error";
                    responseUI.Errors = resulError.Errors;
                }
                else
                {

                    responseUI.Type = "error";
                    responseUI.Errors = new List<string>() { "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador." };
                }

            }
            return responseUI;
        }

        //buscar por id
        public async Task<EmployeeWorkCalendar> GetDataAsync(string employeeid, string internalId)
        {
            EmployeeWorkCalendar _model = new EmployeeWorkCalendar();


            string urlData = $"{urlsServices.GetUrl("HorarioEmpleado")}?employeeid={employeeid}&workedday={internalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<EmployeeWorkCalendar>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

    }
}
