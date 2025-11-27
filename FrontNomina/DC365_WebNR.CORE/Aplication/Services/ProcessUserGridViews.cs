/// <summary>
/// Servicio para la gestión de vistas de usuario personalizadas de grids.
/// Permite operaciones CRUD sobre las configuraciones de vistas.
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
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para gestión de vistas de usuario.
    /// </summary>
    public class ProcessUserGridViews : ServiceBase
    {
        private readonly string _baseUrl;

        /// <summary>
        /// Constructor del servicio.
        /// </summary>
        /// <param name="_token">Token de autenticación Bearer.</param>
        public ProcessUserGridViews(string _token)
        {
            Token = _token;
            // URL base directa mientras se agrega a UrlsServices
            _baseUrl = $"{urlsServices.urlBaseOne}usergridviews";
        }

        /// <summary>
        /// Obtiene todas las vistas del usuario para una entidad específica.
        /// </summary>
        /// <param name="entityName">Nombre de la entidad (ej: "Department").</param>
        /// <param name="userRefRecId">RecId del usuario.</param>
        /// <returns>Lista de vistas disponibles.</returns>
        public async Task<IEnumerable<UserGridView>> GetAllByEntityAsync(string entityName, long userRefRecId)
        {
            List<UserGridView> views = new List<UserGridView>();

            string urlData = $"{_baseUrl}?entityName={entityName}&userRefRecId={userRefRecId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<UserGridView>>>(Api.Content.ReadAsStringAsync().Result);
                views = response.Data ?? new List<UserGridView>();
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");
                }
            }

            return views;
        }

        /// <summary>
        /// Obtiene una vista específica por su ID.
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <returns>Vista encontrada o null.</returns>
        public async Task<UserGridView> GetByIdAsync(long recId)
        {
            UserGridView view = null;

            string urlData = $"{_baseUrl}/{recId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                view = JsonConvert.DeserializeObject<UserGridView>(Api.Content.ReadAsStringAsync().Result);
            }

            return view;
        }

        /// <summary>
        /// Crea una nueva vista de usuario.
        /// </summary>
        /// <param name="_model">Datos de la nueva vista.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<ResponseUI<UserGridView>> PostDataAsync(UserGridView _model)
        {
            ResponseUI<UserGridView> responseUI = new ResponseUI<UserGridView>();

            string urlData = _baseUrl;

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<UserGridView>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Obj = DataApi;
                responseUI.Message = "Vista creada correctamente";
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError<UserGridView>(Api);
            }

            return responseUI;
        }

        /// <summary>
        /// Actualiza una vista existente.
        /// </summary>
        /// <param name="_model">Datos actualizados de la vista.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<ResponseUI<UserGridView>> PutDataAsync(UserGridView _model)
        {
            ResponseUI<UserGridView> responseUI = new ResponseUI<UserGridView>();

            string urlData = _baseUrl;

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<UserGridView>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Obj = DataApi;
                responseUI.Message = "Vista actualizada correctamente";
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError<UserGridView>(Api);
            }

            return responseUI;
        }

        /// <summary>
        /// Elimina una vista.
        /// </summary>
        /// <param name="recId">ID de la vista a eliminar.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<ResponseUI> DeleteDataAsync(long recId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{_baseUrl}/{recId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Delete);

            if (Api.IsSuccessStatusCode)
            {
                responseUI.Message = "Vista eliminada correctamente";
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        /// <summary>
        /// Establece una vista como predeterminada.
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<ResponseUI<UserGridView>> SetDefaultAsync(long recId)
        {
            ResponseUI<UserGridView> responseUI = new ResponseUI<UserGridView>();

            string urlData = $"{_baseUrl}/{recId}/set-default";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<UserGridView>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Obj = DataApi;
                responseUI.Message = "Vista establecida como predeterminada";
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError<UserGridView>(Api);
            }

            return responseUI;
        }

        /// <summary>
        /// Registra el uso de una vista.
        /// </summary>
        /// <param name="recId">ID de la vista.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<ResponseUI> RecordUsageAsync(long recId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{_baseUrl}/{recId}/record-usage";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                responseUI.Type = ErrorMsg.TypeOk;
            }

            return responseUI;
        }

        /// <summary>
        /// Captura errores de la API y los convierte a ResponseUI genérico.
        /// </summary>
        /// <typeparam name="T">Tipo del objeto en la respuesta.</typeparam>
        /// <param name="response">Respuesta HTTP con error.</param>
        /// <returns>ResponseUI con los errores capturados.</returns>
        private ResponseUI<T> CatchError<T>(HttpResponseMessage response)
        {
            ResponseUI<T> responseUI = new ResponseUI<T>();

            if (response.StatusCode != HttpStatusCode.ServiceUnavailable)
            {
                var resulError = JsonConvert.DeserializeObject<Response<string>>(response.Content.ReadAsStringAsync().Result);
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = resulError?.Errors ?? new List<string> { "Error desconocido" };
            }
            else
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
            }

            return responseUI;
        }
    }
}
