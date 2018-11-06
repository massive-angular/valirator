import * as rules from '../lib/rules/index';

describe('rules', () => {
  describe('divisibleByRule', () => {
    const { divisibleByRule } = rules;

    it('should be divisible by 3.3', () => {
      const result = divisibleByRule(9.9, 3.3);

      expect(result).toBe(true);
    });

    it('should not be divisible by 3.3', () => {
      const result = divisibleByRule(10, 3.3);

      expect(result).toBe(false);
    });
  });

  describe('enumRule', () => {
    const { enumRule } = rules;

    it('should be in enum', () => {
      const result = enumRule('value1', ['value1', 'value2', 'value3']);

      expect(result).toBe(true);
    });

    it('should not be in enum', () => {
      const result = enumRule('value4', ['value1', 'value2', 'value3']);

      expect(result).toBe(false);
    });
  });

  describe('formatRule', () => {
    const { formatRule } = rules;

    it('should respect email format', () => {
      const result = formatRule('email@example.com', 'email');

      expect(result).toBe(true);
    });

    it('should not respect email format', () => {
      const result = formatRule('email@example@com.com', 'email');

      expect(result).toBe(false);
    });

    it('should throw error for unknown format', () => {
      expect(() => formatRule('email@example.com', 'email2')).toThrow();
    });
  });

  describe('lessThan', () => {
    const { lessThanRule } = rules;

    it('should pass less than "1234"', () => {
      const result = lessThanRule(1234, 12345);

      expect(result).toBe(true);
    });

    it('should fail less than "1234"', () => {
      const result = lessThanRule(12345, 1234);

      expect(result).toBe(false);
    });
  });

  describe('lessThanProperty', () => {
    const { lessThanPropertyRule } = rules;

    it('should pass less than property "a"', () => {
      const result = lessThanPropertyRule(1234, 'a', { a: 12345 });

      expect(result).toBe(true);
    });

    it('should fail less than property "a"', () => {
      const result = lessThanPropertyRule(12345, 'a', { a: 1234 });

      expect(result).toBe(false);
    });
  });

  describe('moreThan', () => {
    const { moreThanRule } = rules;

    it('should pass more than "1234"', () => {
      const result = moreThanRule(12345, 1234);

      expect(result).toBe(true);
    });

    it('should fail more than "1234"', () => {
      const result = moreThanRule(1234, 12345);

      expect(result).toBe(false);
    });
  });

  describe('moreThanProperty', () => {
    const { moreThanPropertyRule } = rules;

    it('should pass more than property "a"', () => {
      const result = moreThanPropertyRule(12345, 'a', { a: 1234 });

      expect(result).toBe(true);
    });

    it('should fail more than property "a"', () => {
      const result = moreThanPropertyRule(1234, 'a', { a: 12345 });

      expect(result).toBe(false);
    });
  });

  describe('moreThanProperty', () => {
    const { matchToPropertyRule } = rules;

    it('should pass match to property "a"', () => {
      const result = matchToPropertyRule('1234', 'a', { a: '1234' });

      expect(result).toBe(true);
    });

    it('should fail match to "1234"', () => {
      const result = matchToPropertyRule('1234', 'a', { a: '12345' });

      expect(result).toBe(false);
    });
  });

  describe('matchTo', () => {
    const { matchToRule } = rules;

    it('should pass match to "1234"', () => {
      const result = matchToRule('1234', '1234');

      expect(result).toBe(true);
    });

    it('should fail match to "1234"', () => {
      const result = matchToRule('12345', '1234');

      expect(result).toBe(false);
    });
  });

  describe('matchToProperty', () => {
    const { matchToPropertyRule } = rules;

    it('should pass match to property "a"', () => {
      const result = matchToPropertyRule('1234', 'a', { a: '1234' });

      expect(result).toBe(true);
    });

    it('should fail match to property "a"', () => {
      const result = matchToPropertyRule('1234', 'a', { a: '12345' });

      expect(result).toBe(false);
    });

    it('should accept array', () => {
      const result = matchToPropertyRule('12345', ['a', 'b'], { a: '12345', b: '12345' });

      expect(result).toBe(true);
    });
  });

  describe('notMatchTo', () => {
    const { notMatchToRule } = rules;

    it('should pass no match to "1234"', () => {
      const result = notMatchToRule('12345', '1234');

      expect(result).toBe(true);
    });

    it('should fail not match to "1234"', () => {
      const result = notMatchToRule('1234', '1234');

      expect(result).toBe(false);
    });

    it('should accept array', () => {
      const result = notMatchToRule('12345', ['1234', '12345']);

      expect(result).toBe(false);
    });
  });

  describe('notMatchToProperty', () => {
    const { notMatchToPropertyRule } = rules;

    it('should pass no match to property "a"', () => {
      const result = notMatchToPropertyRule('12345', 'a', { a: '1234' });

      expect(result).toBe(true);
    });

    it('should fail not match to property "a"', () => {
      const result = notMatchToPropertyRule('1234', 'a', { a: '1234' });

      expect(result).toBe(false);
    });

    it('should accept array', () => {
      const result = notMatchToPropertyRule('12345', ['a', 'b'], { a: '1234', b: '12345' });

      expect(result).toBe(false);
    });
  });

  describe('maxRule', () => {
    const { maxRule } = rules;

    it('should be lower or equal then 5', () => {
      const result = maxRule(5, 5);

      expect(result).toBe(true);
    });

    it('should not be lower or equal lower then 5', () => {
      const result = maxRule(10, 5);

      expect(result).toBe(false);
    });
  });

  describe('maxItemsRule', () => {
    const { maxItemsRule } = rules;

    it('should has less or equal then 5 item', () => {
      const result = maxItemsRule([1, 2, 3, 4, 5], 5);

      expect(result).toBe(true);
    });

    it('should not has less or equal then 5 item', () => {
      const result = maxItemsRule([1, 2, 3, 4, 5, 6], 5);

      expect(result).toBe(false);
    });
  });

  describe('maxLengthRule', () => {
    const { maxLengthRule } = rules;

    it('should be less or equal then 5 length string', () => {
      const result = maxLengthRule('12345', 5);

      expect(result).toBe(true);
    });

    it('should not be less or equal then 5 length string', () => {
      const result = maxLengthRule('123456', 5);

      expect(result).toBe(false);
    });
  });

  describe('minRule', () => {
    const { minRule } = rules;

    it('should be bigger or equal then 5', () => {
      const result = minRule(5, 5);

      expect(result).toBe(true);
    });

    it('should not be bigger or equal lower then 5', () => {
      const result = minRule(1, 5);

      expect(result).toBe(false);
    });
  });

  describe('minItemsRule', () => {
    const { minItemsRule } = rules;

    it('should has more or equal then 5 item', () => {
      const result = minItemsRule([1, 2, 3, 4, 5], 5);

      expect(result).toBe(true);
    });

    it('should not has more or equal then 5 item', () => {
      const result = minItemsRule([1, 2, 3, 4], 5);

      expect(result).toBe(false);
    });
  });

  describe('minLengthRule', () => {
    const { minLengthRule } = rules;

    it('should be bigger or equal then 5 length string', () => {
      const result = minLengthRule('12345', 5);

      expect(result).toBe(true);
    });

    it('should not be bigger or equal then 5 length string', () => {
      const result = minLengthRule('1234', 5);

      expect(result).toBe(false);
    });
  });

  describe('patternRule', () => {
    const { patternRule } = rules;

    it('should match pattern d+', () => {
      const result = patternRule('1234', /\d+/);

      expect(result).toBe(true);
    });

    it('should not match pattern d+', () => {
      const result = patternRule('abc', /\d+/);

      expect(result).toBe(false);
    });
  });

  describe('requiredRule', () => {
    const { requiredRule } = rules;

    it('should be required', () => {
      const result = requiredRule(null, true);

      expect(result).toBe(false);
    });

    it('should not be required', () => {
      const result = requiredRule(null, false);

      expect(result).toBe(true);
    });

    it('should allow empty', () => {
      const result = requiredRule('', {
        allowEmpty: true,
      });

      expect(result).toBe(true);
    });

    it('should not allow empty', () => {
      const result = requiredRule('', {
        allowEmpty: false,
      });

      expect(result).toBe(false);
    });

    it('should allow zero', () => {
      const result = requiredRule(0, {
        allowZero: true,
      });

      expect(result).toBe(true);
    });

    it('should not allow zero', () => {
      const result = requiredRule(0, {
        allowZero: false,
      });

      expect(result).toBe(false);
    });

    it('should pass validation', () => {
      const result = requiredRule('123', true);

      expect(result).toBe(true);
    });
  });

  describe('typeRule', () => {
    const { typeRule } = rules;

    it('should be boolean', () => {
      const result = typeRule(true, 'boolean');

      expect(result).toBe(true);
    });

    it('should not be boolean', () => {
      const result = typeRule(0, 'boolean');

      expect(result).toBe(false);
    });

    it('should be number', () => {
      const result = typeRule(1, 'number');

      expect(result).toBe(true);
    });

    it('should not be number', () => {
      const result = typeRule('1', 'number');

      expect(result).toBe(false);
    });

    it('should be string', () => {
      const result = typeRule('abc', 'string');

      expect(result).toBe(true);
    });

    it('should not be string', () => {
      const result = typeRule(123, 'string');

      expect(result).toBe(false);
    });

    it('should be date', () => {
      const result = typeRule(new Date(), 'date');

      expect(result).toBe(true);
    });

    it('should not be date', () => {
      const result = typeRule('2017-02-11', 'date');

      expect(result).toBe(false);
    });

    it('should be object', () => {
      const result = typeRule({ a: 1, b: 2 }, 'object');

      expect(result).toBe(true);
    });

    it('should not be object', () => {
      const result = typeRule(new Date(), 'object');

      expect(result).toBe(false);
    });

    it('should be array', () => {
      const result = typeRule([1, 2, 3], 'array');

      expect(result).toBe(true);
    });

    it('should not be array', () => {
      const result = typeRule({ '0': 0, '1': 1, '2': 2 }, 'array');

      expect(result).toBe(false);
    });
  });

  describe('uniqueItemsRule', () => {
    const { uniqueItemsRule } = rules;

    it('should has only unique items', () => {
      const result = uniqueItemsRule([{ a: 1 }, { a: 2 }, { a: 1 }], true);

      expect(result).toBe(false);
    });

    it('should not only uniq items', () => {
      const result = uniqueItemsRule([{ a: 1 }, { a: 2 }, { a: 1 }], false);

      expect(result).toBe(true);
    });

    it('should pass validation', () => {
      const result = uniqueItemsRule([{ a: 1 }, { a: 2 }, { a: 3 }], true);

      expect(result).toBe(true);
    });
  });
});
