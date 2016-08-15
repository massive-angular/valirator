import { registerRule, hasRule, formatMessage, validate } from '../dist/valirator';

describe('valirator', () => {
  describe('registerRule', () => {
    it('should register rule', () => {
      registerRule('myRule', () => true, 'error');

      expect(hasRule('myRule')).toBe(true);
    });
  });

  describe('formatMessage', () => {
    it('should format text', (done) => {
      formatMessage('%{actual} === %{expected}', 5, 5)
        .then(formattedMessage  => {
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
        })
    });
  });

  describe('validate', () => {
    it('should validate required rule', (done) => {
      const schema = {
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const obj = {
        FirstName: null
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should override default global message', (done) => {
      const schema = {
        messages: {
          required: 'Field is required'
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const obj = {
        FirstName: null
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.required).toBe('Field is required');

          done();
        });
    });

    it('should override default required rule (allow empty, for example)', (done) => {
      const schema = {
        rules: {
          required: (value) => {
            return value !== undefined && value !== null;
          }
        },
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const obj = {
        FirstName: ''
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.required).not.toBeDefined();

          done();
        });
    });

    it('should support nested schemas', (done) => {
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

      const obj = {
        Person: {
          FirstName: null
        }
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.Person.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should support array schemas', (done) => {
      const schema = {
        properties: {
          Persons: {
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

      const obj = {
        Persons: [{
          FirstName: 'John'
        },{
          FirstName: null
        }, {
          FirstName: 'Bob'
        }]
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.Persons[0].FirstName.required).not.toBeDefined();
          expect(errors.Persons[1].FirstName.required).toBeDefined();
          expect(errors.Persons[2].FirstName.required).not.toBeDefined();

          done();
        });
    });

    it('should support custom rule', (done) => {
      const schema = {
        rules: {
          myRule: (actual, expected) => {
            return actual === expected * 2;
          }
        },
        messages: {
          myRule: '%{actual} !== %{expected} * 2'
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

      const obj = {
        FirstName: 2
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should support async rule', (done) => {
      const schema = {
        rules: {
          myRule: (actual, expected) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(actual === expected * 2);
              }, 1000);
            });
          }
        },
        messages: {
          myRule: '%{actual} !== %{expected} * 2'
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

      const obj = {
        FirstName: 2
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should support async message', (done) => {
      const schema = {
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
              }, 1000);
            });
          }
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

      const obj = {
        FirstName: 2
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.min).toBeDefined();
          expect(errors.FirstName.myRule).toBe('2 !== 2 * 2');

          done();
        });
    });

    it('should not fail on empty schema', (done) => {
      const schema = {
      };

      const obj = {
        FirstName: 2
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors).toEqual({});

          done();
        });
    });

    it('should not fail on empty obj', (done) => {
      const schema = {
        properties: {
          FirstName: {
            rules: {
              required: true
            }
          }
        }
      };

      const obj = {
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });

    it('should support high level schema', (done) => {
      const schema = {
        FirstName: {
          rules: {
            required: true
          }
        }
      };

      const obj = {
        FirstName: null
      };

      validate(obj, schema)
        .then(errors => {
          expect(errors.FirstName.required).toBeDefined();

          done();
        });
    });
  });
});
