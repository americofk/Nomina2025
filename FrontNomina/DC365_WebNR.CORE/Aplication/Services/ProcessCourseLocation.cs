/// <summary>
/// Servicio para la gestión de ubicaciones de cursos.
/// Administra las ubicaciones donde se imparten los cursos de capacitación.
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
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessCourseLocation.
    /// </summary>
    public class ProcessCourseLocation: ServiceBase
    {
        public ProcessCourseLocation(string _token)
        {
            Token = _token;

        }

        //Seleccionar todos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<CourseLocation>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<CourseLocation> courseType = new List<CourseLocation>();


            //string urlData = $"{urlsServices.GetUrl("CourseLocation")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("CourseLocation")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CourseLocation>>>(Api.Content.ReadAsStringAsync().Result);
                courseType = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return courseType;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(CourseLocation _model)
        {
            Response<CourseLocation> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("CourseLocation");


            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<CourseLocation>>(Api.Content.ReadAsStringAsync().Result);
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

        //editar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, CourseLocation _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("CourseLocation")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);

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
                responseUI.Type = "error";
                responseUI.Errors = new List<string>() { "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador." };
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

            string urlData = urlsServices.GetUrl("CourseLocation");

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
                    responseUI.Message = DataApi.Message;
                responseUI.Type = "success";
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

        //seleccionar una ubicacion de curso
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<CourseLocation> Getbyid(string id)
        {
            CourseLocation _model = new CourseLocation();


            string urlData = $"{urlsServices.GetUrl("CourseLocation")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<CourseLocation>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }
    }
}
