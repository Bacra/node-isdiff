const { isdiff } = require('../');
const expect = require('expect.js');

describe('#base', () => {
  it('#basetype', () => {
    expect(isdiff(1, 1)).to.be(true);
    expect(isdiff('abc', 'abc')).to.be(true);
    expect(isdiff(true, true)).to.be(true);
    expect(isdiff(null, null)).to.be(true);
    expect(isdiff(undefined, undefined)).to.be(true);

    expect(isdiff(null, undefined)).to.be(false);
    expect(isdiff(null, NaN)).to.be(false);
    expect(isdiff(undefined, NaN)).to.be(false);
    expect(isdiff(NaN, NaN)).to.be(false);
    expect(isdiff(NaN, 0)).to.be(false);
  });

  it('#object', () => {
    expect(isdiff({}, {})).to.be(true);
    expect(isdiff(
      { a: 1, b: 'b', c: { d: 1 } },
      { a: 1, b: 'b', c: { d: 1 } }
    )).to.be(true);

    expect(isdiff({}, [])).to.be(false);
    expect(isdiff({}, undefined)).to.be(false);
    expect(isdiff({}, null)).to.be(false);

    expect(isdiff(
      { a: 1, b: 'b', c: { d: 1 } },
      { a: 1, b: 'b' }
    )).to.be(false);

    expect(isdiff(
      { a: 1, b: 'b' },
      { a: 1, b: 'b', c: { d: 1 } }
    )).to.be(false);


    // 不支持symbol的对比
    const symbol = Symbol('abc');
    expect(isdiff({ [symbol]: 1 }, { [symbol]: 2 })).to.be(true);
    expect(isdiff({}, { [symbol]: 1 })).to.be(true);
    expect(isdiff(
      Object.defineProperty({}, symbol, { enumerable: true, value: 1 }),
      Object.defineProperty({}, symbol, { enumerable: true, value: 2 })
    )).to.be(true);
  });

  it('#array', () => {
    expect(isdiff([], [])).to.be(true);
    expect(isdiff([1, {}], [1, {}])).to.be(true);
    expect(isdiff([, 2], [, 2])).to.be(true);
    expect(isdiff([, 2], [undefined, 2])).to.be(true);

    expect(isdiff([1, 2], [1])).to.be(false);
    expect(isdiff([1], [1, 2])).to.be(false);

    expect(isdiff([, 2], [1, 2])).to.be(false);
  });

  it('#function', () => {
    expect(isdiff(function() {}, function() {})).to.be(false);

    const func = function() {}
    expect(isdiff(func, func)).to.be(true);
  });

  it('#cycle', () => {
    const obj1 = {};
    const obj2 = {};

    obj1.a = obj1;
    obj2.a = obj2;

    expect(isdiff(obj1, obj2)).to.be(false);
    expect(isdiff(obj1, { a: { a: { a: {} }}})).to.be(false);
    expect(isdiff({ a: { a: { a: {} }}}, obj1)).to.be(false);
    expect(isdiff({ a: obj1 }, obj1)).to.be(true);
  });
});
