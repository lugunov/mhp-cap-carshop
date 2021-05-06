using CatalogService as service from '../../srv/catalog-service';

annotate CatalogService.Cars with {
    title @( Common: { Label: '{i18n>Title}'});
}

annotate CatalogService.Cars with @(
	UI: {
        HeaderInfo: {
            TypeName: '{i18n>Car}',
            TypeNamePlural: '{i18n>Cars}',
            Description: {Value: model}
        },
		HeaderFacets: [
			{$Type: 'UI.ReferenceFacet', Label: '{i18n>Description}', Target: '@UI.FieldGroup#Descr'},
		],
		Facets: [
			{$Type: 'UI.ReferenceFacet', Label: '{i18n>Details}', Target: '@UI.FieldGroup#Price'},
		],
		FieldGroup#Descr: {
			Data: [
				{Value: descr},
			]
		},
		FieldGroup#Price: {
			Data: [
				{Value: price, Label: '{i18n>Price}'},
				{Value: currency_code, Label: '{i18n>Currency}'},
			]
		},
	}
);

annotate CatalogService.Cars with @(
	UI: {
	  SelectionFields: [ ID, model, currency_code ],
        LineItem: [
            {Value: model, Label:'{i18n>Model}'},
            {Value: price, Label: '{i18n>Price}'},
            {Value: currency.symbol, Label:' '},
        ]
	}
);