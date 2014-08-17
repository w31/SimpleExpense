using SimpleExpense.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SimpleExpense.API.DataAccess
{
    public class ExpenseInitializer : DropCreateDatabaseIfModelChanges<ExpenseContext>
    {
        protected override void Seed(ExpenseContext context)
        {
            var categories = new List<Category>
            {
                new Category { Name = "Rent" },
                new Category { Name = "Utility" },
                new Category { Name = "Groceries" },
            };

            categories.ForEach(p => context.Categories.Add(p));
            context.SaveChanges();
        }
    }
}
