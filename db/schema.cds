namespace mhp.capire.carshop;

using { Currency, managed, sap, cuid } from '@sap/cds/common';

type EngineType : Association to EngineTypes; 

entity Cars : managed {
  key ID        : Integer;
  descr         : localized String(1111);
  model         : String(100) @title:'{i18n>Model}';
  manufacturer  : Association to Manufacturers;
  price         : Decimal;
  currency      : Currency;
  stock         : Integer; 
  engineType    : EngineType;
  enginePowerKw : Integer;
  color         : String(30);
  image         : LargeBinary @Core.MediaType : 'image/png';
}

entity Manufacturers : managed {
  key ID     : Integer;
  name       : String(10);  
  descr      : String(111);
  country    : String(1000); 
  cars       : Association to many Cars on cars.manufacturer = $self;
}

// Engine types: Hybrid, Diesel, Benzin, Elektro; Gas 
/* 
    Code: 01 - Benzin, 02 - Diesel, 03 - Elektro, 04 - Hybrid, 05 - Gas, 06 - Atomcraft
*/
entity EngineTypes : sap.common.CodeList  {
  key code : Integer;
} 

entity Orders : cuid, managed {
  OrderNo  : String @title:'{i18n>OrderID}'; //> readable key
  Items    : Composition of many OrderItems on Items.parent = $self;
  total    : Decimal(9,2);
  currency : Currency;
}

entity OrderItems {
    key ID   : UUID; 
    parent    : Association to Orders;
    car       : Association to Cars;
    amount    : Integer;
    netAmount : Decimal(9,2);
}