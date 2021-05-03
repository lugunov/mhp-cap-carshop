module.exports = cds.service.impl(async function() { 
	const { Customers, Cars,ListOfCars, Orders } = this.entities;
    const service = await cds.connect.to('Northwind');
    let CID = '';
	this.on('READ', Customers, async request => { 
        const tx = service.transaction(request) 
        if(CID != '') {
            const response = await tx.read(Customers).where({CustomerID: CID}) 
            CID = '';
            return response;  
        } else {
            const response = await tx.read(Customers); 
            CID = '';
            return response;  }
    });
    
    this.on ('submitOrder', async req => { 
        const {car,amount,CustID} = req.data
        let {stock} = await SELECT `stock` .from (Cars,car)
        console.log(stock);
        this.emit("LogMsg",stock)
        
        if (stock >= amount) { 
            CID = CustID;
            let Company = await SELECT `CompanyName` .from (Customers,CustID);
            var item = {car_ID: car,amount:amount } 
            const json_req = { OrderNo:"2021-05-02 100003", Items: [item], Companyname:Company[0].CompanyName  }
            await this.create (Orders) .entries ( json_req );  
            return { stock }
        }
        else return req.error (409,`${amount} exceeds stock for car #${car}`)
    
});

  // Reduce stock of books upon incoming orders
  this.before ('CREATE','Orders', async (req)=>{ 
    const tx = cds.transaction(req), order = req.data;  
    if (order.Items) {
      const affectedRows = await tx.run(order.Items.map(item => 
        UPDATE(Cars) .where({ID:item.car_ID})
          .and(`stock >=`, item.amount)
          .set(`stock -=`, item.amount)
        )
      )
      if (affectedRows.some(row => !row)) req.error(409, 'Sold out, sorry')
    }
  });

  this.on ('LogMsg', req => {
      console.log("Log: "+req.data);
  });
})