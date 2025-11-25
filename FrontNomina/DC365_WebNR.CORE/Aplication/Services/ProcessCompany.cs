using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class ProcessCompany: ServiceBase
    {

        public ProcessCompany(string _token)
        {
            Token = _token;
        }

        //todas las empresas
        public async Task<IEnumerable<CompanyForUser>> GetAllDataAsync(int _PageNumber = 1)
        {
            List<CompanyForUser> _companies = new List<CompanyForUser>();

            string urlData = urlsServices.GetUrl("Company");

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);
            
            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CompanyForUser>>>(Api.Content.ReadAsStringAsync().Result);
                _companies = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _companies;
        }

        //Asignar empresas a un  usuario
        public async Task<ResponseUI> PostDataAsync(List<CompanyForUser> _model)
        {
            Response<object> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Companiestouser");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var response = Api.Content.ReadAsStringAsync().Result;
                DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
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

        //Empresas por usuario
        public async Task<List<CompanyForUser>> GetAllDataAsyncToUser(string Alias)
        {
            List<CompanyForUser> _companies = new List<CompanyForUser>();

            string urlData = $"{urlsServices.GetUrl("Companiestouser")}/{Alias}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CompanyForUser>>>(Api.Content.ReadAsStringAsync().Result);
                _companies = response.Data;
            }

            return _companies;
        }

        //eliminar empresas asignadas a un usuario
        public async Task<ResponseUI> DeleteDataAsyncFromUser(List<string> Obj, string Alias)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Companiestouser")}/{Alias}";

            var Api = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Delete);

            if (Api.IsSuccessStatusCode)
            {
                var dato = Api.Content.ReadAsStringAsync().Result;
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                if (!DataApi.Succeeded)
                {
                    responseUI.Type = "error";
                    responseUI.Errors = DataApi.Errors;
                }
                else
                    responseUI.Message = DataApi.Message;
                responseUI.Type = "success";
            }
            else
            {
                responseUI.Type = "error";
                responseUI.Errors = new List<string>() { "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador." };
            }
            return responseUI;
        }
    }
}
