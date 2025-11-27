using System;

namespace DC365_PayrollHR.WebUI
{
    /// <summary>
    /// Clase para gestion de WeatherForecast.
    /// </summary>
    public class WeatherForecast
    {
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>

        /// Valor numerico para TemperatureC.

        /// </summary>

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        /// <summary>

        /// Valor de texto para Summary.

        /// </summary>

        public string Summary { get; set; }
    }
}
