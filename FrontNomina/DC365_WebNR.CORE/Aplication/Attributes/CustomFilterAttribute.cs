using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Attributes
{
    public class CustomFilterAttribute: Attribute
    {
        public string PropertyName;

        public CustomFilterAttribute(string _propertyName)
        {
            this.PropertyName = _propertyName;
        }
    }
}
