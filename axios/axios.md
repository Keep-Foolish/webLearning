# axios

## json-server

- 快速构建一个假的 REST API

1. 安装 npm install -g json-server
2. 构建 db.json
3. 启动服务 json-server --watch db.json

## axios 使用

### 特点

1. 基于 xhr + promise 的异步 ajax 请求库
2. 浏览器端/node 端都可以使用
3. 支持请求／响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

### 常用语法

1. axios(config): 通用/最本质的发任意类型请求的方式
2. axios(url[, config]): 可以只指定 url 发 get 请求
3. axios.request(config): 等同于 axios(config)
4. axios.get(url[, config]): 发 get 请求
5. axios.delete(url[, config]): 发 delete 请求
6. axios.post(url[, data, config]): 发 post 请求
7. axios.put(url[, data, config]): 发 put 请求
8. axios.defaults.xxx: 请求的默认全局配置
9. axios.interceptors.request.use(): 添加请求拦截器
10. axios.interceptors.response.use(): 添加响应拦截器
11. axios.create([config]): 创建一个新的 axios(它没有下面的功能)
12. axios.Cancel(): 用于创建取消请求的错误对象
13. axios.CancelToken(): 用于创建取消请求的 token 对象
14. axios.isCancel(): 是否是一个取消请求的错误
15. axios.all(promises): 用于批量执行多个异步请求
16. axios.spread(): 用来指定接收所有成功数据的回调函数的方法

#### config 配置对象

**config 本身就是一个对象**

```JS
{
  url: '/user',

  method: 'get',

  baseURL: 'https://some-domain.com/api/',

  // 预处理请求数据
  transformRequest: [function (data, headers) {

    return data;
  }],

  // 预处理响应结果
  transformResponse: [function (data) {

    return data;
  }],

  // 配置请求头信息
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // 设定url参数
  params: {
    ID: 12345
  },

  // 参数序列化，将参数转换成字符串 很少用到
  paramsSerializer: {
    encode?: (param: string): string => {},
    serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ),
    indexes: false
  },

  // 请求体设置
  // 如果是对象形式，axios将其转换成json对像传递
  data: {
    firstName: 'Fred'
  },
  // 如果是字符串，axios直接传递
  data: 'Country=Brasil&City=Belo Horizonte',

  // 超时时间，超过这个时间请求就取消
  timeout: 1000, // default is `0` (no timeout)

  // 跨域请求是否携带cookie
  withCredentials: false, // default

  // 对请求的适配器进行设计
  adapter: function (config) {
    /* ... */
  },

  // 请求基础验证 很少用
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // 对响应体结果格式进行设置
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `undefined` (default) - set XSRF header only for the same origin requests
  withXSRFToken: boolean | undefined | ((config: InternalAxiosRequestConfig) => boolean | undefined),

  // 上传回调
  onUploadProgress: function ({loaded, total, progress, bytes, estimated, rate, upload = true}) {
    // Do whatever you want with the Axios progress event
  },

  // 下载回调
  onDownloadProgress: function ({loaded, total, progress, bytes, estimated, rate, download = true}) {
    // Do whatever you want with the Axios progress event
  },

  // 设置http响应体最大尺寸
  maxContentLength: 2000,

  // 设置请求体最大尺寸
  maxBodyLength: 2000,

  // 对响应结果的成功进行设置(什么情况下算成功)
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // 最大跳转次数限制
  maxRedirects: 21, // default


  beforeRedirect: (options, { headers }) => {
    if (options.hostname === "example.com") {
      options.auth = "user:password";
    }
  },

  // 设定socket文件位置
  socketPath: null, // default

  // `transport` determines the transport method that will be used to make the request. If defined, it will be used. Otherwise, if `maxRedirects` is 0, the default `http` or `https` library will be used, depending on the protocol specified in `protocol`. Otherwise, the `httpFollow` or `httpsFollow` library will be used, again depending on the protocol, which can handle redirects.
  transport: undefined, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` defines the hostname, port, and protocol of the proxy server.
  // You can also define your proxy using the conventional `http_proxy` and
  // `https_proxy` environment variables. If you are using environment variables
  // for your proxy configuration, you can also define a `no_proxy` environment
  // variable as a comma-separated list of domains that should not be proxied.
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // If the proxy server uses HTTPS, then you must set the protocol to `https`.
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  }),

  // an alternative way to cancel Axios requests using AbortController
  signal: new AbortController().signal,

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true, // default

  // `insecureHTTPParser` boolean.
  // Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers.
  // This may allow interoperability with non-conformant HTTP implementations.
  // Using the insecure parser should be avoided.
  // see options https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_request_url_options_callback
  // see also https://nodejs.org/en/blog/vulnerability/february-2020-security-releases/#strict-http-header-parsing-none
  insecureHTTPParser: undefined, // default

  // transitional options for backward compatibility that may be removed in the newer versions
  transitional: {
    // silent JSON parsing mode
    // `true`  - ignore JSON parsing errors and set response.data to null if parsing failed (old behaviour)
    // `false` - throw SyntaxError if JSON parsing failed (Note: responseType must be set to 'json')
    silentJSONParsing: true, // default value for the current Axios version

    // try to parse the response string as JSON even if `responseType` is not 'json'
    forcedJSONParsing: true,

    // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
    clarifyTimeoutError: false,
  },

  env: {
    // The FormData class to be used to automatically serialize the payload into a FormData object
    FormData: window?.FormData || global?.FormData
  },

  formSerializer: {
      visitor: (value, key, path, helpers) => {}; // custom visitor function to serialize form values
      dots: boolean; // use dots instead of brackets format
      metaTokens: boolean; // keep special endings like {} in parameter key
      indexes: boolean; // array indexes format null - no brackets, false - empty brackets, true - brackets with indexes
  },

  // http adapter only (node.js)
  maxRate: [
    100 * 1024, // 100KB/s upload limit,
    100 * 1024  // 100KB/s download limit
  ]
}
```

#### axios 默认配置

**请求对象中的值都可以设置默认值**

```js
axios.defaults.method = "GET";
axios.defaults.baseURL = "localhost:127.0.0.1:8000";
axios.defaluts.params = { id: 100 };
axiosl.defaults.timeout = 3000;
```

### 请求响应结果的结构

response：
1.config（配置对象）：请求 url、请求类型、请求体
2.data（响应体）：axios 将服务器返回结果进行 json 解析，转成了对象
3.header（响应头）
4.request（原生的 AJAX 对象）：XMLHTTPRequest 实例对象 5. status（响应状态码）
6.statusText：响应状态字符串

### axios 创建实例对象发送 AJAX 请求

**axios.create({ })**

```js
//创建实例对象  /getJoke
const duanzi = axios.create({
  baseURL: "https://api.apiopen.top",
  timeout: 2000,
});

// 可以实例化多个axios对象,,方便发送请求
const onather = axios.create({
  baseURL: "https://b.com",
  timeout: 2000,
});
//这里  duanzi 与 axios 对象的功能几近是一样的  也是函数
// duanzi({
//     url: '/getJoke',
// }).then(response => {
//     console.log(response);
// });

duanzi.get("/getJoke").then((response) => {
  console.log(response.data);
});
```

### 拦截器

1. **拦截器就是一些函数**
2. 成功和失败的回调类比**Promsie**
3. 传入的 config 和 response 参数就是配置对象和 axios 默认响应结果
   **(拦截器可以对 config 和 response 中的参数进行处理)**

- 请求拦截器:在发送请求之前借助一些函数对请求的参数和内容进行检查和处理,如果有问题可以取消请求
- 响应拦截器:在处理结果之前对结果进行预处理(记录失败结果,格式化成功结果......)

```js
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
```

## axios 源码分析
