import { useContext } from 'react'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utility/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No recent expenses for last 7 days"/>
    
  
}

export default RecentExpenses;