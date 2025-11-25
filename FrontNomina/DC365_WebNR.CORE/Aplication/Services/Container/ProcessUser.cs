using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services.Container
{
    public class ProcessUser : ServiceBase
    {

        public ProcessUser(string _token)
        {
            Token = _token;
        }

        //todos los FormatCode
        public async Task<IEnumerable<FormatCode>> GetAllDataFormatCode(int _PageNumber = 1)
        {
            ProcessFormatCode processFormatCode = new ProcessFormatCode(Token);
            return await processFormatCode.GetAllDataAsync();
        }

        //todas las empresas
        public async Task<IEnumerable<CompanyForUser>> GetAllDataCompany(int _PageNumber = 1)
        {
            ProcessCompany companies = new ProcessCompany(Token);
            return await companies.GetAllDataAsync();
        }

        //menu general 
        public async Task<List<MenuApp>> GetAllMenuGeneral()
        {
            Menu menu = new Menu(Token);
            return await menu.MenuGeneral();
        }

        //todos los usuarios
        public async Task<IEnumerable<User>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<User> _user = new List<User>();

            //string urlData = $"{urlsServices.GetUrl("User")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("User")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<User>>>(Api.Content.ReadAsStringAsync().Result);
                _user = response.Data;
            }
            else
            {
                if (Api.StatusCode== HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _user;
        }

        //seleccionar un usuario
        public async Task<User> GetIdDataAsync(string Id)
        {
            User _model = new User();

            string urlData = $"{urlsServices.GetUrl("User")}/{Id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<User>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

        //guardar
        public async Task<ResponseUI> PostDataAsync(User _model)
        {
            Response<User> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("User");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var response = Api.Content.ReadAsStringAsync().Result;
                DataApi = JsonConvert.DeserializeObject<Response<User>>(Api.Content.ReadAsStringAsync().Result);

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
        public async Task<ResponseUI> PutDataAsync(string id, User _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("User")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);


            if (Api.IsSuccessStatusCode)
            {
                var dato = Api.Content.ReadAsStringAsync().Result;
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
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("User");

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

        //asignar foto al usuario
        public async Task<ResponseUI> Uploadimageuser(IFormFile file, string Alias)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Uploadimageuser")}/{Alias}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post, file);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);

                byte[] data;
                using (MemoryStream ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    data = ms.ToArray();
                }

                responseUI.Message = string.Format("data:image/jpg;base64,{0}", Convert.ToBase64String(data, 0, data.Length));
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }
            return responseUI;
        }

        // descargar foto de usuario
        public async Task<ResponseUI> Downloadimageuser(string Alias)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Downloadimageuser")}/{Alias}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                
                responseUI.Message = !string.IsNullOrEmpty(DataApi.Data) ? string.Format("data:image/jpg;base64,{0}", DataApi.Data) : string.Empty;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }
            return responseUI;
        }
    }
}
