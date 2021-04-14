using mhp.capire.carshop as my from '../db/schema';

service CatalogService @(path:'/browse') {

  entity Cars as projection on my.Cars;

  entity Manufacturers as projection on my.Manufacturers;

  @readonly entity ListOfCars as SELECT from Cars  excluding { descr };

  entity Orders as projection on my.Orders;
 
}
