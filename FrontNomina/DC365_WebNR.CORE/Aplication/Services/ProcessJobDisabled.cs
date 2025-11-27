/// <summary>
/// Servicio para la gestión de trabajos inactivos.
/// Administra puestos de trabajo que han sido deshabilitados en el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    /// Servicio de proceso para ProcessJobDisabled.
    /// </summary>
    public class ProcessJobDisabled : ServiceBase
    {

        public ProcessJobDisabled(string _token)
        {
            Token = _token;
        }

        //todos los cargos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Job>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<Job> _model = new List<Job>();


            //string urlData = $"{urlsServices.GetUrl("JobsDisabled")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("JobsDisabled")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Job>>>(Api.Content.ReadAsStringAsync().Result);
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

        //guardar cargo
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(Job _model)
        {
            Response<Job> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("JobsDisabled");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var response = Api.Content.ReadAsStringAsync().Result;
                DataApi = JsonConvert.DeserializeObject<Response<Job>>(Api.Content.ReadAsStringAsync().Result);
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

        //editar cargo
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, Job _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("JobsDisabled")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);


            if (Api.IsSuccessStatusCode)
            {
                var dato = Api.Content.ReadAsStringAsync().Result;
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

        //eliminar cargo
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("JobsDisabled");

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

        //habilitar cargo
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatus(string id)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("JobsDisabled")}/updatestatus/{id}?status=true";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Put);

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

    }

}
