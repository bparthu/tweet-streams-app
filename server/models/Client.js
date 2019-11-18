class Client {
    constructor(clientId, trend = null) {
        this.clientId = clientId;
        this.trend = trend;
    }

    onTrendChange(cb) {
        this.onChangeCB = cb;
    }

    setTrend(trend) {
        this.trend = trend;
        if(this.onChangeCB) {
            this.onChangeCB();
        }
    }
}

module.exports = Client;