/// <summary>
/// Servicio para la gestión de registros de auditoría.
/// Contiene la lógica de negocio para consultas de auditoría ISO 27001.
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
    /// Servicio de proceso para consulta de registros de auditoría.
    /// </summary>
    public class ProcessAuditLog : ServiceBase
    {
        public ProcessAuditLog(string _token)
        {
            Token = _token;
        }

        /// <summary>
        /// Obtiene todos los registros de auditoría paginados.
        /// </summary>
        /// <param name="PropertyName">Nombre de la propiedad para filtrar.</param>
        /// <param name="PropertyValue">Valor de la propiedad para filtrar.</param>
        /// <param name="_PageNumber">Número de página.</param>
        /// <param name="PageSize">Tamaño de página.</param>
        /// <returns>Lista de registros de auditoría.</returns>
        public async Task<IEnumerable<AuditLog>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, int PageSize = 1500)
        {
            List<AuditLog> auditLogs = new List<AuditLog>();

            string urlData = $"{urlsServices.GetUrl("AuditLogs")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<AuditLog>>>(Api.Content.ReadAsStringAsync().Result);
                auditLogs = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");
                }
            }

            return auditLogs;
        }

        /// <summary>
        /// Obtiene todos los registros de auditoría paginados con el total de registros.
        /// </summary>
        /// <param name="PropertyName">Nombre de la propiedad para filtrar.</param>
        /// <param name="PropertyValue">Valor de la propiedad para filtrar.</param>
        /// <param name="pageNumber">Número de página.</param>
        /// <param name="pageSize">Tamaño de página.</param>
        /// <returns>Resultado paginado con datos y total de registros.</returns>
        public async Task<PaginatedResult<AuditLog>> GetAllDataWithTotalAsync(string PropertyName = "", string PropertyValue = "", int pageNumber = 1, int pageSize = 50)
        {
            var result = new PaginatedResult<AuditLog>();

            string urlData = $"{urlsServices.GetUrl("AuditLogs")}?PageNumber={pageNumber}&PageSize={pageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Pagination<List<AuditLog>>>(Api.Content.ReadAsStringAsync().Result);
                result.Data = response.Data;
                result.TotalRecords = response.TotalRecords;
                result.PageNumber = response.PageNumber;
                result.PageSize = response.PageSize;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");
                }
                result.Data = new List<AuditLog>();
                result.TotalRecords = 0;
            }

            return result;
        }

        /// <summary>
        /// Obtiene datos paginados para la tabla AJAX.
        /// </summary>
        public async Task<PagedResult<AuditLog>> GetAllDataPagedAsync(string PropertyName = "", string PropertyValue = "", int pageNumber = 1, int pageSize = 20)
        {
            var result = new PagedResult<AuditLog>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = new List<AuditLog>()
            };

            string urlData = $"{urlsServices.GetUrl("AuditLogs")}?PageNumber={pageNumber}&PageSize={pageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<PagedResponse<List<AuditLog>>>(Api.Content.ReadAsStringAsync().Result);
                if (response != null)
                {
                    result.Data = response.Data ?? new List<AuditLog>();
                    result.PageNumber = response.PageNumber;
                    result.PageSize = response.PageSize;
                    result.TotalRecords = response.TotalRecords;
                    result.TotalPages = response.TotalPages;
                }
            }

            return result;
        }

        /// <summary>
        /// Obtiene un registro de auditoría por su RecId.
        /// </summary>
        /// <param name="recId">Identificador único del registro.</param>
        /// <returns>Registro de auditoría.</returns>
        public async Task<AuditLog> GetByIdAsync(long recId)
        {
            AuditLog _model = new AuditLog();

            string urlData = $"{urlsServices.GetUrl("AuditLogs")}/{recId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<AuditLog>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }
    }
}
