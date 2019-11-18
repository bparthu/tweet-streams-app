class StateManager {
    constructor() {
        this.clients = [];
        this.trendMap = {};
    }

    addClient(client) {
        this.clients.push(client);
        return this;
    }

    deleteClient(client) {
        const index = this.clients.indexOf(client);
        this.clients.splice(index,1);
        this.calcActiveTrend();
        return this;
    }

    calcActiveTrend() {
        //reset current map
        this.trendMap = {};
        //recalc the map
        this.clients.map((client) => {
            if(client.trend){
                this.trendMap[client.trend] = true;
            }
        });
        return this;
    }
}

module.exports = StateManager;