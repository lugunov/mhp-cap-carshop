using { mhp.capire.carshop as my } from '../db/schema';

service AdminService @(_requires:'authenticated-user') {
  entity Cars as projection on my.Cars;
  entity Manufactures as projection on my.Manufacturers;
  
    @Capabilities        : {
        InsertRestrictions.Insertable : true,
        UpdateRestrictions.Updatable  : true,
        DeleteRestrictions.Deletable  : false
    }
    @odata.draft.enabled : true
    entity Orders as projection on my.Orders actions {
        
        action setOrderReverted();
    };
}