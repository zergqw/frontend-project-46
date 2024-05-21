/* eslint-disable no-undef */
const {genDiff} = require('../parsers');


test('test JSON', () => {
    expect(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json')).toStrictEqual(genDiff('file1.json',  'file2.json'));
    expect(genDiff('file1.json',  'file2.json')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json'));
}); 
test('test YAML', () => {
    expect(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml')).toStrictEqual(genDiff('file1.yaml',  'file2.yaml'));
    expect(genDiff('file1.yaml',  'file2.yaml')).toStrictEqual(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml'));
}); 
test('test JSON % YAML', () => {
    expect(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml')).toStrictEqual(genDiff('file1.json',  'file2.yaml'));
    expect(genDiff('file1.json',  'file2.yaml')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml'));
}); 
