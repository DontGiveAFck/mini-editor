export const hexValidate = (value) => {
  const regex = /\b[0-9A-Fa-f]{6}\b/g;
  return regex.test(value);
};

export const numberValidate = (value) => {
  const regex = /^(\s*|\d+)$/;
  return regex.test(value);
};
