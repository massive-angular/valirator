import * as valirator from '../src/valirator';

describe('rules', () => {
  describe('divisibleByRule', () => {
    const { divisibleByRule } = valirator;

    it('should be divisible by 3.3', () => {
      const result = divisibleByRule(3.3, 9.9);

      expect(result).toBe(true);
    });

    it('should not be divisible by 3.3', () => {
      const result = divisibleByRule(3.3, 10);

      expect(result).toBe(false);
    });
  });

  describe('enumRule', () => {
    const { enumRule } = valirator;

    it('should be in enum', () => {
      const result = enumRule(['value1', 'value2', 'value3'], 'value1');

      expect(result).toBe(true);
    });

    it('should not be in enum', () => {
      const result = enumRule(['value1', 'value2', 'value3'], 'value4');

      expect(result).toBe(false);
    });
  });

  describe('formatRule', () => {
    const { formatRule } = valirator;

    it('should respect email format', () => {
      const result = formatRule('email', 'email@example.com');

      expect(result).toBe(true);
    });

    it('should not respect email format', () => {
      const result = formatRule('email', 'email@example@com.com');

      expect(result).toBe(false);
    });

    it('should throw error for unknown format', () => {
      expect(() => formatRule('email2', 'email@example.com')).toThrow();
    });
  });

  describe('maxRule', () => {
    const { maxRule } = valirator;

    it('should be lower or equal then 5', () => {
      const result = maxRule(5, 5);

      expect(result).toBe(true);
    });

    it('should not be lower or equal lower then 5', () => {
      const result = maxRule(5, 10);

      expect(result).toBe(false);
    });
  });

  describe('maxItemsRule', () => {
    const { maxItemsRule } = valirator;

    it('should has less or equal then 5 item', () => {
      const result = maxItemsRule(5, [1, 2, 3, 4, 5]);

      expect(result).toBe(true);
    });

    it('should not has less or equal then 5 item', () => {
      const result = maxItemsRule(5, [1, 2, 3, 4, 5, 6]);

      expect(result).toBe(false);
    });
  });

  describe('maxLengthRule', () => {
    const { maxLengthRule } = valirator;

    it('should be less or equal then 5 length string', () => {
      const result = maxLengthRule(5, '12345');

      expect(result).toBe(true);
    });

    it('should not be less or equal then 5 length string', () => {
      const result = maxLengthRule(5, '123456');

      expect(result).toBe(false);
    });
  });

  describe('exclusiveMaxRule', () => {
    const { exclusiveMaxRule } = valirator;

    it('should be lower then 5', () => {
      const result = exclusiveMaxRule(5, 1);

      expect(result).toBe(true);
    });

    it('should not be lower then 5', () => {
      const result = exclusiveMaxRule(5, 10);

      expect(result).toBe(false);
    });
  });

  describe('minRule', () => {
    const { minRule } = valirator;

    it('should be bigger or equal then 5', () => {
      const result = minRule(5, 5);

      expect(result).toBe(true);
    });

    it('should not be bigger or equal lower then 5', () => {
      const result = minRule(5, 1);

      expect(result).toBe(false);
    });
  });

  describe('minItemsRule', () => {
    const { minItemsRule } = valirator;

    it('should has more or equal then 5 item', () => {
      const result = minItemsRule(5, [1, 2, 3, 4, 5]);

      expect(result).toBe(true);
    });

    it('should not has more or equal then 5 item', () => {
      const result = minItemsRule(5, [1, 2, 3, 4]);

      expect(result).toBe(false);
    });
  });

  describe('minLengthRule', () => {
    const { minLengthRule } = valirator;

    it('should be bigger or equal then 5 length string', () => {
      const result = minLengthRule(5, '12345');

      expect(result).toBe(true);
    });

    it('should not be bigger or equal then 5 length string', () => {
      const result = minLengthRule(5, '1234');

      expect(result).toBe(false);
    });
  });

  describe('exclusiveMinRule', () => {
    const { exclusiveMinRule } = valirator;

    it('should be bigger then 5', () => {
      const result = exclusiveMinRule(5, 10);

      expect(result).toBe(true);
    });

    it('should not be bigger then 5', () => {
      const result = exclusiveMinRule(5, 1);

      expect(result).toBe(false);
    });
  });

  describe('patternRule', () => {
    const { patternRule } = valirator;

    it('should match pattern \d+', () => {
      const result = patternRule(/\d+/, '1234');

      expect(result).toBe(true);
    });

    it('should not match pattern \d+', () => {
      const result = patternRule(/\d+/, 'abc');

      expect(result).toBe(false);
    });
  });

  describe('requiredRule', () => {
    const { requiredRule } = valirator;

    it('should be required', () => {
      const result = requiredRule(true, null);

      expect(result).toBe(false);
    });

    it('should not be required', () => {
      const result = requiredRule(false, null);

      expect(result).toBe(true);
    });

    it('should allow empty', () => {
      const result = requiredRule({
        allowEmpty: true
      }, '');

      expect(result).toBe(true);
    });

    it('should not allow empty', () => {
      const result = requiredRule({
        allowEmpty: false
      }, '');

      expect(result).toBe(false);
    });

    it('should allow zero', () => {
      const result = requiredRule({
        allowZero: true
      }, 0);

      expect(result).toBe(true);
    });

    it('should not allow zero', () => {
      const result = requiredRule({
        allowZero: false
      }, 0);

      expect(result).toBe(false);
    });

    it('should pass validation', () => {
      const result = requiredRule(true, '123');

      expect(result).toBe(true);
    });
  });

  describe('typeRule', () => {
    const { typeRule } = valirator;

    it('should be boolean', () => {
      const result = typeRule('boolean', true);

      expect(result).toBe(true);
    });

    it('should not be boolean', () => {
      const result = typeRule('boolean', 0);

      expect(result).toBe(false);
    });

    it('should be number', () => {
      const result = typeRule('number', 1);

      expect(result).toBe(true);
    });

    it('should not be number', () => {
      const result = typeRule('number', '1');

      expect(result).toBe(false);
    });

    it('should be string', () => {
      const result = typeRule('string', 'abc');

      expect(result).toBe(true);
    });

    it('should not be string', () => {
      const result = typeRule('string', 123);

      expect(result).toBe(false);
    });

    it('should be date', () => {
      const result = typeRule('date', new Date());

      expect(result).toBe(true);
    });

    it('should not be date', () => {
      const result = typeRule('date', '2017-02-11');

      expect(result).toBe(false);
    });

    it('should be object', () => {
      const result = typeRule('object', { a: 1, b: 2 });

      expect(result).toBe(true);
    });

    it('should not be object', () => {
      const result = typeRule('object', new Date());

      expect(result).toBe(false);
    });

    it('should be array', () => {
      const result = typeRule('array', [1, 2, 3]);

      expect(result).toBe(true);
    });

    it('should not be array', () => {
      const result = typeRule('array', { '0': 0, '1': 1, '2': 2 });

      expect(result).toBe(false);
    });
  });

  describe('uniqueItemsRule', () => {
    const { uniqueItemsRule } = valirator;

    it('should has only unique items', () => {
      const result = uniqueItemsRule(true, [{ a: 1 }, { a: 2}, { a: 1 }]);

      expect(result).toBe(false);
    });

    it('should not only uniq items', () => {
      const result = uniqueItemsRule(false, [{ a: 1 }, { a: 2}, { a: 1 }]);

      expect(result).toBe(true);
    });

    it('should pass validation', () => {
      const result = uniqueItemsRule(true, [{ a: 1 }, { a: 2}, { a: 3 }]);

      expect(result).toBe(true);
    });
  });
});
