/// <summary>
/// Controlador API para gestión de WeatherForecast.
/// Endpoint base: api/weatherforecast
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v1
{
    [ApiController]
    [Route("[controller]")]
    /// <summary>
    /// Controlador para gestion de WeatherForecast.
    /// </summary>
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
