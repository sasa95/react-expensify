import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import fs from '.././../firebase/firebase';

const uid = 'asdf1234';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(async done => {
  const batchDelete = fs.batch();

  const expensesRef = await fs.collection(`users/${uid}/expenses`).get();

  expensesRef.docs.forEach(expense => {
    batchDelete.delete(fs.doc(`users/${uid}/expenses/${expense.id}`));
  });

  batchDelete.commit().then();

  const batch = fs.batch();

  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    const ref = fs.collection(`users/${uid}/expenses`).doc(id);
    batch.set(ref, { description, note, amount, createdAt });
  });

  await batch.commit();

  done();
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', async done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  await store.dispatch(startAddExpense(expenseData));

  const actions = store.getActions();

  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  const expense = await fs
    .doc(`users/${uid}/expenses/${actions[0].expense.id}`)
    .get();

  expect({
    id: expense.id,
    ...expense.data()
  }).toEqual(actions[0].expense);

  done();
});

test('should add expense with defaults to database and store', async done => {
  const store = createMockStore(defaultAuthState);

  await store.dispatch(startAddExpense());

  const actions = store.getActions();

  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });

  const expense = await fs
    .doc(`users/${uid}/expenses/${actions[0].expense.id}`)
    .get();

  expect({
    id: expense.id,
    ...expense.data()
  }).toEqual(actions[0].expense);

  done();
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', async done => {
  const store = createMockStore(defaultAuthState);

  await store.dispatch(startSetExpenses());

  const actions = store.getActions();

  expect(actions[0]).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });

  done();
});

test('should remove expenses from firebase', async done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;

  await store.dispatch(startRemoveExpense(id));

  const actions = store.getActions();

  expect(actions[0]).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });

  const doc = await fs.doc(`users/${uid}/expenses/${id}`).get();

  expect(doc.exists).toBe(false);

  done();
});

test('should edit expense from firebase', async done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = {
    description: 'Bill xyz',
    note: 'Paid on time'
  };

  await store.dispatch(startEditExpense(id, updates));

  const actions = store.getActions();

  expect(actions[0]).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });

  const doc = await fs.doc(`users/${uid}/expenses/${id}`).get();

  expect({ id, ...doc.data() }).toEqual({
    ...expenses[2],
    ...updates
  });

  done();
});
