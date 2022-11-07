require('jest-fetch-mock').enableMocks()

const { buildUrl,formQuery, callAPI } = require('./fetch')




describe('tests the fetch functions',()=> {

    beforeEach(() => {
        fetch.mockClear();
      });
    
    let url = 'someurl'
    

    it('signs the URL query parameters', () => {
        let filter = "hasUrl:true"
        let expectedQuery = "https://api.rememberthemilk.com/services/rest/?filter=hasUrl%3Atrue&auth_token=token&method=rtm.tasks.getList&api_key=key&v=2&format=json&api_sig=8b6a53fe100ef32615b093514b9c2354"
        let auth ={
            token:  "token",
            key: "key",
            secret: "secret"
        }

        expect(buildUrl(auth,filter)).toBe(expectedQuery);
    });
    
    it('formats the query',() => {
        let inputParams = {
            a: 1,
            c: 2,
            b: 3,
            list: "5,6"
        }
    
        let expectedParams = 'a=1&c=2&b=3&list=5%2C6'
    
        expect(formQuery(inputParams)).toBe(expectedParams)
    })
    
    it('successfully calls the API',async () => {
        fetch.mockResponseOnce(JSON.stringify({ foo:"bar" }),{status:200});
        const res = await callAPI(url)
        expect(res.foo).toEqual("bar");
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    it('handles error response from the API', async () => {
        fetch.mockResponseOnce(JSON.stringify({ foo:"bar" }),{status:400});
        console.error = jest.fn()
        const res = await callAPI(url)
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('There was an error')
    })

    it('catches unhandled exceptions', async () => {
        fetch.mockReject(new Error('Some error'));
        console.error = jest.fn()
        const res = await callAPI(url)
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(new Error('Some error'))
    })
})
