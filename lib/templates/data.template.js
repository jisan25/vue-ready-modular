export default ({ name, subName = null }) => `const ${subName || name}Data = [
  { id: 1, name: 'Test Name' },
  { id: 2, name: 'Test Name 2' },
  { id: 3, name: 'Test Name 3' },
  { id: 4, name: 'Test Name 4' },
  { id: 5, name: 'Test Name 5' }
]

export default ${subName || name}Data
`;
