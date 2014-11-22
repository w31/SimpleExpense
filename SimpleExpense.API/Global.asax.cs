using Autofac;
using Autofac.Integration.WebApi;
using System.Web.Http;

namespace SimpleExpense.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            var builder = new ContainerBuilder();
            builder.RegisterModule(new DependencyResolution.SimpleExpenseApiModule());
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(builder.Build());
        }
    }
}
