const { buildUrl,formQuery } = require('./fetch')

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