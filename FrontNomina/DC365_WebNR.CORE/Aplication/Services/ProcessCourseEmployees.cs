/// <summary>
/// Servicio para la gestión de empleados en cursos.
/// Administra la asignación y seguimiento de empleados inscritos en cursos de capacitación.
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
    /// Servicio de proceso para ProcessCourseEmployees.
    /// </summary>
    public class ProcessCourseEmployees: ServiceBase
    {
        private const string Endpoint = "courseemployees";

        public ProcessCourseEmployees(string _token)
        {
            Token = _token;
        }

        //lista
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="courseid">Parametro courseid.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<CourseEmployees>> GetAllDataAsync(string courseid, int _PageNumber = 1)
        {
            List<CourseEmployees> _model = new List<CourseEmployees>();
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{courseid}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CourseEmployees>>>(Api.Content.ReadAsStringAsync().Result);
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
        public async Task<ResponseUI> PostDataAsync(CourseEmployees _model)
        {
            Response<CourseEmployees> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<CourseEmployees>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <param name="CourseId">Parametro CourseId.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string CourseId, CourseEmployees _model)
        {
            ResponseUI responseUI = new ResponseUI();


            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{CourseId}";

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

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="courseid">Parametro courseid.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="courseid">Parametro courseid.</param>
        /// <param name="internalId">Parametro internalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<CourseEmployees> GetDataAsync(string courseid, string internalId)
        {
            CourseEmployees _model = new CourseEmployees();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{courseid}/{internalId}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<CourseEmployees>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }
    }
}
