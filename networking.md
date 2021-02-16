### HTTP Get

The example demonstrates different ways, how we could receive content from a server while making HTTP GET request.

```typescript
import { HTTP } from "@nativescript/core";
```

The `getString` method allows us to make a request and to get the response body as a string value.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.getString("https://httpbin.org/get").then(
  (result: string) => {
    viewModel.set("getStringResult", r);
  },
  (e) => {}
);
```

The `getJSON` method gives us a simple way to get the response body as JSON object and to access the data while using all benefits of the JSON.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.getJSON("https://httpbin.org/get").then(
  (result: any) => {
    console.log(result);
  },
  (e) => {}
);
```

`getImage` allow us to get an image from a specific URL. The returned object will be ImageSource and it could be used for direct displaying the source into Image view.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.getImage("https://httpbin.org/image/jpeg").then(
  (r: ImageSource) => {
    // getImage method returns ImageSource object
  },
  (e) => {}
);
```

With `request` method we can make a request and check the response status code by accessing `statusCode` property.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.request({
  url: "https://httpbin.org/get",
  method: "GET",
}).then(
  (response: HttpResponse) => {
    // Argument (response) is HttpResponse
    console.log(response.statusCode);
  },
  (e) => {}
);
```

This example demonstrates, how to get the request-response header and how to access the available data in it.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.request({
  url: "https://httpbin.org/get",
  method: "GET",
}).then(
  (response: HttpResponse) => {
    // Argument (response) is HttpResponse
  },
  (e) => {}
);
```

This example demonstrates, how to get the request-response content and how to represent the received data as a `String` value or `JSON` object. We could also use `toImage` method when we download an image.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.request({
  url: "https://httpbin.org/get",
  method: "GET",
}).then(
  (response: HttpResponse) => {
    // Content property of the response is HttpContent
    const content = response.content;

    // The toString method allows you to get the response body as string.
    const str = content.toString();

    // The toJSON method allows you to parse the received content to JSON object
    // var obj = content.toJSON();

    // The toImage method allows you to get the response body as ImageSource.
    // var img = response.content.toImage();
  },
  (e) => {}
);
```

This example demonstrates how to download a file while using `getFile` method.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.getFile(
  "https://d1lfyz5kwt8vu9.cloudfront.net/nativescript-logo-2021.png"
).then(
  (resultFile) => {
    // The returned result will be File object
  },
  (e) => {}
);
```

> Note: By default the file will be saved in Documents folder.

In the `getFile` method we could also specify the path, where the file to be saved. This scenario is demonstrated in the example below, where the image file will be kept in the current application folder.

```typescript
import { HTTP, knownFolders, path } from "@nativescript/core";

const filePath: string = path.join(knownFolders.currentApp().path, "test.png");
HTTP.getFile(
  "https://httpbin.org/image/png?testQuery=query&anotherParam=param",
  filePath
).then(
  (resultFile: File) => {
    // The returned result will be File object
  },
  (e) => {}
);
```

### HTTP Post

The example demonstrates, how to make HTTP POST request and how to get request response.

```typescript
import { HTTP } from "@nativescript/core";

HTTP.request({
  url: "https://httpbin.org/post",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  content: JSON.stringify({
    username: "testuser@sometestemail.com,
    password: "someEncryptedPasswordValue",
  }),
}).then(
  (response) => {
    const result = response.content.toJSON();
  },
  (e) => {}
);
```

### Methods

| Name                                                                | Type                    | Description                                                                                         |
| ------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| `getFile(url: string, destinationFilePath?: string): Promise<File>` | `Promise<File>`         | Downloads the content from the specified URL and attempts to save it as file.                       |
| `getImage(url: string): Promise<ImageSource>`                       | `Promise<ImageSource>`  | Downloads the content from the specified URL and attempts to decode it as an image.                 |
| `getJSON<T>(url: string): Promise<T>`                               | `Promise<T>`            | Downloads the content from the specified URL as a string and returns its JSON.parse representation. |
| `getString(url: string): Promise<string>`                           | `Promise<string>`       | Downloads the content from the specified URL as a string.                                           |
| `request(options: HttpRequestOptions): Promise<HttpResponse>`       | `Promise<HttpResponse>` | Makes a generic http request using the provided options and returns a HttpResponse Object.          |

### API References

| Name                                                                                    | Type     |
| --------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/http](http://docs.nativescript.org/api-reference/modules/_http_.html) | `Module` |
