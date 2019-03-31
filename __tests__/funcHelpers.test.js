import { getId, delFromObj } from '../src/scripts/helpers';

describe('check getId random id generator func', () => {
    it('should generate number greater than 0', () => {
        const id = getId();
        expect(id).toBeGreaterThan(0);
    });
    it('should generate unique id number', () => {
        const firstId = getId();
        const secondId = getId();

        expect(firstId).not.toEqual(secondId);
    });
});
describe('check delFromObj deleting prop from object', () => {
    it('should delete correct field from object', () => {
        const testObj = {
            fieldOne: 'first field',
            fieldTwo: 'second field',
        };
        const testProp = 'fieldTwo';

        const result = delFromObj(testObj, testProp);

        expect(result).toEqual({
            fieldOne: 'first field',
        });
    });
});
