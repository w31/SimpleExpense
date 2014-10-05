using System.Collections.Generic;

namespace SimpleExpense.API.Contracts
{
    public class MonthExpense
    {
        public int Month { get; set; }
        public IList<CategoryExpense> CategoryExpenses { get; set; }
    }
}
