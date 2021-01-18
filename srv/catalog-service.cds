using mhp.capire.carshop as my from '../db/schema';

service CatalogService @(path : '/browse') {

    @readonly
    entity Cars          as
        select from my.Cars {
            *,
            manufacturer.name as manufacturer,
            engineType.name   as engineType
        }
        excluding {
            createdBy,
            createdAt,
            modifiedBy,
            modifiedAt
        };

    @readonly
    entity ListOfCars    as
        select from Cars
        excluding {
            descr
        };

    @readonly
    entity Manufacturers as
        select from my.Manufacturers {
            *
        }
        excluding {
            cars,
            createdBy,
            createdAt,
            modifiedBy,
            modifiedAt
        };

    @insertonly entity Orders as projection on my.Orders;
    //@requires: 'authenticated-user'
    //action submitOrder ( car: Cars:ID, amount: Integer ) returns { stock: Integer };

}