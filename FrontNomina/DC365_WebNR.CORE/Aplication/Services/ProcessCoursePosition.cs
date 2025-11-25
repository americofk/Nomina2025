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
    public class ProcessCoursePosition: ServiceBase
    {
        private const string Endpoint = "coursepositions";

        public ProcessCoursePosition(string _token)
        {
            Token = _token;
        }

        //lista
        public async Task<IEnumerable<CoursePosition>> GetAllDataAsync(string courseid, int _PageNumber = 1)
        {
            List<CoursePosition> _model = new List<CoursePosition>();
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{courseid}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CoursePosition>>>(Api.Content.ReadAsStringAsync().Result);
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

        //guardar
        public async Task<ResponseUI> PostDataAsync(CoursePosition _model)
        {
            Response<CoursePosition> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                
                DataApi = JsonConvert.DeserializeObject<Response<CoursePosition>>(Api.Content.ReadAsStringAsync().Result);
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
        public async Task<ResponseUI> PutDataAsync(string CourseId, CoursePosition _model)
        {
            ResponseUI responseUI = new ResponseUI();


            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{CourseId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);


            if (Api.IsSuccessStatusCode)
            {
                
                var DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
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

        //eliminar
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj, string courseid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{courseid}";

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
        public async Task<CoursePosition> GetDataAsync(string courseid, string internalId)
        {
            CoursePosition _model = new CoursePosition();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{courseid}/{internalId}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<CoursePosition>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }
    }
}
