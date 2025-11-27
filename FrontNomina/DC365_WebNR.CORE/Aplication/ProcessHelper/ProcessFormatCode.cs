/// <summary>
/// Helper para procesamiento de códigos de formato.
/// Gestiona la obtención y procesamiento de formatos de código desde la API.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.ProcessHelper
{
    /// <summary>
    /// Servicio de proceso para ProcessFormatCode.
    /// </summary>
    public class ProcessFormatCode: ServiceBase
    {
        public ProcessFormatCode(string _token)
        {
            Token = _token;
        }

        //todos los FormatCode
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<FormatCode>> GetAllDataAsync(int _PageNumber = 1)
        {
            List<FormatCode> _formatCode = new List<FormatCode>();

            string urlData =urlsServices.GetUrl("FormatCode");

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<FormatCode>>>(Api.Content.ReadAsStringAsync().Result);
                _formatCode = response.Data;
            }
           
            return _formatCode;
        }
    }
}
