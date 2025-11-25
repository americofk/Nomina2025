using DC365_WebNR.CORE.Aplication.Attributes;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    public static class FilterHelper<T>
    {
        public static List<SelectListItem> GetPropertyToSearch()
        {
            List<SelectListItem> dropDownList = new List<SelectListItem>();

            var properties = typeof(T).GetProperties();

            foreach (var item in properties)
            {
                var a = item.GetCustomAttributes(typeof(CustomFilterAttribute), false);

                if (a.Count() != 0)
                {
                    var b = (CustomFilterAttribute)a.First();
                    dropDownList.Add(new SelectListItem
                    {
                        Value = item.PropertyType.ToString().Substring(7,2) + $"-{item.Name}",
                        Text = b.PropertyName
                    });                    
                }
            }

            return dropDownList;
        }

    }
}
