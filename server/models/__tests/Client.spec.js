const Chai = require('chai');
const Client = require('../Client');
const should = Chai.should();

describe('Client model', () => {
  let client;

  beforeEach(() => {
    client = new Client(1000);
  });

  it('should be instantiated with clientId and trend', () => {
    client.clientId.should.be.equal(1000);
    should.not.exist(client.trend);
  });

  it('should be able to set trend', () => {
    client.setTrend('javascript');
    client.trend.should.be.equal('javascript');
  });

});