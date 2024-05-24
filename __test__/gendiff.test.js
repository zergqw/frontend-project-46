/* eslint-disable no-undef */
const {genDiff} = require('../parsers');


test('test JSON', () => {
    expect(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json')).toStrictEqual(genDiff('file1.json',  'file2.json'));
    expect(genDiff('file1.json',  'file2.json')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json'))
    expect(genDiff('file1.json',  'file2.json', 'parse')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json', 'parse'));
    expect(genDiff('file1.json',  'file2.json', 'json')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json', 'json'));
}); 
test('test YAML', () => {
    expect(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml')).toStrictEqual(genDiff('file1.yaml',  'file2.yaml'));
    expect(genDiff('file1.yaml',  'file2.yaml')).toStrictEqual(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml'));
    expect(genDiff('file1.yaml',  'file2.yaml', 'parse')).toStrictEqual(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml', 'parse'));
    expect(genDiff('file1.yaml',  'file2.yaml', 'json')).toStrictEqual(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml', 'json'));
}); 
test('test JSON % YAML', () => {
    expect(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml')).toStrictEqual(genDiff('file1.json',  'file2.yaml'));
    expect(genDiff('file1.json',  'file2.yaml')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml'));
    expect(genDiff('file1.json',  'file2.yaml', 'parse')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml', 'parse'));
    expect(genDiff('file1.json',  'file2.yaml', 'json')).toStrictEqual(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml', 'json'));
}); 
