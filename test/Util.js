import {expect} from 'chai';
import {firstDefined, closestAbove} from '../src/Util';

describe('Util', () => {
  describe('firstDefined', () => {
    it("should return the first argument that is defined", function () {

      expect(firstDefined(1,2)).to.equal(1);
      expect(firstDefined(0,1,2)).to.equal(0);
      expect(firstDefined(undefined,1,2)).to.equal(1);
      expect(firstDefined(undefined,undefined,2)).to.equal(2);
      expect(firstDefined(undefined,undefined,undefined)).to.equal(undefined);
      expect(firstDefined(undefined,undefined,null)).to.equal(null);
      expect(firstDefined('1','2')).to.equal('1');
      expect(firstDefined('0','1','2')).to.equal('0');
      expect(firstDefined(undefined,'1','2')).to.equal('1');
      expect(firstDefined(undefined,undefined,'2')).to.equal('2');
      expect(firstDefined(undefined,'undefined',undefined)).to.equal('undefined');
      expect(firstDefined(undefined,undefined,'null')).to.equal('null');
    });
  });
  describe('closestAbove()', () => {
    it('should return the first item in list that is greater or equal to the given value', () => {
      expect(closestAbove([1,10,100], 5)).to.equal(10);
      expect(closestAbove([1,10,100], undefined)).to.equal(100);
      expect(closestAbove([1,10,100], 500)).to.equal(100);
      expect(closestAbove([100,10,1], 5)).to.equal(100);
      expect(closestAbove([], 5)).to.equal(undefined);
    })
  });
});