using { mhp.capire.carshop as my } from '../db/schema';

service AdminService @(requires:'authenticated-user') {
  entity Cars as projection on my.Cars;
  entity Manufactures as projection on my.Manufacturers;
  entity Orders as select from my.Orders;
}

// Enable Fiori Draft for Orders
annotate AdminService.Orders with @odata.draft.enabled;

extend service AdminService with {
  entity OrderItems as select from my.OrderItems;
}

// Restrict access to orders to users with role "admin"
 annotate AdminService.Orders with  @( restrict: [
   { grant: 'UPDATE', to: 'admin' }, 
   { grant: 'CREATE', to: 'admin' }, 
   { grant: 'READ', to: 'admin' }, 
  ]);
