/// <summary>
/// Proveedor de model binder personalizado para tipos decimales.
/// Configura el enlace de modelos para valores decimales con formato personalizado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.ModelBinders
{
    /// <summary>
    /// Enlazador de modelos para CustomDecimalModel.
    /// </summary>
    public class CustomDecimalModelBinder : IModelBinderProvider
    {
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="context">Parametro context.</param>
        /// <returns>Resultado de la operacion.</returns>
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }


            if (context.Metadata.ModelType == typeof(decimal))
            {
                return new DecimalModelBinder();
            }

            return null;
        }
    }
}
