const uuid = require('uuid');

module.exports = class {
  constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => ({ id: uuid(), ...column }));
  }
};
