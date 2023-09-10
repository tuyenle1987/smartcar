export const parseData = (type, value): any => {
  console.log(type, value);
  if (type === 'String') {
    return String(value);
  }
  if (type === 'Boolean') {
    return Boolean(value);
  }
  if (type === 'Number') {
    return parseFloat(value);
  }

  return null;
};

export const getData = (name, data) => {
  return parseData(data[name]?.type, data[name]?.value);
};
