using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using SimpleExpense.API.Contracts;
using SimpleExpense.API.DataAccess;
using SimpleExpense.API.Models;

namespace SimpleExpense.API.Controllers
{
    public class ExpenseController : ApiController
    {
        private ExpenseContext db;

        public ExpenseController(ExpenseContext context)
        {
            db = context;
        }

        // GET: api/Expense
        public IQueryable<ExpenseItem> GetExpenses()
        {
            return db.Expenses;
        }

        // GET: api/Expense/5
        [ResponseType(typeof(ExpenseItem))]
        public IHttpActionResult GetExpenseItem(int id)
        {
            ExpenseItem expenseItem = db.Expenses.Find(id);
            if (expenseItem == null)
            {
                return NotFound();
            }

            return Ok(expenseItem);
        }

        // PUT: api/Expense/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExpenseItem(int id, ExpenseItem expenseItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != expenseItem.ID)
            {
                return BadRequest();
            }

            db.Entry(expenseItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Expense
        [ResponseType(typeof(ExpenseItem))]
        public IHttpActionResult PostExpenseItem(ExpenseItem expenseItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Expenses.Add(expenseItem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = expenseItem.ID }, expenseItem);
        }

        // DELETE: api/Expense/5
        [ResponseType(typeof(ExpenseItem))]
        public IHttpActionResult DeleteExpenseItem(int id)
        {
            ExpenseItem expenseItem = db.Expenses.Find(id);
            if (expenseItem == null)
            {
                return NotFound();
            }

            db.Expenses.Remove(expenseItem);
            db.SaveChanges();

            return Ok(expenseItem);
        }

        [Route("api/expense/bycategory")]
        public IEnumerable<CategoryExpense> GetExpensesByCategory()
        {
            var expenses = db.Expenses.Where(p => p.Date.Year == DateTime.Today.Year);

            var response = expenses.GroupBy(p => p.CategoryID)
                .Select(grouping =>
                    new CategoryExpense {CategoryID = grouping.Key, Amount = grouping.Sum(item => item.Amount)});

            return response;
        }

        [Route("api/expense/bymonth")]
        public ExpensesByCategoryAndMonthResponse GetExpensesByCategoryAndMonth()
        {
            var response = new ExpensesByCategoryAndMonthResponse();

            var expenses = db.Expenses.Where(p => p.Date.Year == DateTime.Today.Year).OrderBy(p => p.Date).ToArray();

            response.Months = GetYearToDate();

            var availableCategories = expenses.Select(p => p.CategoryID).Distinct().OrderBy(p => p);

            var categoryMonthlyExpenses = new Dictionary<int, Dictionary<string, decimal>>();

            foreach (var cat in availableCategories)
            {
                categoryMonthlyExpenses.Add(cat, new Dictionary<string, decimal>());
                foreach (var mth in response.Months)
                {
                    var amount = expenses
                        .Where(p => p.CategoryID == cat && p.Date.ToString("MMM") == mth)
                        .Sum(p => p.Amount);
                    categoryMonthlyExpenses[cat].Add(mth, amount);
                }
            }

            response.Categories = categoryMonthlyExpenses.Select(p => new CategoryMonthExpenses
            {
                CategoryID = p.Key,
                MonthlyAmount = p.Value.Values.ToArray()
            }).ToArray();

            return response;
        }

        private static IList<string> GetYearToDate()
        {
            var months = new List<string>();

            var month = new DateTime(DateTime.Today.Year, 1, 1);
            for (var i = 0; i < DateTime.Today.Month; i++)
            {
                months.Add(month.ToString("MMM"));
                month = month.AddMonths(1);
            }

            return months;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExpenseItemExists(int id)
        {
            return db.Expenses.Count(e => e.ID == id) > 0;
        }
    }
}