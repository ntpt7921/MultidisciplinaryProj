class RequestConfig
{
    static useNoneCookieConfig()
    {
        return {
            headers : {
              "Content-type" : "multipart/form-data",
            }
          }
    }

    static useCookieConfig(token)
    {
        return {
            headers : {
              "Content-type" : "multipart/form-data",
              Cookie : "token="+ token
            }
          }
    }
        
}

module.exports = RequestConfig