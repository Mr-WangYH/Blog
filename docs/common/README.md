<!--
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-07-18 17:11:50
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-08-08 23:26:23
-->

# 基本技能

## http

### http 状态码

当浏览者访问一个网页时，浏览者的浏览器会向网页所在服务器发出请求。当浏览器接收并显示网页前，此网页所在的服务器会返回一个包含 HTTP 状态码的信息头用以响应浏览器的请求。

主要有以下 5 种响应类别的状态码

**1xx** 信息性状态码，接收的请求正在处理

- **100** 继续。客户端应继续其请求
- **101** 切换协议。服务器根据客户端的请求切换协议，只能切换到更高级的协议

**2xx** 成功状态码，请求正常处理完毕

- **200** 表示从客户端发来的请求在服务器端被正常处理 \*
- **201** 已创建。成功请求并创建了新的资源
- **202** 已接受。已经接受请求，但未处理完成
- **203** 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本
- **204** 服务器接收的请求已成功处理，但在返回的响应报文中 不含实体的主体部分 \*
- **206** 表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求 \*

**3xx** 重定向状态码，表明浏览器需要执行某些特殊的处理以正确处理请求

- **301** 永久性重定向，该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI \*
- **302** 临时性重定向，该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问 \*
- **303** 表示资源存在着另一个 URL，应使用 GET 方法定向获取请求的资源 \*
- **304** 表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况 \*
- **307** 临时重定向，和 302 有着相同的含义 \*

**4xx** 客户端错误状态码，请求包含语法错误或无法完成请求

- **400** 表示请求报文中存在语法错误 \*
- **401** 表示发送的请求需要有通过 HTTP 认证（BASIC 认证、 DIGEST 认证）的认证信息 \*
- **403** 表示对请求资源的访问被服务器拒绝 \*
- **404** 表示服务器上无法找到请求的资源 \*

**5xx** 服务器错误状态码，服务器在处理请求的过程中发生了错误

- **500** 表示服务器端在执行请求时发生了错误
- **503** 表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求

## git

### 你哈