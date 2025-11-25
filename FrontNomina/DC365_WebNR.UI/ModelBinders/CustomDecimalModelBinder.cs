using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.ModelBinders
{
    public class CustomDecimalModelBinder : IModelBinderProvider
    {
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
