const cds = require('@sap/cds');

module.exports = cds.service.impl(srv => {
    const { OrderItems } = srv.entities('mhp.capire.carshop');

    srv.after(['READ','EDIT'], 'Orders', _calculateTotals);

    async function _calculateTotals(orders,req) {
        console.log(orders, req);
    }

})