const { equal, equalWithoutCycle } = require('../');
const expect = require('expect.js');


function runBase(equal) {
  it('#basetype', () => {
    expect(equal(1, 1)).to.be(true);
    expect(equal('abc', 'abc')).to.be(true);
    expect(equal(true, true)).to.be(true);
    expect(equal(null, null)).to.be(true);
    expect(equal(undefined, undefined)).to.be(true);

    expect(equal(null, undefined)).to.be(false);
    expect(equal(null, NaN)).to.be(false);
    expect(equal(undefined, NaN)).to.be(false);
    expect(equal(NaN, NaN)).to.be(false);
    expect(equal(NaN, 0)).to.be(false);
  });

  it('#object', () => {
    expect(equal({}, {})).to.be(true);
    expect(equal(
      { a: 1, b: 'b', c: { d: 1 } },
      { a: 1, b: 'b', c: { d: 1 } }
    )).to.be(true);

    expect(equal({}, [])).to.be(false);
    expect(equal({}, undefined)).to.be(false);
    expect(equal({}, null)).to.be(false);

    expect(equal(
      { a: 1, b: 'b', c: { d: 1 } },
      { a: 1, b: 'b' }
    )).to.be(false);

    expect(equal(
      { a: 1, b: 'b' },
      { a: 1, b: 'b', c: { d: 1 } }
    )).to.be(false);


    // 不支持symbol的对比
    const symbol = Symbol('abc');
    expect(equal({ [symbol]: 1 }, { [symbol]: 2 })).to.be(true);
    expect(equal({}, { [symbol]: 1 })).to.be(true);
    expect(equal(
      Object.defineProperty({}, symbol, { enumerable: true, value: 1 }),
      Object.defineProperty({}, symbol, { enumerable: true, value: 2 })
    )).to.be(true);
  });

  it('#array', () => {
    expect(equal([], [])).to.be(true);
    expect(equal([1, {}], [1, {}])).to.be(true);
    expect(equal([, 2], [, 2])).to.be(true);
    expect(equal([, 2], [undefined, 2])).to.be(true);

    expect(equal([1, 2], [1])).to.be(false);
    expect(equal([1], [1, 2])).to.be(false);

    expect(equal([, 2], [1, 2])).to.be(false);
  });

  it('#function', () => {
    expect(equal(function() {}, function() {})).to.be(false);

    const func = function() {}
    expect(equal(func, func)).to.be(true);
  });
}

describe('#equal', () => {

  runBase(equal);

  it('#cycle', () => {
    const obj1 = {};
    const obj2 = {};

    obj1.a = obj1;
    obj2.a = obj2;

    expect(equal(obj1, obj2)).to.be(false);
    expect(equal(obj1, { a: { a: { a: {} }}})).to.be(false);
    expect(equal({ a: { a: { a: {} }}}, obj1)).to.be(false);
    expect(equal({ a: obj1 }, obj1)).to.be(true);
  });
});


describe('#equalWithoutCycle', () => {
  runBase(equalWithoutCycle);
});
