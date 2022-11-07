const { buildUrl,formQuery } = require('./fetch')
const config = require('../../config');

jest.mock('../user/index')
const user = require('../user/index')

user.mockImplementation( () => {
    return this._client = {_apiKey: 1234} 
})



let filter = "hasUrl:true"
let expectedQuery = "some string"

test.skip('builds the URL string', () => {
expect(buildUrl(user,filter)).toBe(expectedQuery);
});

test('formats the query',() => {
    let inputParams = {
        a: 1,
        c: 2,
        b: 3,
        list: "5,6"
    }

    let expectedParams = 'a=1&c=2&b=3&list=5%2C6'

    expect(formQuery(inputParams)).toBe(expectedParams)
})