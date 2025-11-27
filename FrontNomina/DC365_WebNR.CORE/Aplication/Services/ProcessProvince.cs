/// <summary>
/// Servicio para la gestión de provincias.
/// Administra el catálogo de provincias o estados utilizados en el sistema.
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
    /// Servicio de proceso para ProcessProvince.
    /// </summary>
    public class ProcessProvince: ServiceBase
    {
        public ProcessProvince(string _token)
        {
            Token = _token;
        }

        //lista de paises
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Province>> GetAllDataAsync(int _PageNumber = 1)
        {
            List<Province> _model = new List<Province>();


            string urlData = $"{urlsServices.urlBaseOne}provinces?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Province>>>(Api.Content.ReadAsStringAsync().Result);
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
    }
}
