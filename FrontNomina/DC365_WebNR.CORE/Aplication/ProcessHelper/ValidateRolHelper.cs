using DC365_WebNR.CORE.Domain.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;

namespace DC365_WebNR.CORE.Aplication.ProcessHelper
{
    public static class ValidateRolHelper<T>
    {
        public static List<T> validate(HttpResponseMessage api, T model)
        {
            if (api.StatusCode != HttpStatusCode.ServiceUnavailable)
            {
                if (api.StatusCode == HttpStatusCode.Unauthorized)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(api.Content.ReadAsStringAsync().Result);
                    string error =  resulError.Errors.First();

                    var property = model.GetType().GetProperties().Where(x => x.Name == "Error").FirstOrDefault();

                    if(property != null)
                    {
                        property.SetValue(model, error);
                    }

                    var list = new List<T>();
                    list.Add(model);

                    return list;
                }
            }

            return null;
        }
    }
}
