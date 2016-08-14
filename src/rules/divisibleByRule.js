import { registerRule } from '../core';

export function divisibleByRule(value, divisibleBy) {
  let multiplier = Math.max((value - Math.floor(value)).toString().length - 2, (divisibleBy - Math.floor(divisibleBy)).toString().length - 2);

  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

  return (value * multiplier) % (divisibleBy * multiplier) === 0;
}

registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');
