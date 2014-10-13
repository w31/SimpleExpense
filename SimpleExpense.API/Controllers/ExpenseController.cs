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
        private ExpenseContext db = new ExpenseContext();

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
            var expenses = db.Expenses;

            var response = expenses.GroupBy(p => p.CategoryID)
                .Select(grouping =>
                    new CategoryExpense {CategoryID = grouping.Key, Amount = grouping.Sum(item => item.Amount)});

            return response;
        }

        [Route("api/expense/bymonth")]
        public ExpensesByCategoryAndMonthResponse GetExpensesByCategoryAndMonth()
        {
            var response = new ExpensesByCategoryAndMonthResponse();

            var expenses = db.Expenses.OrderBy(p => p.Date).ToArray();

            response.Months = expenses.Select(p => p.Date.Month.ToString()).Distinct().ToArray();

            var categoryMonthlyExpenses = new Dictionary<int, Dictionary<int, decimal>>();

            foreach (var item in expenses)
            {
                if (!categoryMonthlyExpenses.ContainsKey(item.CategoryID))
                {
                    categoryMonthlyExpenses.Add(item.CategoryID, new Dictionary<int, decimal>());
                }

                if (!categoryMonthlyExpenses[item.CategoryID].ContainsKey(item.Date.Month))
                {
                    categoryMonthlyExpenses[item.CategoryID].Add(item.Date.Month, 0m);
                }

                categoryMonthlyExpenses[item.CategoryID][item.Date.Month] += item.Amount;
            }

            response.Categories = categoryMonthlyExpenses.Select(p => new CategoryMonthExpenses
            {
                CategoryID = p.Key,
                MonthlyAmount = p.Value.Values.ToArray()
            }).ToArray();

            return response;
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