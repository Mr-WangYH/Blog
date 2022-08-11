<!--
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-07-18 17:08:03
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-08-08 08:02:47
-->

# webpack

## chunk 和 bundle 的区别

1. chunk
   chunk 是 webpack 打包过程中 modules 的集合，是打包过程中的概念

webpack 的打包是从一个入口模块开始，入口模块引入其他模块，其他模块引入其他模块...

webpack 通过引用关系逐个打包模块，这些 module 就形成了一个 chunk

如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个 chunk

2. bundle
   是我们最终输出的一个或者多个打包好的文件
3. chunk 和 bundle 的关系
   大多数情况下，一个 chunk 会生产一个 bundle，但是也有例外。

   但是如果家里 sourcemap，一个 entry，一个 chunk 对应两个 bundle

   chunk 是过程中代码块，bundle 是打包结果输出的代码块，chunk 在构建完成就呈现为 bundle

4. split chunk

## Plugin 和 Loader 分别是做什么的，怎么工作的？

1. loader
   模块转换器，将非 js 模块转化为 webpack 能识别的 js 模块。

本质上，webpack loader 将所有类型文件，转换为应用程序的**依赖图**可以直接引用的模块。

2. Plugin
   扩展插件，webpack 运行的各个阶段，都会广播出对应的事件，插件去监听对应的事件。

3. Compiler
   是一个对象，包含了 webpack 环境的所有配置信息，包含 options，loader，plugins。

webpack 启动的时候实例化，它是全局唯一的，可以把它理解为 webpack 的实例。

4. Compliation
   包含了当前的模块资源，编译生成资源。

webpack 在开发模式下运行的时候，每当检测到一个文件的变化，都会创建一次新的 compliation。

## 简单描述一下 webpack 的打包过程

1. 初始化参数：shell webpack.config.js
2. 开始编译：初始化一个 compiler 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找出所有的入口文件
4. 编译模块：从入口文件开始，调用所有的 loader，再去递归找依赖
5. 完成模块编译：得到每个模块被翻译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据得到的依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成：根据配置，确定输出的文件名以及文件路径
