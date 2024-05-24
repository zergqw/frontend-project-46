
const forString = (value, depth = 1) => {
    if (typeof(value) !== 'object' || value === null) {
      return `${value}`;
    }
    const indent = ' '.repeat(depth * 4);
    const entries = Object.entries(value).map(([key, val]) => `${indent}${key}: ${forString(val, depth + 1)}`);
    return `{\n${entries.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
  };
  
  const stylish = (tree) => {
    const iter = (node, depth) => {
      const indent = ' '.repeat(depth * 4);
      const lines = node.map((n) => {
        switch (n.type) {
          case 'Onlyfile1':
            return `${indent}+ ${n.key}: ${forString(n.value, depth + 1)}`;
          case 'Onlyfile2':
            return `${indent}- ${n.key}: ${forString(n.value, depth + 1)}`;
          case 'changed':
            return [
              `${indent}- ${n.key}: ${forString(n.oldValue, depth + 1)}`,
              `${indent}+ ${n.key}: ${forString(n.newValue, depth + 1)}`,
            ].join('\n');
          case 'equivalent':
            return `${indent}  ${n.key}: ${forString(n.value, depth + 1)}`;
          case 'nested':
            return `${indent}  ${n.key}: ${iter(n.children, depth + 1)}`;
        }
      });
      return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
    };
    return iter(tree, 1);
  };

module.exports = {stylish}