using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.UI.Hubs;
using DC365_WebNR.UI.ModelBinders;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DC365_WebNR.UI
{
    /// <summary>
    /// Clase para gestion de Startup.
    /// </summary>
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>

        /// Obtiene o establece Configuration.

        /// </summary>

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="services">Parametro services.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.Name = "Payroll";
            });
            //SignalR
            services.AddSignalR();

            services.AddMvc((options) =>
            {
                options.ModelBinderProviders.Insert(0, new CustomDecimalModelBinder());
            });

            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="app">Parametro app.</param>
        /// <param name="env">Parametro env.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();
            app.UseSession();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ConfigurationHub>("/NotifyChangeCompany");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Login}/{action=Index}/{id?}");


            });
        }
    }
}
