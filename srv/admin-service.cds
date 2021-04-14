using { mhp.capire.carshop as my } from '../db/schema';

service AdminService @( requires:'authenticated-user') {
  entity Cars as projection on my.Cars;
  entity Manufactures as projection on my.Manufacturers;
  entity Orders as select from my.Orders;
}

// Enable Fiori Draft for Orders
annotate AdminService.Orders with @odata.draft.enabled;

// Restrict access to orders to users with role "admin"
 annotate AdminService.Orders with  @( restrict: [
   { grant: 'READ', to: 'admin' } 
  ]);
