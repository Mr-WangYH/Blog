<!--
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-07-18 17:16:26
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-08-04 14:16:01
-->

# 工作中用到的 npm 包

## react-print-html

我们知道，window.print()可以调起打印功能，但是直接用 window.print()如果直接打印的话，没有样式，而且默认打印的是整个网页的内容。在 react 项目中就可以直接使用 react-print-html 插件

```js
import PrintList from 'react-print-html';

PrintList(dom, option);
//dom
通过ref获取的节点
//option 可以不传
{
  noPrint: '.no-print',//不打印元素的class名
  type: 'window',//打印方式，两个值 window， iframe
}
```

## md5

对用户信息，密码等私密信息进行加密处理的工具

```js
import md5 from 'js-md5';
md5(需要加密的信息);
```

## react 长列表

react-window

- 不用全部加载出所有 DOM 节点。默认只渲染可视区域及可视区域外的一个节点，属性可自定义设置
- 可用于处理大型数据列表。

如何使用

1. FixedSizeList(固定尺寸列表)

```js
import { FixedSizeList } from 'react-window';
/**
 * 每个列表项的组件
 * @param  index:列表项的下标; style:列表项的样式(此样必须传入列表项的组件中，否则滚动到下方会出现空白的情况)
 **/
const Row = ({ index, style }) => <div style={style}>Row{index}</div>;
const Example = () => (
  <FixedSizeList
    height={150} // 列表可视区的高度
    itemCount={1000} // 列表数据长度
    itemSize={35} //每一项的行高
    width={300} //列表可视区的宽度
  >
    {Row}
  </FixedSizeList>
);
```

2. VariableSizeList (可变尺寸列表)

```js
import { VariableSizeList } from 'react-window';
const rowHeights = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 50));
const getItemSize = (index) => rowHeights[index];
/**
 * 每个列表项的组件
 * @param  index:列表项的下标; style:列表项的样式(此样必须传入列表项的组件中，否则滚动到下方会出现空白的情况)
 **/
const Row = ({ index, style }) => <div style={style}>Row{index}</div>;
const Example = () => (
  <VariableSizeList
    height={150} // 列表可视区的高度
    itemCount={1000} // 列表数据长度
    itemSize={getItemSize} //每一项的行高
    width={300} //列表可视区的宽度
    layout='vertical' //默认为'vertical',此为设置列表的方向
  >
    {Row}
  </VariableSizeList>
);
```

## react-infinite-scroll-component 实现滚动加载

[react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)

```js
import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import InfiniteScroll from 'react-infinite-scroll-component';
export default () => {
  const [list, setList] = useState([]);
  const requestList = () => {
    setTimeout(async () => {
      const response = await request.get('/api/notes/list', {
        params: {
          name: 12,
        },
      });
      setList(list.concat(response.list));
    }, 1000);
  };
  useEffect(() => {
    requestList();
  }, []);
  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={requestList}
        hasMore={false}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<h4>Loading...</h4>}
      >
        {list.map((item, index) => (
          <div style={{ height: 100 }} key={index}>
            {item.id}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
```

## react-sortable-hoc

拖动排序，支持手机屏幕拖动

```js
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
//SortableContainer:可排序容器
//SortableElement:可排序元素
//SortableHandle:可排序手柄
```

[使用方法](https://www.5axxw.com/wiki/content/hrpw3t)

[使用方法也可见 antd Table 组件拖拽手柄列基本用法](https://ant.design/components/table-cn/#components-table-demo-drag-sorting-handler)

## array-move

[详情](https://www.npmjs.com/package/array-move)

```js
import { arrayMoveImmutable } from 'array-move';
arrayMoveImmutable(array, fromIndex, toIndex); //会得到一个新数组
//array: 需要移动的数组
//fromIndex: 移动元素的索引
//toIndex: 移动到位置的索引
```

## react-dnd

拖动排序，建立在 HTML5 拖放 API 之上，在触摸屏上不起作用

[详细使用方法](https://blog.csdn.net/songxueing/article/details/98212026)

[文档](https://react-dnd.github.io/react-dnd/about)

## mobx-miniprogram mobx-miniprogram-bindings

微信小程序全局状态管理工具
[文档](https://www.npmjs.com/package/mobx-miniprogram-bindings/v/1.2.0)
