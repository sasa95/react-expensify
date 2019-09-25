import fs from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    const ref = await fs.collection(`users/${uid}/expenses`).add(expense);

    dispatch(
      addExpense({
        id: ref.id,
        ...expense
      })
    );

    return ref;
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = id => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await fs.doc(`users/${uid}/expenses/${id}`).delete();

    dispatch(removeExpense({ id }));
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    await fs.doc(`users/${uid}/expenses/${id}`).update({
      ...updates
    });

    dispatch(editExpense(id, updates));
  };
};

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const expensesRef = await fs.collection(`users/${uid}/expenses`).get();

    const expenses = expensesRef.docs.map(expense => ({
      id: expense.id,
      ...expense.data()
    }));

    dispatch(setExpenses(expenses));

    return expensesRef;
  };
};
