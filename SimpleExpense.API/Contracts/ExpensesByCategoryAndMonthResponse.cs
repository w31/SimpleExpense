using System.Collections.Generic;

namespace SimpleExpense.API.Contracts
{
    public class ExpensesByCategoryAndMonthResponse
    {
        public IList<string> Months { get; set; }
        public IList<CategoryMonthExpenses> Categories { get; set; }
    }
}
