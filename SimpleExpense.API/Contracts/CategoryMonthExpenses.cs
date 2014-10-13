using System.Collections.Generic;

namespace SimpleExpense.API.Contracts
{
    public class CategoryMonthExpenses
    {
        public int CategoryID { get; set; }
        public IList<decimal> MonthlyAmount { get; set; }
    }
}
