import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    { id: "e1",
      description: "Gasoline",
      amount: 45.32,
      date: new Date('2021-12-19')
     },
     {
      id: "e2",
      description: "A pair of shoes",
      amount: 55.32,
      date: new Date('2021-12-19')
     },
     {
      id: "e3",
      description: "A pair of shoes",
      amount: 49.32,
      date: new Date('2021-12-19')
     },
     {
      id: "e4",
      description: "A pair of trouser",
      amount: 76.32,
      date: new Date('2021-12-19')
     }
  ]

export const ExpensesContext = createContext({
    expenses : [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.playload, id: id}, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense)=> expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [ ...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    } 
}

function ExpensesContextProvider({ children }){
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    
    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id){
        dispatch({type:'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: { id: id, data: expenseData } });
    }
    
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,

    };

    return (<ExpensesContext.Provider value={value}>
        {children}
        </ExpensesContext.Provider>
        );

}


export default ExpensesContextProvider;