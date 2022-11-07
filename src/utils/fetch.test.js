const fetchMock = require("jest-fetch-mock")

const { buildUrl,formQuery, callAPI } = require('./fetch')


fetchMock.enableMocks();


let filter = "hasUrl:true"
let expectedQuery = "https://api.rememberthemilk.com/services/rest/?filter=hasUrl%3Atrue&auth_token=token&method=rtm.tasks.getList&api_key=key&v=2&format=json&api_sig=8b6a53fe100ef32615b093514b9c2354"
let auth ={
    token:  "token",
    key: "key",
    secret: "secret"
  }

test('builds the URL string', () => {
    expect(buildUrl(auth,filter)).toBe(expectedQuery);
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

test('calls the API',async () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));
    let url = 'https://dork.com'
    const foo = await callAPI(url)

    expect(foo.rates.CAD).toEqual(1.42);
    expect(fetch).toHaveBeenCalledTimes(1);
})