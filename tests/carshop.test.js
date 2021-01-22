const cds = require('@sap/cds');

describe('Carshop: OData Protocol Level Testing', () => {
    const app = require('express')();
    const request = require('supertest')(app);

    beforeAll(async () => {
        await cds.deploy(__dirname + '/../srv/catalog-service').to('sqlite::memory:');
        await cds.serve('CatalogService').from(__dirname + '/../srv/catalog-service').in(app);
    })

    it('Service $metadata document', async () => {
        const response = await request
            .get('/browse/$metadata')
            .expect('Content-Type', /^application\/xml/)
            .expect(200)
        //console.log(response.text);

        const expectedVersion = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">'
        //console.log(expectedVersion);
        const expectedCarsEntitySet = '<EntitySet Name="Cars" EntityType="CatalogService.Cars">'
        //console.log(expectedVersion);

        expect(response.text.includes(expectedVersion)).toBeTruthy()
        expect(response.text.includes(expectedCarsEntitySet)).toBeTruthy()
    })

    it('Check endpoint /browse/Cars with ID value of 100', async () => {
        const resultCars = [ {
                ID: 100,
                //descr: 'Limousine',
                model: '330',
                manufacturer: 'BMW',
                //price: 12.12,
                //stock: 10,
                //engineType: 'Benzin',
                //enginePowerKw: 120,
                //color: 'red',
                //currency_code: 'EUR'
            } ];

        const response = await request
            .get('/browse/Cars?&$select=ID,model,manufacturer&$filter=ID eq 100')
            .expect('Content-Type', /^application\/json/)
            .expect(200)

        //console.log(response.body.value);

        expect(response.body.value).toEqual(resultCars);
    })
})

describe('Carshop: CDS Service Level Testing', () => {
    let srv, Cars;

    beforeAll(async () => {
        srv = await cds.serve('CatalogService').from(__dirname + '/../srv/catalog-service');
        //console.log(srv);
        Cars = srv.entities.Cars;
        //console.log(Cars);
        expect(Cars).toBeDefined();
    });

    it('GET all cars', async () => {
        const resultCars = [
            { descr: 'Limousine' },
            { descr: 'Sportauto' },
            { descr: 'E-Cheep' },
            { descr: 'E-Limousine' }
        ];

        //Model Reflection API
        const carRead = await srv.read(Cars, b => {b.descr});
        console.log(carRead);
        expect(carRead).toMatchObject(resultCars);

        //Parsing CQL
        let queryCQL = cds.parse.cql('SELECT descr from CatalogService.Cars');
        let carsCQL = await cds.run(queryCQL);
        //expect(carsCQL).toMatchObject(resultCars);

        //Query building
        let query = SELECT.from('CatalogService.Cars').columns('descr');
        let cars = await cds.run(query);
        //expect(cars).toMatchObject(resultCars);

        //Constructing CQN objects
        let queryCQN = { SELECT: { from: { ref: ['CatalogService.Cars'] }, columns: [{ ref: ['descr'] }] } };
        let carsCQN = await cds.run(queryCQN);
        //expect(carsCQN).toMatchObject(resultCars);
    })
})