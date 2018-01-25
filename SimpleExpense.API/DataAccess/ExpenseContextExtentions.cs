using SimpleExpense.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleExpense.API.DataAccess
{
    public static class ExpenseContextExtentions
    {
        public static void EnsureSeeded(this ExpenseContext context)
        {
            var categories = new List<Category>
            {
                new Category { Name = "Rent" },
                new Category { Name = "Utility" },
                new Category { Name = "Groceries" },
            };

            if (!context.Categories.Any())
            {
                categories.ForEach(p => context.Categories.Add(p));
                context.SaveChanges();
            }

            var expenses = new List<ExpenseItem>
            {
                new ExpenseItem
                {
                    Payee = "Everyday Mart",
                    Date = DateTime.Today,
                    Amount = 23.89m,
                    CategoryID = context.Categories.First(p => p.Name == "Groceries").ID,
                },
                new ExpenseItem
                {
                    Payee = "Green Energy",
                    Date = DateTime.Today,
                    Amount = 47.50m,
                    CategoryID = context.Categories.First(p => p.Name == "Utility").ID,
                },
            };

            if (!context.Expenses.Any())
            {
                expenses.ForEach(p => context.Expenses.Add(p));
                context.SaveChanges();
            }
        }
    }
}
