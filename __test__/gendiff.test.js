/* eslint-disable no-undef */
const {genDiff} = require('../parsers');

test('test', () => {
    const expected = ["- follow: false", "  host: hexlet.io", "- proxy: 123.234.53.22", "- timeout: 50", "+ timeout: 20", "+ verbose: true"]
    expect(genDiff('./file1.json',  './file2.json')).toStrictEqual(expected);
    expect(genDiff('file1.json',  'file2.json')).toStrictEqual(expected);
}); 