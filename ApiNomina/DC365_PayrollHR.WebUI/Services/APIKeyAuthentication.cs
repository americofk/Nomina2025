using DC365_PayrollHR.Core.Application.CommandsAndQueries.LicenseValidations;
using DC365_PayrollHR.Core.Application.Common.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Services
{
    /// <summary>
    /// Clase para gestion de APIKeyAuthentication.
    /// </summary>
    public static class APIKeyAuthentication
    {
        /// <summary>
        /// Ejecuta la operacion UseAPIKeyAuthentication.
        /// </summary>
        /// <param name="app">Parametro app.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static IApplicationBuilder UseAPIKeyAuthentication(this IApplicationBuilder app)
        {
            app.UseMiddleware<APIKeyAuthenticationMiddleware>();
            return app;
        }

    }

    /// <summary>

    /// Middleware para APIKeyAuthentication.

    /// </summary>

    public class APIKeyAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _Configuration;

        public APIKeyAuthenticationMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _Configuration = configuration;
        }

        /// <summary>

        /// Ejecuta la operacion InvokeAsync.

        /// </summary>

        /// <param name="context">Parametro context.</param>

        public async Task InvokeAsync(HttpContext context)
        {
            var currentKey = _Configuration["AppSettings:Secret-Config"];

            if (context.Request.Path.StartsWithSegments("/api/v2.0/config"))
            {
                if (context.Request.Query.TryGetValue("apikeyvalue", out StringValues receivedkey))
                {
                    if (receivedkey.First().Equals(currentKey))
                        await _next(context);
                    else
                    {
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new Response<string>()
                        {
                            Succeeded = false,
                            StatusHttp = (int)HttpStatusCode.Unauthorized,
                            Errors = new List<string>() { "User not authorizate!" }
                        }));
                    }
                }
                else
                {
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new Response<string>()
                    {
                        Succeeded = false,
                        StatusHttp = (int)HttpStatusCode.Unauthorized,
                        Errors = new List<string>() { "User not authorizate!" }
                    }));
                }
            }
            else
            {
                await _next(context);
            }
        }
    }

  
}
