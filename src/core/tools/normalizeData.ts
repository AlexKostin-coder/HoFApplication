export const normalizeDate = (
  data: any, // TODO типізувати
  name: string,
  byField: string = '_id',
) => {
  if (Array.isArray(data) && data.length) {
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
  if (Object.keys(data).length) {
    return {
      [name]: { [data[byField]]: data },
    };
  }
  return { [name]: {} };
};