/// <summary>
/// Servicio para la gestión de catálogos.
/// Administra los catálogos generales utilizados en el sistema.
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
    /// Servicio de proceso para ProcessCatalog.
    /// </summary>
    public class ProcessCatalog: ServiceBase
    {
        public ProcessCatalog(string _token)
        {
            Token = _token;
        }

        //Lista de nivel de educación
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EducationLevel>> GetAllDataEducationlevels()
        {
            List<EducationLevel> educationLevel = new List<EducationLevel>();

            string urlData = $"{urlsServices.urlBaseOne}educationlevels";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EducationLevel>>>(Api.Content.ReadAsStringAsync().Result);
                educationLevel = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return educationLevel;
        }

        //Lista de ocupación
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Occupation>> GetAllDataOccupations()
        {
            List<Occupation> occupation = new List<Occupation>();

            string urlData = $"{urlsServices.urlBaseOne}occupations";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Occupation>>>(Api.Content.ReadAsStringAsync().Result);
                occupation = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return occupation;
        }

        //Lista de Tipo de discapacidad
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<DisabilityType>> GetAllDataDisabilitytypes()
        {
            List<DisabilityType> disabilityType = new List<DisabilityType>();

            string urlData = $"{urlsServices.urlBaseOne}disabilitytypes";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<DisabilityType>>>(Api.Content.ReadAsStringAsync().Result);
                disabilityType = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return disabilityType;
        }
    }
}
