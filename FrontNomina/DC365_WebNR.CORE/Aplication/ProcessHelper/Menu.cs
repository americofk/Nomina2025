using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.ProcessHelper
{
    public class Menu : ServiceBase
    {
        public Menu(string _token)
        {
            Token = _token;
        }

        public async Task<ResponseUI<string>> ResultMenuLeft()
        {

            ResponseUI<string> responseUI = new ResponseUI<string>();
            Response<List<MenuApp>> responseProcess = null;

            string urlData = urlsServices.GetUrl("Menu");

            var response = await ServiceConnect.connectservice(Token, urlData, string.Empty, HttpMethod.Get);

            if (response.IsSuccessStatusCode)
            {
                responseProcess = JsonConvert.DeserializeObject<Response<List<MenuApp>>>(response.Content.ReadAsStringAsync().Result);
                if (!responseProcess.Succeeded)
                {
                    responseUI.Type = "error";
                    responseUI.Message = responseProcess.Message;
                    return responseUI;
                }
            }
            else
            {
                var dato = JsonConvert.DeserializeObject<ResponseUI<MenuApp>>(response.Content.ReadAsStringAsync().Result);
                responseUI.Type = "error";
                //responseUI.Message = "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador.";
                responseUI.Message = dato.Errors.First();
                return responseUI;
            }

            var menulit = string.Empty;
            List<MenuApp> list = responseProcess.Data;

            if (list.Count > 0)
            {
                string Titulo = string.Empty;
                List<MenuApp> listFather = list.Where(x => string.IsNullOrEmpty(x.MenuFather)).OrderBy(x => x.Sort).ToList();
                menulit = menulit + "<div class='sidebar sidebar-collapse'><div class='sidebar-menu'><h3 class='TituloMenulef'> Menú Principal </h3><ul>";

                foreach (var item1 in listFather)
                {
                    menulit = menulit + string.Format(" <li class='item' id='{0}'><a href='#{0}' class='menu-btn'><i class='{1}'></i>{2}</a>", item1.MenuName, item1.Icon, item1.MenuName);
                    Titulo = item1.MenuId.ToString();

                    menulit = menulit + "<div class='sub-menu'>";
                    List<MenuApp> listChild = list.Where(x => x.MenuFather == item1.MenuId).ToList();
                    foreach (var item2 in listChild)
                    {
                        menulit = menulit + string.Format("<a class='{0}' title='{2}'><i class='{1}'></i>{2}</a>", item2.Action, item2.Icon, item2.MenuName);

                    }
                    menulit = menulit + "</div>";
                    menulit = menulit + "</li>";

                }
                menulit = menulit + "</ul></div></div>";
            }
            responseUI.Obj = menulit;
            return responseUI;
        }

        //lista de todo el menu
        public async Task<List<MenuApp>> MenuGeneral()
        {

            List<MenuApp> menuApps = new List<MenuApp>();
            Response<List<MenuApp>> responseProcess = null;

            string urlData = urlsServices.GetUrl("Roles");

            var response = await ServiceConnect.connectservice(Token, urlData, string.Empty, HttpMethod.Get);

            if (response.IsSuccessStatusCode)
            {
                responseProcess = JsonConvert.DeserializeObject<Response<List<MenuApp>>>(response.Content.ReadAsStringAsync().Result);
                if (responseProcess.Succeeded)
                {
                    menuApps = responseProcess.Data;
                }
            }

            return menuApps;
        }

        //Asignar menu a un  usuario
        public async Task<ResponseUI> PostDataAsync(List<MenuAssignedToUser> _model)
        {
            Response<object> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("MenuAssigned");

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

        //menu asignado a un usuario
        public async Task<List<MenuAssignedToUser>> MenuAssignedToUser(string _alias)
        {
            List<MenuAssignedToUser> menuAssignedToUser = new List<MenuAssignedToUser>();
            ResponseUI responseUI = new ResponseUI();
            string urlData = $"{urlsServices.GetUrl("MenuAssigned")}/{_alias}";
            var Api = await ServiceConnect.connectservice(Token, urlData, string.Empty, HttpMethod.Get);
            if (Api.IsSuccessStatusCode)
            {
                var responseProcess = JsonConvert.DeserializeObject<Response<List<MenuAssignedToUser>>>(Api.Content.ReadAsStringAsync().Result);
                menuAssignedToUser = responseProcess.Data;

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

            return menuAssignedToUser;
        }

        //eliminar roles asignadas a un usuario
        public async Task<ResponseUI> DeleteDataAsyncFromUser(List<string> Obj, string Alias)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("MenuAssigned")}/{Alias}";

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

    }
}
