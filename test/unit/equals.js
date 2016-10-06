/*
 equals.coffee

 Copyright (c) 2013-2016, Reactive Sets

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import {expect} from 'chai';
import {equals} from '../../src/Util';

describe('equals()', function () {
  describe('undefined', function () {
    it('undefined should equal undefined', function () {
      return expect(equals(void 0, void 0)).to.equal(true);
    });
    it('undefined should not equal null', function () {
      return expect(equals(void 0, null)).to.equal(false);
    });
    it('undefined should not equal 0', function () {
      return expect(equals(void 0, 0)).to.equal(false);
    });
    it('undefined should not equal ""', function () {
      return expect(equals(void 0, '')).to.equal(false);
    });
    return it('undefined should not equal false', function () {
      return expect(equals(void 0, false)).to.equal(false);
    });
  });
  describe('null', function () {
    it('null should equal null', function () {
      return expect(equals(null, null)).to.equal(true);
    });
    it('null should not equal undefined', function () {
      return expect(equals(null, void 0)).to.equal(false);
    });
    it('null should not equal 0', function () {
      return expect(equals(null, 0)).to.equal(false);
    });
    it('null should not equal ""', function () {
      return expect(equals(null, '')).to.equal(false);
    });
    return it('null should not equal false', function () {
      return expect(equals(null, false)).to.equal(false);
    });
  });
  describe('Numbers', function () {
    describe('NaN', function () {
      it('NaN should equal NaN', function () {
        return expect(equals(NaN, NaN)).to.equal(true);
      });
      it('new Number( NaN ) should equal new Number( NaN )', function () {
        return expect(equals(new Number(NaN), new Number(NaN))).to.equal(true);
      });
      it('NaN should equal new Number( NaN )', function () {
        return expect(equals(NaN, new Number(NaN))).to.equal(true);
      });
      it('NaN should not equal 0', function () {
        return expect(equals(NaN, 0)).to.equal(false);
      });
      return it('NaN should not equal undefined', function () {
        return expect(equals(NaN, void 0)).to.equal(false);
      });
    });
    describe('0 and -0', function () {
      it('0 should equal 0', function () {
        return expect(equals(0, 0)).to.equal(true);
      });
      it('0 should not equal -0', function () {
        return expect(equals(0, -0)).to.equal(false);
      });
      it('-0 should equal -0', function () {
        return expect(equals(-0, -0)).to.equal(true);
      });
      it('new Number( 0 ) should equal new Number( 0 )', function () {
        return expect(equals(new Number(0), new Number(0))).to.equal(true);
      });
      it('new Number( -0 ) should equal new Number( -0 )', function () {
        return expect(equals(new Number(-0), new Number(-0))).to.equal(true);
      });
      it('new Number( 0 ) should not equal new Number( -0 )', function () {
        return expect(equals(new Number(0), new Number(-0))).to.equal(false);
      });
      it('0 should equal new Number( 0 )', function () {
        return expect(equals(0, new Number(0))).to.equal(true);
      });
      it('0 should not equal new Number( -0 )', function () {
        return expect(equals(0, new Number(-0))).to.equal(false);
      });
      it('0 should not equal 1', function () {
        return expect(equals(0, 1)).to.equal(false);
      });
      it('0 should not equal "0"', function () {
        return expect(equals(0, "0")).to.equal(false);
      });
      it('0 should not equal ""', function () {
        return expect(equals(0, "")).to.equal(false);
      });
      return it('0 should not equal false', function () {
        return expect(equals(0, false)).to.equal(false);
      });
    });
    describe('Infinity and -Infinity', function () {
      it('Infinity should equal Infinity', function () {
        return expect(equals(Infinity, Infinity)).to.equal(true);
      });
      it('Infinity should equal new Number( Infinity )', function () {
        return expect(equals(Infinity, new Number(Infinity))).to.equal(true);
      });
      it('new Number( Infinity = should equal new Number( Infinity )', function () {
        return expect(equals(new Number(Infinity), new Number(Infinity))).to.equal(true);
      });
      it('-Infinity should equal -Infinity', function () {
        return expect(equals(-Infinity, -Infinity)).to.equal(true);
      });
      return it('-Infinity should not equal Infinity', function () {
        return expect(equals(-Infinity, Infinity)).to.equal(false);
      });
    });
    return describe('Other numbers', function () {
      it('1 should equal 1', function () {
        return expect(equals(1, 1)).to.equal(true);
      });
      it('new Number( 1 ) should equal new Number( 1 )', function () {
        return expect(equals(new Number(1), new Number(1))).to.equal(true);
      });
      it('1 should equal new Number( 1 )', function () {
        return expect(equals(1, new Number(1))).to.equal(true);
      });
      it('1 should not equal "1"', function () {
        return expect(equals(1, "1")).to.equal(false);
      });
      return it('1 should not equal true', function () {
        return expect(equals(1, true)).to.equal(false);
      });
    });
  });
  describe('Strings', function () {
    it('"" should equal ""', function () {
      return expect(equals("", "")).to.equal(true);
    });
    it('new String( "" ) should equal new String( "" )', function () {
      return expect(equals(new String(""), new String(""))).to.equal(true);
    });
    it('"" should equal new String( "" )', function () {
      return expect(equals("", new String(""))).to.equal(true);
    });
    it('"test" should equal "test"', function () {
      return expect(equals("test", "test")).to.equal(true);
    });
    it('new String( "test" ) should equal new String( "test" )', function () {
      return expect(equals(new String("test"), new String("test"))).to.equal(true);
    });
    it('"test" should equal new String( "test" )', function () {
      return expect(equals("test", new String("test"))).to.equal(true);
    });
    it('"" should not equal "test"', function () {
      return expect(equals("", "test")).to.equal(false);
    });
    return it('"test" should not equal "TEST"', function () {
      return expect(equals("test", "TEST")).to.equal(false);
    });
  });
  describe('Booleans', function () {
    it('true should equal true', function () {
      return expect(equals(true, true)).to.equal(true);
    });
    it('true should equal new Boolean( true )', function () {
      return expect(equals(true, new Boolean(true))).to.equal(true);
    });
    it('new Boolean( true ) should equal new Boolean( true )', function () {
      return expect(equals(new Boolean(true), new Boolean(true))).to.equal(true);
    });
    it('true should not equal false', function () {
      return expect(equals(true, false)).to.equal(false);
    });
    it('false should equal false', function () {
      return expect(equals(false, false)).to.equal(true);
    });
    it('false should equal new Boolean( false )', function () {
      return expect(equals(false, new Boolean(false))).to.equal(true);
    });
    it('new Boolean( false ) should equal new Boolean( false )', function () {
      return expect(equals(new Boolean(false), new Boolean(false))).to.equal(true);
    });
    it('false should not equal 0', function () {
      return expect(equals(false, 0)).to.equal(false);
    });
    it('false should not equal ""', function () {
      return expect(equals(false, '')).to.equal(false);
    });
    return it('false should not equal null', function () {
      return expect(equals(false, null)).to.equal(false);
    });
  });
  describe('Date Objects', function () {
    var a, b, c;
    a = new Date(1234567891234);
    b = new Date(1234567891234);
    c = new Date(1234567891235);
    it('two equal Dates should be equal', function () {
      return expect(equals(a, b)).to.equal(true);
    });
    it('two unequal Dates should not be equal', function () {
      return expect(equals(a, c)).to.equal(false);
    });
    return it('a Date should not equal its value', function () {
      return expect(equals(a, a.valueOf())).to.equal(false);
    });
  });
  describe('Regular Expressions', function () {
    it('/./ should equal /./', function () {
      return expect(equals(/./, /./)).to.equal(true);
    });
    it('/./ should equal new RegExp( "." )', function () {
      return expect(equals(/./, new RegExp('.'))).to.equal(true);
    });
    it('/./ should not equal /test/', function () {
      return expect(equals(/./, /test/)).to.equal(false);
    });
    it('/test/ should not equal /test/i', function () {
      return expect(equals(/test/, /test/i)).to.equal(false);
    });
    it('/test/i should not equal /test/i', function () {
      return expect(equals(/test/i, /test/i)).to.equal(true);
    });
    it('/test/ should not equal /test/g', function () {
      return expect(equals(/test/, /test/g)).to.equal(false);
    });
    it('/test/g should not equal /test/g', function () {
      return expect(equals(/test/g, /test/g)).to.equal(true);
    });
    it('/test/ should not equal /test/m', function () {
      return expect(equals(/test/, /test/m)).to.equal(false);
    });
    return it('/test/m should not equal /test/m', function () {
      return expect(equals(/test/m, /test/m)).to.equal(true);
    });
  });
  describe('Acyclic Arrays', function () {
    it('[] should equal []', function () {
      return expect(equals([], [])).to.equal(true);
    });
    it('[] should not equal [ 1 ]', function () {
      return expect(equals([], [1])).to.equal.fasle;
    });
    it('[ 2 ] should equal [ 2 ]', function () {
      return expect(equals([2], [2])).to.equal(true);
    });
    it('[ 2 ] should not equal [ 1 ]', function () {
      return expect(equals([2], [1])).to.equal(false);
    });
    it('[ 2, [] ] should equal [ 2, [] ]', function () {
      return expect(equals([2, []], [2, []])).to.equal(true);
    });
    it('[ 2, [] ] should not equal [ 2 ]', function () {
      return expect(equals([2, []], [2])).to.equal(false);
    });
    it('[ 0 ] should not equal [ -0 ]', function () {
      return expect(equals([0], [-0])).to.equal(false);
    });
    it('[ 0 ] should equal [ 0 ]', function () {
      return expect(equals([0], [0])).to.equal(true);
    });
    return it('[ 2, [] ] should not equal [ 2, [ 2 ] ]', function () {
      return expect(equals([2, []], [2, [2]])).to.equal(false);
    });
  });
  describe('Acyclic Objects', function () {
    it('{} should equal {}', function () {
      return expect(equals({}, {})).to.equal(true);
    });
    it('{ a: 1 } should equal { a: 1 }', function () {
      return expect(equals({
        a: 1
      }, {
        a: 1
      })).to.equal(true);
    });
    it('{ a: 1 } should not equal { b: 1 }', function () {
      return expect(equals({
        a: 1
      }, {
        b: 1
      })).to.equal(false);
    });
    it('{ a: 0 } should equal { a: 0 }', function () {
      return expect(equals({
        a: 0
      }, {
        a: 0
      })).to.equal(true);
    });
    it('{ a: 0 } should not equal { a: -0 }', function () {
      return expect(equals({
        a: 0
      }, {
        a: -0
      })).to.equal(false);
    });
    it('{ a: 1 } should not equal { a: 1, b: 1 }', function () {
      return expect(equals({
        a: 1
      }, {
        a: 1,
        b: 1
      })).to.equal(false);
    });
    it('{ a: 1, b: 1 } should not equal { a: 1 }', function () {
      return expect(equals({
        a: 1,
        b: 1
      }, {
        a: 1
      })).to.equal(false);
    });
    it('{ a: 1, b: 2 } should equal { a: 1, b: 2 }', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        a: 1,
        b: 2
      })).to.equal(true);
    });
    it('{ a: 1, b: 2 } should not equal { a: 1, b: 3 }', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        a: 1,
        b: 3
      })).to.equal(false);
    });
    it('{ a: 1, b: 2 } should not equal { b: 1, a: 2 }', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        b: 1,
        a: 2
      })).to.equal(false);
    });
    it('{ a: 1 } should not equal { a: 1, b: undefined }', function () {
      return expect(equals({
        a: 1
      }, {
        a: 1,
        b: void 0
      })).to.equal(false);
    });
    it('{ a: 1, b: undefined } should equal { a: 1, b: undefined }', function () {
      return expect(equals({
        a: 1,
        b: void 0
      }, {
        a: 1,
        b: void 0
      })).to.equal(true);
    });
    it('{ a: 1, b: 2 } should equal { b: 2, a: 1 } (properties order is irrelevent)', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        b: 2,
        a: 1
      })).to.equal(true);
    });
    it('{ a: 1, b: 2 } should not equal { b: 2, a: 1 } when properties order is checked', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        b: 2,
        a: 1
      }, true)).to.equal(false);
    });
    it('{ a: 1, b: 2 } should not equal { a: 1, b: 2, c: 3 } when properties order is checked', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        a: 1,
        b: 2,
        c: 3
      }, true)).to.equal(false);
    });
    it('{ a: 1, b: 2 } should not equal { a: 1, b: 2 } when properties order is checked', function () {
      return expect(equals({
        a: 1,
        b: 2
      }, {
        a: 1,
        b: 2
      }, true)).to.equal(true);
    });
    it('{ a: 1, b: {} } should equal { a: 1, b: {} }', function () {
      return expect(equals({
        a: 1,
        b: {}
      }, {
        a: 1,
        b: {}
      })).to.equal(true);
    });
    it('{ a: 1, b: { c: [ {}, 1, "" ] } } should equal { a: 1, b: { c: [ {}, 1, "" ] } }', function () {
      return expect(equals({
        a: 1,
        b: {
          c: [{}, 1, ""]
        }
      }, {
        a: 1,
        b: {
          c: [{}, 1, ""]
        }
      })).to.equal(true);
    });
    return it('{ a: 1, b: { c: [ {}, 1, "" ] } } should not equal { a: 1, b: { c: [ {}, 1, "", true ] } }',
      function () {
        return expect(equals({
          a: 1,
          b: {
            c: [{}, 1, ""]
          }
        }, {
          a: 1,
          b: {
            c: [{}, 1, "", true]
          }
        })).to.equal(false);
      });
  });
  return describe('Cyclic Arrays and Objects', function () {
    var a, a_1, a_2, a_3, b, b_1, b_2, b_3;
    a = [
      1, 2, 3, a_1 = {
        a: 1
      }, a_2 = [5, 6], a_3 = {
        test: true
      }
    ];
    b = [
      1, 2, 3, b_1 = {
        a: 1
      }, b_2 = [5, 6], b_3 = {
        test: true
      }
    ];
    it('Non-cyclic arrays with nested objects and array should be equal', function () {
      return expect(equals(a, b)).to.equal(true);
    });
    it('Adding a cycle in a should throw when comparing without option check cycles', function () {
      a[10] = a;
      return expect(equals(a, b)).to.throwException;
    });
    it('Comparing with check cycles should return false', function () {
      return expect(equals(a, b, false, true)).to.equal(false);
    });
    it('Adding a different cycle in b should compare to false', function () {
      b[10] = b_1;
      return expect(equals(a, b, false, true)).to.equal(false);
    });
    it('Adding the same cycle in b should compare to true', function () {
      b[10] = b;
      return expect(equals(a, b, false, true)).to.equal(true);
    });
    it('Adding additional cycle in nested object, different in b compare to false', function () {
      a_1.b = a;
      b_1.b = b_1;
      return expect(equals(a, b, false, true)).to.equal(false);
    });
    it('Adding the same additional cycle in nested object should compare to true', function () {
      b_1.b = b;
      return expect(equals(a, b, false, true)).to.equal(true);
    });
    it('Adding different cycles in nested Array, with similar values should compare to false', function () {
      a_2[2] = [5, 6, a_2];
      b_2[2] = b_2;
      return expect(equals(a, b, false, true)).to.equal(false);
    });
    it('Fixing cycle in nested Array, should now compare to true', function () {
      b_2[2] = [5, 6, b_2];
      return expect(equals(a, b, false, true)).to.equal(true);
    });
    it('Adding different cycles in nested Object, with similar values should compare to false', function () {
      a_3.c = {
        test: true,
        c: a_3
      };
      b_3.c = b_3;
      return expect(equals(a, b, false, true)).to.equal(false);
    });
    return it('Fixing cycle in nested Object, should now compare to true', function () {
      b_3.c = {
        test: true,
        c: b_3
      };
      return expect(equals(a, b, false, true)).to.equal(true);
    });
  });
});
