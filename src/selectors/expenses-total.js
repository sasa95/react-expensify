export default expenses => {
  return expenses.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
};
