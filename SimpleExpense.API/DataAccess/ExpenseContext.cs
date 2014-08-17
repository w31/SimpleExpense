using SimpleExpense.API.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace SimpleExpense.API.DataAccess
{
    public class ExpenseContext : DbContext
    {
        public ExpenseContext()
            : base("ExpenseConnection")
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ExpenseItem> Expenses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}