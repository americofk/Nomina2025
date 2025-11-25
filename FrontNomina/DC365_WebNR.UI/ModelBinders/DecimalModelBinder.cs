using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.ModelBinders
{
    public class DecimalModelBinder : IModelBinder
    {
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
