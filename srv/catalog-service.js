const cds = require('@sap/cds');
const { Cars } = cds.entities ('mhp.capire.carshop');

/** Service implementation for CatalogService */
module.exports = cds.service.impl(srv => {

    srv.after('READ', 'Cars', each => _addDisscount(each, 8));
    srv.after('READ', 'Cars', _addDisscount2);
    srv.before('CREATE', 'Orders', _reduceStock);

})

/** Add discount if stock higher than 10 */
function _addDisscount(each, discount) {
    //console.log(each);
    if(each.stock > 10){
        //each.descr += ` -- ${discount}% discount!!!`;
    };
}

/** Add discount if stock higher than 10 */
function _addDisscount2(req) {
    //console.log(req);
    req.forEach(data => {
        if(data.stock > 10){
            data.descr += ' -- 8% discount!!!';
        }
    });
}

/** Reduce stock of ordered cars if available stock suffices */
function _reduceStock(req) {

    const tx = cds.tx(req);
    const req_data = req.data, req_data_items = req.data.Items;
    //console.log(req.data);
    //console.log(req_data_items);

    req_data_items.forEach(async item => {
        //console.log(item.car_ID);
        let car = await tx.run(
            SELECT.from(Cars)
            .where('ID =', item.car_ID))
        //    .and('stock >=', item.amount))
        //console.log('before', car);
        //console.log('---');

        const affectedRows = await tx.run(
            UPDATE(Cars, car[0].ID)
            .with('stock -=', item.amount)
            .where('stock >=', item.amount));
        //console.log(affectedRows);
        if(affectedRows < 1){
            req.reject(409, `Ordner with Number ${req_data.OrderNo} can not be processes!`);
        }

        let car_after = await tx.run(
            SELECT.from(Cars)
            .where('ID =', item.car_ID))
        //console.log('after', car_after);
        
    })

}