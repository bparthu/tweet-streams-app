const Chai = require('chai');
const StateManager = require('../StateManager');
const should = Chai.should();

describe('StateManager model', () => {
    let manager;
  
    beforeEach(() => {
      manager = new StateManager();
    });
  
    it('should be instantiated with clients and trendMap', () => {
      manager.clients.length.should.be.equal(0);
      manager.trendMap.should.be.deep.equal({});
    });

    describe('manage client', () => {
        let client;
        beforeEach(() => {
            client = {clientId: 1000};
        });

        it('should add a new client', () => {
            manager.addClient(client);
            manager.clients.length.should.be.equal(1);
            manager.clients[0].should.be.deep.equal(client);
        });

        it('should delete an existing client', () => {
            // setup
            manager.addClient(client);
            // test
            manager.deleteClient(client);
            manager.clients.length.should.be.equal(0);
            manager.clients.should.be.deep.equal([]);
        })
    });

    describe('calculate trend map', () => {
        it('when multiple clients has same trend', () => {
            // setup
            const clients = [
                {clientId: 1000, trend: 'javascript'},
                {clientId: 2000, trend: 'javascript'}
            ]
            for(client of clients) {
                manager.addClient(client);
            }
            // test
            manager.calcActiveTrend();
            const activeTrends = Object.keys(manager.trendMap);
            activeTrends.length.should.be.equal(1);
            manager.trendMap['javascript'].should.be.true;
        });

        it('should always recalc trend based on active clients', () => {
            // setup
            const clients = [
                {clientId: 1000, trend: 'javascript'},
                {clientId: 2000, trend: 'javascript'},
                {clientId: 3000, trend: 'nodejs'},
                {clientId: 4000, trend: 'streams'}
            ]
            for(client of clients) {
                manager.addClient(client);
            }
            // test
            manager.calcActiveTrend();
            let activeTrends = Object.keys(manager.trendMap);
            activeTrends.length.should.be.equal(3);
            manager.deleteClient(clients[0]);
            // recalc
            manager.calcActiveTrend();
            activeTrends = Object.keys(manager.trendMap);
            activeTrends.length.should.be.equal(3);
            manager.deleteClient(clients[2]);
            // recalc
            manager.calcActiveTrend();
            activeTrends = Object.keys(manager.trendMap);
            activeTrends.length.should.be.equal(2);
        });
    });
  });