export const alphabeticSortOptions = [
  {
    label: 'Category',
    getProp: ({ category: { name } }) => name,
  },
  {
    label: 'Title',
    getProp: ({ name }) => name,
  },
].map(({ getProp, label }) => ({
  value: (item, otherItem) => getProp(item).localeCompare(getProp(otherItem)),
  label,
}));

export const ageSortOptions = [
  {
    displayName: 'Start age',
    getProp: ({ startAge, endAge }) => Math.min(startAge, endAge),
  },
  {
    displayName: 'End age',
    getProp: ({ endAge, startAge }) => Math.max(startAge, endAge),
  },
  {
    displayName: 'Duration',
    getProp: ({ endAge, startAge }) => Math.abs(endAge - startAge),
  },
].reduce(
  (list, { getProp, displayName }) => [
    ...list,
    {
      value: (item, otherItem) => getProp(item) - getProp(otherItem),
      label: `${displayName} - Low to high`,
    },
    {
      value: (item, otherItem) => getProp(otherItem) - getProp(item),
      label: `${displayName} - High to low`,
    },
  ],
  [],
);
