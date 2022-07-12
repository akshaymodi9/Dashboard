
const queryUrl = (url,params)=>{
    return url + "?"+ new URLSearchParams(params)
}


export const fetchService = (url, method = "GET", body = null, params = null, additionalHeader) => {
    if (params){
        url = queryUrl(url,params);
    }
    const request = new Request(url, {
        method,
        headers: new Headers({
            "Accept": "application/json; charset=utf-8",
            "Content-type": "application/json; charset=utf-8",
            "Cookie": "mb-client-type=mb-web-ui",
            ...additionalHeader,
        }),
        body,
    });

    return fetch(request)
        .then(response => {
            if(response.status){
                return response.json()
            }    
        })
        .catch(error => ({error}));
};