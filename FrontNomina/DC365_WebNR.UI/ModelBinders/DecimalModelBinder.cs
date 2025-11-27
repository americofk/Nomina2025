/// <summary>
/// Model binder para conversión de valores decimales con soporte multi-cultural.
/// Maneja la conversión de cadenas a decimales considerando formatos es-ES y en-US.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.ModelBinders
{
    /// <summary>
    /// Enlazador de modelos para DecimalModel.
    /// </summary>
    public class DecimalModelBinder : IModelBinder
    {
        /// <summary>
        /// Ejecuta la operacion BindModelAsync.
        /// </summary>
        /// <param name="bindingContext">Parametro bindingContext.</param>
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }

            var userCulture = bindingContext.ActionContext.HttpContext.Session.GetString("FormatCode");

            var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);

            if(valueProviderResult == null)
            {
                return Task.CompletedTask;
            }

            var toDecimalValue = valueProviderResult.FirstValue;

            if(string.IsNullOrEmpty(toDecimalValue))
                return Task.CompletedTask;

            if (userCulture.ToLower() == "es-es")
            {
                string formattedValue = toDecimalValue.Replace(".", "").Replace(",", ".");

                if (!decimal.TryParse(formattedValue, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var finishValue))
                {
                    bindingContext.ModelState.TryAddModelError(
                        bindingContext.ModelName, "Formato de monto inválido");

                    return Task.CompletedTask;
                }

                bindingContext.Result = ModelBindingResult.Success(finishValue);
                return Task.CompletedTask;
            }
            else
            {
                string formattedValue = toDecimalValue.Replace(",", "");
                if (!decimal.TryParse(formattedValue, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var finishValue))
                {
                    bindingContext.ModelState.TryAddModelError(
                        bindingContext.ModelName, "Formato de monto inválido");

                    return Task.CompletedTask;
                }

                bindingContext.Result = ModelBindingResult.Success(finishValue);
                return Task.CompletedTask;
            }

        }
    }
}
