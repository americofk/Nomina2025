/// <summary>
/// Servicio para la gestión de proyectos.
/// Administra los proyectos y su información en el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
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
    /// <summary>
    /// Servicio de proceso para ProcessProject.
    /// </summary>
    public class ProcessProject : ServiceBase
    {
        public ProcessProject(string _token)
        {
            Token = _token;
        }


        //Lista
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Project>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1,int PageSize=20)
        {
            List<Project> _model = new List<Project>();

            string urlData = $"{urlsServices.GetUrl("ProjectsEnabled")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Project>>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(Project _model)
        {
            Response<Project> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("ProjectsEnabled");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {                
                DataApi = JsonConvert.DeserializeObject<Response<Project>>(Api.Content.ReadAsStringAsync().Result);                
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
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="_id">Parametro _id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string _id, Project _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("ProjectsEnabled")}/{_id}";

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
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("ProjectsEnabled")}";

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

        //buscar por id 
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_projid">Parametro _projid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Project> GetDataAsync(string _projid)
        {
            Project _model = new Project();

            string urlData = $"{urlsServices.GetUrl("ProjectsEnabled")}/{_projid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<Project>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

        //Inhabilitar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatus(string id)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("ProjectsEnabled")}/updatestatus/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Put);

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
