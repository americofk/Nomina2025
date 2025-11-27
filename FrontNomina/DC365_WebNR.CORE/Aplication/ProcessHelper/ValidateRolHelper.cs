/// <summary>
/// Helper para validación de roles y permisos.
/// Procesa respuestas HTTP para validar autorización y permisos de usuario.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    /// <summary>
    /// Clase auxiliar para ValidateRol.
    /// </summary>
    public static class ValidateRolHelper<T>
    {
        /// <summary>
        /// Valida los datos.
        /// </summary>
        /// <param name="api">Parametro api.</param>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
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
