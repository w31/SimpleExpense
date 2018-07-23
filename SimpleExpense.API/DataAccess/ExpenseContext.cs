using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SimpleExpense.API.Models;

namespace SimpleExpense.API.DataAccess
{
    public class ExpenseContext : DbContext
    {
        public ExpenseContext(DbContextOptions<ExpenseContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ExpenseItem> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Category>().HasData(
                new Category { ID = 1, Name = "Rent" },
                new Category { ID = 2, Name = "Utility" },
                new Category { ID = 3, Name = "Groceries" }
            );

            modelBuilder.Entity<ExpenseItem>().HasData(
                new ExpenseItem
                {
                    ID = 1,
                    Payee = "Everyday Mart",
                    Date = DateTime.Today,
                    Amount = 23.89m,
                    CategoryID = 3,
                },
                new ExpenseItem
                {
                    ID = 2,
                    Payee = "Green Energy",
                    Date = DateTime.Today,
                    Amount = 47.50m,
                    CategoryID = 2,
                }
            );
        }
    }
}