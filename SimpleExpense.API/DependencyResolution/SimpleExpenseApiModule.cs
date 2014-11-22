using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;

namespace SimpleExpense.API.DependencyResolution
{
    public class SimpleExpenseApiModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<DataAccess.ExpenseContext>();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
        }
    }
}
