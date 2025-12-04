/// <summary>
/// Servicio para la gestión de tipos de cursos.
/// Administra las categorías y clasificaciones de cursos de capacitación.
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
    /// Servicio de proceso para ProcessCourseType.
    /// </summary>
    public class ProcessCourseType:ServiceBase
    {
        public ProcessCourseType( string _token)
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
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<CourseType>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1,int PageSize=1500)
        {
            List<CourseType> courseType = new List<CourseType>();


            //string urlData = $"{urlsServices.GetUrl("Coursetypes")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("Coursetypes")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CourseType>>>(Api.Content.ReadAsStringAsync().Result);
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

        /// <summary>
        /// Obtiene tipos de cursos paginados con total de registros.
        /// </summary>
        public async Task<PagedResult<CourseType>> GetAllDataPagedAsync(string PropertyName = "", string PropertyValue = "", int pageNumber = 1, int pageSize = 20)
        {
            var result = new PagedResult<CourseType>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = new List<CourseType>()
            };

            string urlData = $"{urlsServices.GetUrl("Coursetypes")}?PageNumber={pageNumber}&PageSize={pageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<PagedResponse<List<CourseType>>>(Api.Content.ReadAsStringAsync().Result);
                if (response != null)
                {
                    result.Data = response.Data ?? new List<CourseType>();
                    result.PageNumber = response.PageNumber;
                    result.PageSize = response.PageSize;
                    result.TotalRecords = response.TotalRecords;
                    result.TotalPages = response.TotalPages;
                }
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");
                }
            }

            return result;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(CourseType _model)
        {
            Response<CourseType> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Coursetypes");
           

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<CourseType>>(Api.Content.ReadAsStringAsync().Result);
                
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                // Devolver el ID del registro creado para cambiar a modo edicion
                responseUI.IdType = DataApi.Data?.CourseTypeId;
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
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, CourseType _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Coursetypes")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);

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

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Coursetypes");

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

        //seleccionar un tipo de curso
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<CourseType> Getbyid(string id)
        {
            CourseType _model = new CourseType();

            string urlData = $"{urlsServices.GetUrl("Coursetypes")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<CourseType>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

    }
}
