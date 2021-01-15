using { mhp.capire.carshop as my } from '../db/schema';

service AdminService @(_requires:'authenticated-user') {
  entity Cars as projection on my.Cars;
  entity Manufactures as projection on my.Manufacturers;
  entity Orders as select from my.Orders;
}