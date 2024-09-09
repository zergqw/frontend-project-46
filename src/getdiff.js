import _ from 'lodash';

const getDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const uniq = _.uniq([...keys1, ...keys2]);
  const keys = _.sortBy(uniq);
  return keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: getDiffTree(obj1[key], obj2[key]),
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return {
          key,
          type: 'unchanged',
          value: obj1[key],
        };
      }
      return {
        key,
        type: 'changed',
        value1: obj1[key],
        value2: obj2[key],
      };
    }
    return {
      key,
      type: 'added',
      value: obj2[key],
    };
  });
};

export default getDiffTree;
