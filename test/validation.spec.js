import { formatMessage } from '../lib/utils';
import { registerRule, hasRule, getRule, overrideRule, overrideRuleMessage } from '../lib/storage';
import { validate, validateSync, validateRule, validateValue, validateObject, validateArray } from '../lib/core'
import ValidationSchema from '../lib/validationSchema';

describe('validation', () => {
  describe('registerRule', () => {
    it('should register rule', () => {
      registerRule('myRule', () => true, 'error');

      expect(hasRule('myRule')).toBe(true);
    });
  });

  describe('overrideRule', () => {
    const { check: originalRule } = getRule('required');

    beforeEach(() => {
      overrideRule('required', (actual, expected) => {
        return actual % expected === 0;
      });
    });

    afterEach(() => {
      overrideRule('required', originalRule);
    });

    it('should fail on overridden required rule', (done) => {
      validateValue(5, { required: 2 })
        .then((errors) => {
          expect(errors.hasErrors()).toBe(true);

          done();
        });
    });

    it('should pass on overridden required rule', (done) => {
      validateValue(5, { required: 5 })
        .then((errors) => {
          expect(errors.hasErrors()).toBe(false);

          done();
        });
    });
  });

  describe('overrideRuleMessage', () => {
    const { message: originalMessage } = getRule('required');

    beforeEach(() => {
      overrideRuleMessage('required', 'custom required message');
    });

    afterEach(() => {
      overrideRuleMessage('required', originalMessage);
    });

    it('should use overridden required message', (done) => {
      validateValue(null, { required: true })
        .then((errors) => {
          expect(errors.required).toBe('custom required message');

          done();
        });
    });
  });

  describe('formatMessage', () => {
    it('should format text', (done) => {
      formatMessage('%{actual} === %{expected}', 5, 5)
        .then(formattedMessage => {
          expect(formattedMessage).toBe('5 === 5');

          done();
        });
    });

    it('should accept function', (done) => {
      formatMessage((actual, expected) => {
        return `${actual} === ${expected}`;
      }, 5, 5)
        .then(formattedMessage => {
          expect(formattedMessage).toBe('5 === 5');

          done();
        });
    });

    it('should have default message', (done) => {
      formatMessage()
        .then(formattedMessage => {
          expect(formattedMessage).toBeDefined();

          done();
        });
    });
  });

  describe('validateRule', () => {
    it('should validate separate rule', (done) => {
      validateRule('required', true, null)
        .then(error => {
          expect(error).toBeDefined();

          done();
        });
    });
  });

  describe('validateValue', () => {
    it('should validate separate value with list of rules', (done) => {
      validateValue('John', { required: true, minLength: 5 })
        .then(errors => {
          expect(errors).toBeDefined();

          done();
        });
    });
  });

  describe('validateObject', () => {

  });

  describe('validateArray', () => {

  });

  describe('validate', () => {
    it('should validate required rule', (done) => {
      const obj = {
        FirstName: null
      };

      const schema = {
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(true);
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should override default global message', (done) => {
      const obj = {
        FirstName: null
      };

      const schema = {
        overrides: {
          messages: {
            required: 'Field is required'
          },
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.required).toBe('Field is required');

          done();
        });
    });

    it('should override default required rule (allow empty, for example)', (done) => {
      const obj = {
        FirstName: ''
      };

      const schema = {
        overrides: {
          rules: {
            required: (value) => {
              return value !== undefined && value !== null;
            }
          },
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.hasErrors()).toBe(false);

          done();
        });
    });

    it('should support nested schemas', (done) => {
      const obj = {
        Person: {
          FirstName: null
        }
      };

      const schema = {
        properties: {
          Person: {
            rules: {
              required: true,
            },
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(true);
          expect(errors.Person.hasErrors()).toBe(true);
          expect(errors.Person.FirstName.hasErrors()).toBe(true);
          expect(errors.Person.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should support high level object validation', (done) => {
      const obj = {
        FirstName: null,
        LastName: 'John',
      };

      const schema = {
        rules: {
          required: (value, a, b, c, d, requiredRule) => {
            return requiredRule(value) && requiredRule(value.FirstName) && requiredRule(value.LastName);
          },
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          },
          LastName: {
            required: true,
          },
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(true);
          expect(errors.FirstName.hasErrors()).toBe(true);
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should support only rules definitions, if there are no messages or properties', (done) => {
      const obj = {
        FirstName: null
      };

      const schema = {
        properties: {
          FirstName: {
            required: true
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(true);
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should pass validation for nested schemas', (done) => {
      const obj = {
        Person: {
          FirstName: 'John'
        }
      };

      const schema = {
        properties: {
          Person: {
            rules: {
              required: true,
            },
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(false);
          expect(errors.Person.hasErrors()).toBe(false);
          expect(errors.Person.FirstName.hasErrors()).toBe(false);
          expect(errors.Person.FirstName.required).not.toBeDefined();

          done();
        });
    });

    it('should support array schemas', (done) => {
      const obj = {
        Persons: [{
          FirstName: 'John'
        }, {
          FirstName: null
        }, {
          FirstName: 'Bob'
        }]
      };

      const schema = {
        properties: {
          Persons: {
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.Persons[0].FirstName.hasErrors()).toBe(false);
          expect(errors.Persons[1].FirstName.hasErrors()).toBe(true);
          expect(errors.Persons[2].FirstName.hasErrors()).toBe(false);

          done();
        });
    });

    it('should support high level array schemas', (done) => {
      const obj = [{
        FirstName: 'John'
      }, {
        FirstName: null
      }, {
        FirstName: 'Bob'
      }];

      const schema = {
        FirstName: {
          rules: {
            required: true
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors[0].FirstName.hasErrors()).toBe(false);
          expect(errors[1].FirstName.hasErrors()).toBe(true);
          expect(errors[2].FirstName.hasErrors()).toBe(false);

          done();
        });
    });

    it('should support primitive validation', (done) => {
      const obj = null;

      const schema = {
        rules: {
          required: true,
        },
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(true);
          expect(errors.required).toBeDefined();

          done();
        });
    });

    it('should support __isArray__ param', (done) => {
      const obj = null;

      const schema = {
        __isArray__: true,
        rules: {
          required: true,
        },
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(true);
          expect(errors.hasErrorsOfTypes('required')).toBe(true);

          done();
        });
    });

    it('should support array validation and schemas as well', (done) => {
      const obj = {
        Persons: [{
          FirstName: 'John'
        }, {
          FirstName: null
        }, {
          FirstName: 'Bob'
        }]
      };

      const schema = {
        properties: {
          Persons: {
            __isArray__: true,
            rules: {
              minLength: 5
            },
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.Persons.hasErrors()).toBe(true);
          expect(errors.Persons.hasErrorsOfTypes('minLength')).toBe(true);
          expect(errors.Persons[0].FirstName.hasErrors()).toBe(false);
          expect(errors.Persons[1].FirstName.hasErrors()).toBe(true);
          expect(errors.Persons[2].FirstName.hasErrors()).toBe(false);

          done();
        });
    });

    it('should support custom rule', (done) => {
      const obj = {
        FirstName: 2
      };

      const schema = {
        overrides: {

          rules: {
            myRule: (actual, expected) => {
              return actual === expected * 2;
            }
          },
          messages: {
            myRule: '%{actual} !== %{expected} * 2'
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should support error result for custom rule', (done) => {
      const obj = {
        FirstName: 4
      };

      const schema = {
        overrides: {
          rules: {
            myRule: (actual, expected) => {
              if (actual === expected * 2) {
                return 'not valid!';
              }

              return true;
            }
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('not valid!');

          done();
        });
    });

    it('should support async rule', (done) => {
      const obj = {
        FirstName: 2
      };

      const schema = {
        overrides: {
          rules: {
            myRule: (actual, expected) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(actual === expected * 2);
                }, 10);
              });
            }
          },
          messages: {
            myRule: '%{actual} !== %{expected} * 2'
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should support async message', (done) => {
      const obj = {
        FirstName: 2
      };

      const schema = {
        overrides: {
          rules: {
            myRule: (actual, expected) => {
              return actual === expected * 2;
            }
          },
          messages: {
            myRule: (actual, expected) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(`${actual} !== ${expected} * 2`);
                }, 10);
              });
            }
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should not fail on empty schema', (done) => {
      const obj = {
        FirstName: 2
      };

      const schema = {};

      validate(schema, obj)
        .then(errors => {
          expect(errors.hasErrors()).toBe(false);

          done();
        });
    });

    it('should not fail on empty obj', (done) => {
      const obj = {};

      const schema = {
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should not fail on null obj', (done) => {
      const obj = null;

      const schema = {
        __isObject__: true,
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should support high level schema', (done) => {
      const obj = {
        FirstName: null
      };

      const schema = {
        FirstName: {
          rules: {
            required: true
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should be fast', (done) => {
      console.time('should be fast');
      const obj = {
        "Id": "9131",
        "AccountId": "1",
        "UserId": null,
        "FirstName": "Test",
        "LastName": "Test",
        "Line1": "15625 Alton Pkwy",
        "Line2": "Suite 200",
        "City": "Irvine",
        "State": "CA",
        "Zip": "92620",
        "Country": "US",
        "Phone": "+1-2345678901",
        "Phone2": "2342342341",
        "Company": "Test",
        "Email": "test@example.com",
        "Type": "primary"
      };

      const schema = {
        messages: {
          required: 'validation.required'
        },
        properties: {
          FirstName: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 45,
              pattern: /^[a-zA-Z0-9]+$/
            },
            messages: {
              pattern: 'validation.firstName.pattern'
            }
          },
          LastName: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 45,
              pattern: /^[a-zA-Z0-9]+$/
            },
            messages: {
              pattern: 'validation.firstName.pattern'
            }
          },
          Email: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50,
              format: 'email'
            },
            messages: {
              format: 'validation.email.format'
            }
          },
          Phone: {
            rules: {
              type: 'string',
              required: true
            }
          },
          Line1: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 100
            }
          },
          Line2: {
            rules: {
              type: 'string',
              maxLength: 100
            }
          },
          Country: {
            rules: {
              type: 'string',
              required: true
            }
          },
          State: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50
            }
          },
          City: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50
            }
          },
          Zip: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 15
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          console.timeEnd('should be fast');

          done();
        });
    });

    it('should be fast with array', (done) => {
      console.time('should be fast with array');
      const obj = {
        "Id": "1",
        "Name": "CalAmp Account",
        "ParentAccount": "0",
        "SolomonId": "GAC22222222",
        "CreditTerms": "COD",
        "SalesTerritory": "US West",
        "Language": "english",
        "PartnerBranding": "calamp",
        "CreditPurchaseAuthorized": "0",
        "ActivationDate": null,
        "DeactivationDate": null,
        "IsDisabled": "no",
        "IsMarkedArchive": "no",
        "CanViewSubaccounts": "1",
        "PartnerLogo": "calamp_logo_slogan_1_125px.jpg",
        "ShowPoweredByLogo": "1",
        "AllowNewDeviceUseFromParent": "0",
        "CanViewAirtimeStore": "1",
        "CanViewHardwareStore": "0",
        "LastChangeDate": "2016-08-12 05:37:24",
        "AllowCommandAutoRetry": "1",
        "SkipInstallProcess": "0",
        "AllowAirtimeAutoRenew": "1",
        "InvoiceAccount": "0",
        "EmailNotificationOnInstall": "1",
        "MandatoryInstallOdometer": "0",
        "RenewalPlanId": "4",
        "RenewalPlanPrice": null,
        "EnableLocationValidationReport": "1",
        "ParentName": "N/A",
        "MaxScheduleActions": 12,
        "is_cac_account": false,
        "CustomUserAttributeDefinitions": [],
        "CustomVehicleAttributeDefinitions": [],
        "AirTimePlan": [
          {
            "RenewalPlanSKU": "rp1111",
            "RenewalPlanPrice": "33.33"
          },
          {
            "RenewalPlanSKU": "rp2222",
            "RenewalPlanPrice": "444.44"
          },
          {
            "RenewalPlanSKU": "aa",
            "RenewalPlanPrice": ""
          },
          {
            "RenewalPlanSKU": "",
            "RenewalPlanPrice": "aa"
          },
          {
            "RenewalPlanSKU": "",
            "RenewalPlanPrice": ""
          }
        ]
      };

      const airTimePlanRowRequired = (actual, expected, property, { RenewalPlanSKU, RenewalPlanPrice }, schema, defaultRule) => {
        let isRequired = {
          allowEmpty: true
        };

        if (RenewalPlanSKU || RenewalPlanPrice) {
          isRequired = true
        }

        return defaultRule(actual, isRequired)
      };

      const schema = {
        messages: {
          required: 'validation.required'
        },
        properties: {
          Name: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 64
            }
          },
          Language: {
            rules: {
              type: 'string',
              required: true
            }
          },
          AirTimePlan: {
            rules: {
              required: true
            },
            properties: {
              RenewalPlanSKU: {
                rules: {
                  required: airTimePlanRowRequired,
                  pattern: /^RP|rp[0-9]{4}$/
                },
                messages: {
                  pattern: 'validation.renewalPlanSKU.pattern'
                }
              },
              RenewalPlanPrice: {
                rules: {
                  required: airTimePlanRowRequired,
                  pattern: /^[0-9]+\.?[0-9]{2}$/
                },
                messages: {
                  pattern: 'validation.renewalPlanPrice.pattern'
                }
              }
            }
          }
        }
      };

      validate(schema, obj)
        .then(errors => {
          console.timeEnd('should be fast with array');

          done();
        });
    });
  });

  describe('validateSync', () => {
    it('should validate required rule', () => {
      const obj = {
        FirstName: null
      };

      const schema = {
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.hasErrors()).toBe(true);
      expect(errors.FirstName.required).toBeDefined();
    });

    it('should override default global message', () => {
      const obj = {
        FirstName: null
      };

      const schema = {
        overrides: {
          messages: {
            required: 'Field is required'
          },
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.FirstName.required).toBe('Field is required');
    });

    it('should override default required rule (allow empty, for example)', () => {
      const obj = {
        FirstName: ''
      };

      const schema = {
        overrides: {
          rules: {
            required: (value) => {
              return value !== undefined && value !== null;
            }
          },
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.FirstName.hasErrors()).toBe(false);
    });

    it('should support nested schemas', () => {
      const obj = {
        Person: {
          FirstName: null
        }
      };

      const schema = {
        properties: {
          Person: {
            rules: {
              required: true
            },
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.hasErrors()).toBe(true);
      expect(errors.Person.hasErrors()).toBe(true);
      expect(errors.Person.FirstName.hasErrors()).toBe(true);
      expect(errors.Person.FirstName.required).toBeDefined();
    });

    it('should pass validation for nested schemas', () => {
      const obj = {
        Person: {
          FirstName: 'John'
        }
      };

      const schema = {
        properties: {
          Person: {
            rules: {
              required: true,
            },
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.hasErrors()).toBe(false);
      expect(errors.Person.hasErrors()).toBe(false);
      expect(errors.Person.FirstName.hasErrors()).toBe(false);
      expect(errors.Person.FirstName.required).not.toBeDefined();
    });

    it('should support array schemas', () => {
      const obj = {
        Persons: [{
          FirstName: 'John'
        }, {
          FirstName: null
        }, {
          FirstName: 'Bob'
        }]
      };

      const schema = {
        properties: {
          Persons: {
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.Persons[0].FirstName.hasErrors()).toBe(false);
      expect(errors.Persons[1].FirstName.hasErrors()).toBe(true);
      expect(errors.Persons[2].FirstName.hasErrors()).toBe(false);
    });

    it('should support array validation and schemas as well', () => {
      const obj = {
        Persons: [{
          FirstName: 'John'
        }, {
          FirstName: null
        }, {
          FirstName: 'Bob'
        }]
      };

      const schema = {
        properties: {
          Persons: {
            rules: {
              minLength: 5
            },
            properties: {
              FirstName: {
                rules: {
                  required: true
                }
              }
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.Persons.hasErrors()).toBe(true);
      expect(errors.Persons.hasErrorsOfTypes('minLength')).toBe(true);
      expect(errors.Persons[0].FirstName.hasErrors()).toBe(false);
      expect(errors.Persons[1].FirstName.hasErrors()).toBe(true);
      expect(errors.Persons[2].FirstName.hasErrors()).toBe(false);
    });

    it('should support custom rule', () => {
      const obj = {
        FirstName: 2
      };

      const schema = {
        overrides: {
          rules: {
            myRule: (actual, expected) => {
              return actual === expected * 2;
            }
          },
          messages: {
            myRule: '%{actual} !== %{expected} * 2'
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.FirstName.min).toBeDefined();
      expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');
    });

    it('should support error result for custom rule', () => {
      const obj = {
        FirstName: 4
      };

      const schema = {
        overrides: {
          rules: {
            myRule: (actual, expected) => {
              if (actual === expected * 2) {
                return 'not valid!';
              }

              return true;
            }
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.FirstName.min).toBeDefined();
      expect(errors.FirstName.myRule).toBe('not valid!');
    });

    it('should not fail on empty schema', () => {
      const obj = {
        FirstName: 2
      };

      const schema = {};

      const errors = validateSync(schema, obj);

      expect(errors.hasErrors()).toBe(false);
    });

    it('should not fail on empty obj', () => {
      const obj = {};

      const schema = {
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.FirstName.required).toBeDefined();
    });

    it('should support high level schema', () => {
      const obj = {
        FirstName: null
      };

      const schema = {
        FirstName: {
          rules: {
            required: true
          }
        }
      };

      const errors = validateSync(schema, obj);

      expect(errors.FirstName.required).toBeDefined();
    });

    it('should be fast', () => {
      console.time('should be fast');
      const obj = {
        "Id": "9131",
        "AccountId": "1",
        "UserId": null,
        "FirstName": "Test",
        "LastName": "Test",
        "Line1": "15625 Alton Pkwy",
        "Line2": "Suite 200",
        "City": "Irvine",
        "State": "CA",
        "Zip": "92620",
        "Country": "US",
        "Phone": "+1-2345678901",
        "Phone2": "2342342341",
        "Company": "Test",
        "Email": "test@example.com",
        "Type": "primary"
      };

      const schema = {
        messages: {
          required: 'validation.required'
        },
        properties: {
          FirstName: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 45,
              pattern: /^[a-zA-Z0-9]+$/
            },
            messages: {
              pattern: 'validation.firstName.pattern'
            }
          },
          LastName: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 45,
              pattern: /^[a-zA-Z0-9]+$/
            },
            messages: {
              pattern: 'validation.firstName.pattern'
            }
          },
          Email: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50,
              format: 'email'
            },
            messages: {
              format: 'validation.email.format'
            }
          },
          Phone: {
            rules: {
              type: 'string',
              required: true
            }
          },
          Line1: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 100
            }
          },
          Line2: {
            rules: {
              type: 'string',
              maxLength: 100
            }
          },
          Country: {
            rules: {
              type: 'string',
              required: true
            }
          },
          State: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50
            }
          },
          City: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50
            }
          },
          Zip: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 15
            }
          }
        }
      };

      validateSync(schema, obj);

      console.timeEnd('should be fast');
    });

    it('should be fast with array', () => {
      console.time('should be fast with array');
      const obj = {
        "Id": "1",
        "Name": "CalAmp Account",
        "ParentAccount": "0",
        "SolomonId": "GAC22222222",
        "CreditTerms": "COD",
        "SalesTerritory": "US West",
        "Language": "english",
        "PartnerBranding": "calamp",
        "CreditPurchaseAuthorized": "0",
        "ActivationDate": null,
        "DeactivationDate": null,
        "IsDisabled": "no",
        "IsMarkedArchive": "no",
        "CanViewSubaccounts": "1",
        "PartnerLogo": "calamp_logo_slogan_1_125px.jpg",
        "ShowPoweredByLogo": "1",
        "AllowNewDeviceUseFromParent": "0",
        "CanViewAirtimeStore": "1",
        "CanViewHardwareStore": "0",
        "LastChangeDate": "2016-08-12 05:37:24",
        "AllowCommandAutoRetry": "1",
        "SkipInstallProcess": "0",
        "AllowAirtimeAutoRenew": "1",
        "InvoiceAccount": "0",
        "EmailNotificationOnInstall": "1",
        "MandatoryInstallOdometer": "0",
        "RenewalPlanId": "4",
        "RenewalPlanPrice": null,
        "EnableLocationValidationReport": "1",
        "ParentName": "N/A",
        "MaxScheduleActions": 12,
        "is_cac_account": false,
        "CustomUserAttributeDefinitions": [],
        "CustomVehicleAttributeDefinitions": [],
        "AirTimePlan": [
          {
            "RenewalPlanSKU": "rp1111",
            "RenewalPlanPrice": "33.33"
          },
          {
            "RenewalPlanSKU": "rp2222",
            "RenewalPlanPrice": "444.44"
          },
          {
            "RenewalPlanSKU": "aa",
            "RenewalPlanPrice": ""
          },
          {
            "RenewalPlanSKU": "",
            "RenewalPlanPrice": "aa"
          },
          {
            "RenewalPlanSKU": "",
            "RenewalPlanPrice": ""
          }
        ]
      };

      const airTimePlanRowRequired = (actual, expected, property, { RenewalPlanSKU, RenewalPlanPrice }, schema, defaultRule) => {
        let isRequired = {
          allowEmpty: true
        };

        if (RenewalPlanSKU || RenewalPlanPrice) {
          isRequired = true
        }

        return defaultRule(actual, isRequired)
      };

      const schema = {
        messages: {
          required: 'validation.required'
        },
        properties: {
          Name: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 64
            }
          },
          Language: {
            rules: {
              type: 'string',
              required: true
            }
          },
          AirTimePlan: {
            rules: {
              required: true
            },
            properties: {
              RenewalPlanSKU: {
                rules: {
                  required: airTimePlanRowRequired,
                  pattern: /^RP|rp[0-9]{4}$/
                },
                messages: {
                  pattern: 'validation.renewalPlanSKU.pattern'
                }
              },
              RenewalPlanPrice: {
                rules: {
                  required: airTimePlanRowRequired,
                  pattern: /^[0-9]+\.?[0-9]{2}$/
                },
                messages: {
                  pattern: 'validation.renewalPlanPrice.pattern'
                }
              }
            }
          }
        }
      };

      validateSync(schema, obj);

      console.timeEnd('should be fast with array');
    });
  });

  describe('ValidationSchema', () => {
    it('should support ValidationSchema for multiple validations', (done) => {
      const obj = {
        FirstName: 2
      };

      const schema = new ValidationSchema({
        overrides: {
          rules: {
            myRule: (actual, expected) => {
              return actual === expected * 2;
            }
          },
          messages: {
            myRule: (actual, expected) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(`${actual} !== ${expected} * 2`);
                }, 10);
              });
            }
          },
        },
        properties: {
          FirstName: {
            rules: {
              min: 6,
              myRule: 2
            }
          }
        }
      });

      schema.validate(obj)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should be fast', (done) => {
      console.time('ValidationSchema -> should be fast');
      const obj = {
        "Id": "9131",
        "AccountId": "1",
        "UserId": null,
        "FirstName": "Test",
        "LastName": "Test",
        "Line1": "15625 Alton Pkwy",
        "Line2": "Suite 200",
        "City": "Irvine",
        "State": "CA",
        "Zip": "92620",
        "Country": "US",
        "Phone": "+1-2345678901",
        "Phone2": "2342342341",
        "Company": "Test",
        "Email": "test@example.com",
        "Type": "primary"
      };

      const schema = new ValidationSchema({
        messages: {
          required: 'validation.required'
        },
        properties: {
          FirstName: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 45,
              pattern: /^[a-zA-Z0-9]+$/
            },
            messages: {
              pattern: 'validation.firstName.pattern'
            }
          },
          LastName: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 45,
              pattern: /^[a-zA-Z0-9]+$/
            },
            messages: {
              pattern: 'validation.firstName.pattern'
            }
          },
          Email: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50,
              format: 'email'
            },
            messages: {
              format: 'validation.email.format'
            }
          },
          Phone: {
            rules: {
              type: 'string',
              required: true
            }
          },
          Line1: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 100
            }
          },
          Line2: {
            rules: {
              type: 'string',
              maxLength: 100
            }
          },
          Country: {
            rules: {
              type: 'string',
              required: true
            }
          },
          State: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50
            }
          },
          City: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 50
            }
          },
          Zip: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 15
            }
          }
        }
      });

      schema.validate(obj)
        .then(errors => {
          console.timeEnd('ValidationSchema -> should be fast');

          done();
        });
    });

    it('should be fast with array', (done) => {
      console.time('ValidationSchema -> should be fast with array');
      const obj = {
        "Id": "1",
        "Name": "CalAmp Account",
        "ParentAccount": "0",
        "SolomonId": "GAC22222222",
        "CreditTerms": "COD",
        "SalesTerritory": "US West",
        "Language": "english",
        "PartnerBranding": "calamp",
        "CreditPurchaseAuthorized": "0",
        "ActivationDate": null,
        "DeactivationDate": null,
        "IsDisabled": "no",
        "IsMarkedArchive": "no",
        "CanViewSubaccounts": "1",
        "PartnerLogo": "calamp_logo_slogan_1_125px.jpg",
        "ShowPoweredByLogo": "1",
        "AllowNewDeviceUseFromParent": "0",
        "CanViewAirtimeStore": "1",
        "CanViewHardwareStore": "0",
        "LastChangeDate": "2016-08-12 05:37:24",
        "AllowCommandAutoRetry": "1",
        "SkipInstallProcess": "0",
        "AllowAirtimeAutoRenew": "1",
        "InvoiceAccount": "0",
        "EmailNotificationOnInstall": "1",
        "MandatoryInstallOdometer": "0",
        "RenewalPlanId": "4",
        "RenewalPlanPrice": null,
        "EnableLocationValidationReport": "1",
        "ParentName": "N/A",
        "MaxScheduleActions": 12,
        "is_cac_account": false,
        "CustomUserAttributeDefinitions": [],
        "CustomVehicleAttributeDefinitions": [],
        "AirTimePlan": [
          {
            "RenewalPlanSKU": "rp1111",
            "RenewalPlanPrice": "33.33"
          },
          {
            "RenewalPlanSKU": "rp2222",
            "RenewalPlanPrice": "444.44"
          },
          {
            "RenewalPlanSKU": "aa",
            "RenewalPlanPrice": ""
          },
          {
            "RenewalPlanSKU": "",
            "RenewalPlanPrice": "aa"
          },
          {
            "RenewalPlanSKU": "",
            "RenewalPlanPrice": ""
          }
        ]
      };

      const airTimePlanRowRequired = (actual, expected, property, { RenewalPlanSKU, RenewalPlanPrice }, schema, defaultRule) => {
        let isRequired = {
          allowEmpty: true
        };

        if (RenewalPlanSKU || RenewalPlanPrice) {
          isRequired = true
        }

        return defaultRule(actual, isRequired)
      };

      const schema = new ValidationSchema({
        messages: {
          required: 'validation.required'
        },
        properties: {
          Name: {
            rules: {
              type: 'string',
              required: true,
              maxLength: 64
            }
          },
          Language: {
            rules: {
              type: 'string',
              required: true
            }
          },
          AirTimePlan: {
            rules: {
              required: true
            },
            properties: {
              RenewalPlanSKU: {
                rules: {
                  required: airTimePlanRowRequired,
                  pattern: /^RP|rp[0-9]{4}$/
                },
                messages: {
                  pattern: 'validation.renewalPlanSKU.pattern'
                }
              },
              RenewalPlanPrice: {
                rules: {
                  required: airTimePlanRowRequired,
                  pattern: /^[0-9]+\.?[0-9]{2}$/
                },
                messages: {
                  pattern: 'validation.renewalPlanPrice.pattern'
                }
              }
            }
          }
        }
      });

      schema.validate(obj)
        .then(errors => {
          console.timeEnd('ValidationSchema -> should be fast with array');

          done();
        });
    });
  });
});
