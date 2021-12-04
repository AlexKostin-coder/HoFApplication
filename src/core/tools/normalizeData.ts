export const normalizeDate = (
  data: any, // TODO типізувати
  name: string,
  byField: string = '_id',
) => {
  if (Array.isArray(data)) {
    return data.reduce(
      (acc, obj) => {
        acc[name][obj[byField]] = { ...obj };
        return acc;
      },
      {
        [name]: {},
      },
    );
  }
  return {
    [name]: { [data[byField]]: data },
  };
};