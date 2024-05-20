/* eslint-disable no-undef */
const {genDiff} = require('../parsers');
test('test JSON', () => {
    const expected = ["- follow: false", "  host: hexlet.io", "- proxy: 123.234.53.22", "- timeout: 50", "+ timeout: 20", "+ verbose: true"]
    expect(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.json')).toStrictEqual(expected);
    expect(genDiff('file1.json',  'file2.json')).toStrictEqual(expected);
}); 
test('test YAML', () => {
    const expected = ["- action: attack (miss)", "- player: playerOne","+ action: attack (hit)","+ player: playerTwo",]
    expect(genDiff('./__fixtures__/file1.yaml',  './__fixtures__/file2.yaml')).toStrictEqual(expected);
    expect(genDiff('file1.yaml',  'file2.yaml')).toStrictEqual(expected);
}); 
test('test JSON % YAML', () => {
    const expected = ["- follow: false","- host: hexlet.io","- proxy: 123.234.53.22","- timeout: 50","+ action: attack (hit)","+ player: playerTwo",]
    expect(genDiff('./__fixtures__/file1.json',  './__fixtures__/file2.yaml')).toStrictEqual(expected);
    expect(genDiff('file1.json',  'file2.yaml')).toStrictEqual(expected);
}); 
