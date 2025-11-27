using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Services
{
    /// <summary>
    /// Clase para gestion de TimeSpanConverter.
    /// </summary>
    public class TimeSpanConverter : JsonConverter<TimeSpan>
    {
        /// <summary>
        /// Ejecuta la operacion Read.
        /// </summary>
        /// <param name="reader">Parametro reader.</param>
        /// <param name="typeToConvert">Parametro typeToConvert.</param>
        /// <param name="options">Parametro options.</param>
        /// <returns>Resultado de la operacion.</returns>
        public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return TimeSpan.Parse(value);
        }

        /// <summary>

        /// Ejecuta la operacion Write.

        /// </summary>

        /// <param name="writer">Parametro writer.</param>

        /// <param name="value">Parametro value.</param>

        /// <param name="options">Parametro options.</param>

        public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
