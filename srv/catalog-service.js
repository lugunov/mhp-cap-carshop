const cds = require('@sap/cds')
const { Cars } = cds.entities ('mhp.capire.carshop')

/** Service implementation for CatalogService */
module.exports = cds.service.impl(srv => {
    srv.after('READ', 'Cars', each => each.stock > 111 && _addDiscount2(each, 11))
    srv.before('CREATE', 'Orders', _reduceStock)
    // srv.before ('*', (req) => { console.debug ('>>>', req.method, req.target.name) })
})

/** Add some discount for overstocked books */
function _addDiscount2(each, discount) {
    each.title += ` -- ${discount}% discount!`
}
/** Reduce stock of ordered books if available stock suffices */
//async function _reduceStock(req) {
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
    //const cars = await tx.run (SELECT.from(Cars));
    //console.log(cars[0]);

/*
    const { Items: orderItems } = req.data

        return cds.transaction(req).run(() => orderItems.map(item =>
            UPDATE(Cars)
                .set('stock -=', item.amount)
                .where('ID =', item.car_ID).and('stock >=', item.amount)
        )).then(all => all.forEach((affectedRows, i) => {
            if (affectedRows === 0) {
                req.error(409, `${orderItems[i].amount} exceeds stock for car #${orderItems[i].car_ID}`)
            }
        }))
    */

/*
const cds = require('@sap/cds')
const { Cars } = cds.entities('mhp.capire.carshop')

class CatalogService extends cds.ApplicationService {
    init() {

        // Reduce stock of ordered books if available stock suffices
        this.on('CREATE', 'Orders', req => {
            console.log(req.data);
            req.data.Items.map( async item => {

                const car_ID = item.car_ID, amount = item.amount;
                const tx = cds.tx(req);
                console.log(Cars);
                //const car_ID = 100, amount = 1, tx = cds.tx(req);
                let { stock } = await tx.read('stock').from(Cars, car_ID)
                console.log(stock);
                if (stock >= amount) {
                    await tx.update(Cars, car_ID).with({ stock: stock -= amount })
                    await this.emit('OrderedCar', { car_ID, amount, buyer: req.user.id })
                    return { stock }
                }
                else return req.error(409, `${amount} exceeds stock for car #${car_ID}`)
            });
        })

        // Add some discount for overstocked books
        this.after('READ', 'Cars', each => {
            if (each.stock > 5) {
                each.descr += ` -- increase your stock!`
            }
        })

        return super.init()
    }
}

module.exports = { CatalogService }
*/