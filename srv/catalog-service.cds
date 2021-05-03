using mhp.capire.carshop as my from '../db/schema';
using { Northwind as external } from './external/Northwind.csn';

service CatalogService @(path:'/browse') {

  entity Cars as projection on my.Cars;
  entity Orders as projection on my.Orders;
  @readonly entity OrderItems as projection on my.OrderItems
  entity Manufacturers as projection on my.Manufacturers;

  @readonly entity ListOfCars as SELECT from Cars
  excluding { descr };
 
  @readonly entity Customers as projection on external.Customers {
     key CustomerID, CompanyName, ContactName
    };

  action submitOrder ( car: Cars:ID, amount: Integer, CustID:Customers:CustomerID ) //returns { stock: Integer };
   

}
