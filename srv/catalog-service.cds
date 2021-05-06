using mhp.capire.carshop as my from '../db/schema';

service CatalogService @(path:'/browse') {

  @readonly 
  entity Cars as SELECT from my.Cars { *, 
    manufacturer.name as manufacturer } 
  excluding {createdBy, modifiedBy};

  //@readonly
  //entity Manufacturers as projection on my.Manufacturers;

  //@readonly entity ListOfCars as SELECT from Cars  excluding { descr };
  
  @requires: 'authenticated-user'
  entity Orders as projection on my.Orders;
 
}
