import { keys, isNil, reduce, isEmpty } from "ramda";

export default (obj: Record<string, unknown>): Record<string, unknown> =>
  reduce(
    (acc, item) => {
      if (isNil(obj[item]) || isEmpty(obj[item])) {
        return acc;
      }
      return { ...acc, [item]: obj[item] };
    },
    {},
    keys(obj)
  );
