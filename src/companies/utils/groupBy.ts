export default function groupBy<T, K extends keyof T>(
  arr: T[],
  key: K,
): Record<string, T[]> {
  return arr.reduce(
    (acc, curr) => {
      const group = curr[key] as string;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(curr);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}
