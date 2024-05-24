
const forString = (value) => {
    switch (typeof(value)) {
        case 'object':
          return value == null ? value : '[complex value]';
        case 'string':
          return `'${value}'`;
        default:
          return value;
      }
  };
  
  const plain = (tree) => {
    const iter = (node, path) => {
      const lines = node.map((n) => {
        
        const indent = `${path}${n.key}`;
        switch (n.type) {
          case 'Onlyfile1':
            return `Property ${n.key} was added with value: ${forString(n.value)}`;
          case 'Onlyfile2':
            return `Property ${n.key} was removed`;
          case 'changed':
            return `Property '${path}${n.key}' was updated. From ${forString(n.oldValue)} to ${forString(n.newValue)}`;
          case 'nested':
            return iter(n.children, `${indent}.`);
          default:
            return null
        }
      });
      return lines.filter((item) => item != null).join('\n');

    };
    return iter(tree, '');
  };

module.exports = {plain}