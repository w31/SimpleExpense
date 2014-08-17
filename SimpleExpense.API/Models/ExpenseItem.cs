using System;

namespace SimpleExpense.API.Models
{
    public class ExpenseItem
    {
        public int ID { get; set; }
        public string Payee { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public int CategoryID { get; set; }

        //public virtual Category Category { get; set; }
    }
}
