using AdminService as service from '../../srv/admin-service';


annotate service.Orders with {
    ID @UI.HiddenFilter;
    total @UI.HiddenFilter;

    modifiedBy @UI.Hidden;
    modifiedAt @UI.Hidden;
    createdAt @UI.Hidden;
    createdBy @UI.Hidden;
}; 

annotate service.OrderItems with @(UI : {

    LineItem #OrderItems       : [
    {
        $Type: 'UI.DataField',
        Value : ID,
        Label : 'ID'
    },{
        $Type: 'UI.DataField',
        Value : car.descr,
        Label : 'Auto'
    },{
        $Type: 'UI.DataField',
        Value : amount,
        Label : 'Menge'
    },{
        $Type: 'UI.DataField',
        Value : netAmount,
        Label : 'Total'
    }
    ],
});

annotate service.Orders with @(UI : {

    Identification  : [    
    {
        $Type : 'UI.DataFieldForAction',
        Label : 'Stornieren',
        Action : 'AdminService.setOrderReverted',
        Criticality : #Critical
    }    
    ],

    SelectionFields : [
        OrderNo
    ],

    LineItem       : [
    {
        $Type: 'UI.DataField',
        Value : ID,
        Label : 'ID'
    },{
        $Type: 'UI.DataField',
        Value : OrderNo
    },{
        $Type: 'UI.DataField',
        Value : total,
        Label : 'Total'
    },{
        $Type: 'UI.DataField',
        Value : currency_code
    }
    ],

    

    HeaderInfo                 : {
        $Type          : 'UI.HeaderInfoType',
        TypeName       : 'Auftrag',
        TypeNamePlural : 'Aufträge',
        Title          : {
            $Type       : 'UI.DataField',
            Value       : OrderNo,
            Criticality : #Information
        },
        Description    : {Value : createdAt},
    },

    Facets                     : [
    {
        $Type  : 'UI.CollectionFacet',
        Label  : 'Auftrag',
        ID     : 'Order',
        Facets : [
            {
                $Type  : 'UI.ReferenceFacet',
                Target : '@UI.FieldGroup#Order',
                Label  : 'Allgemein',
                ID     : 'Order',
            }, {
                $Type  : 'UI.ReferenceFacet',
                Target : 'Items/@UI.LineItem#OrderItems',
                Label  : 'Positionen',
                ID     : 'Orderitem',
            }
        ],
    },
    ],

    FieldGroup #Order        : {
        $Type : 'UI.FieldGroupType',
        Data  : [
        {   
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID'
        },
        {   
            $Type : 'UI.DataField',
            Value : OrderNo
        },
        {
            $Type : 'UI.DataField',
            Value : total,
            Label : 'Total'
        },
        {   
            $Type : 'UI.DataField',
            Value : currency_code
        } 
        ]
    }

});