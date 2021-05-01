module.exports = cds.service.impl(async function() {
    
	const { Customers } = this.entities;
	const service = await cds.connect.to('Northwind');
	this.on('READ', Customers, request => {
		return service.tx(request).run(request.query);
	});
});