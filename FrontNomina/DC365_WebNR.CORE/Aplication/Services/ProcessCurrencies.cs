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
    public class ProcessCurrencies: ServiceBase
    {
        public ProcessCurrencies(string _token)
        {
            Token = _token;
        }

        //lista de direcciones de un empleado
        public async Task<IEnumerable<Currency>> GetAllDataAsync(int _PageNumber = 1)
        {
            List<Currency> _model = new List<Currency>();


            string urlData = $"{urlsServices.GetUrl("Currencies")}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Currency>>>(Api.Content.ReadAsStringAsync().Result);
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
