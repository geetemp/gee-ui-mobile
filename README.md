# gee-ui

geetemp 前端团队组件库，目前在 antd 的基础上拓展实现。

## Getting started

#### 安装

```bash
git clone git@git.i.com:gee-lab/gee-ui.git
cd gee-ui
yarn install
```

#### 开发

```bash
yarn dev
```

#### 发布

```bash
yarn build
```

#### 启动 storybook

storybook 是组件的文档工具，你可以启动它来在线查看组件如何使用，以及组件的 demo

```
yarn docs
```

现在你可以在浏览器中打开http://localhost:6006, 查看组件使用文档

## 组件

#### 组件实现

在 src/components 目录下新建一个组件目录，比如 button。现在 components 目录下多了一个 button 目录。

在 button 目录下新建`index.js`文件，用来编写 button 组件的 js 部分

```js
import React from "react";
const AntButton = require("antd/lib/button");

export default class Button extends React.Component {
  render() {
    const props = { type: "danger", ...this.props };
    return <AntButton {...props} className="gee-button" />;
  }
}
```

我们引入了 antd 的 button 组件`require("antd/lib/button")`作为被包装组件，因为我们需要在它的基础上去实现我们的 button 组件。这里我们没有使用`import button from 'antd/lib'`是因为 import 会把整个 antd 组件库引入，增加了代码量。

组件的样式同样也需要先引入`antd/lib/button`的样式，再重写定义自己的样式。在 button 目录下新建`style/index.js`和`style/index.less`两个文件，看下`style/index.js`的内容

```js
import "antd/lib/button/style";
import "./index.less";
```

第一行是引入 antd button 的样式，第二行是引入自定义样式文件，你可以在 index.less 写样式来覆盖 antd button 的默认样式。

#### 组件用例

##### 用例编写

编写组件用例，提供给 storybook 生成使用文档，服务于 gee-ui 的使用者。
新建`button\examples`目录，继续新建一个`danger.js`文件，编写用例组件展示说明 button 组件的 danger 状态，你也可以新建其他用例组件来说明 button 组件的剩余状态，比如 primary,disabled 等。

```js
//danger.js
import React, { Component } from "react";
import "../style";
import Button from "../index";

const sectionStyle = {
  display: "flex",
  flexDirection: "column"
};

const articleStyle = {
  display: "flex",
  margin: "5px 0px"
};

const buttonStyle = {
  marginRight: "5px"
};

export default class extends Component {
  render() {
    return (
      <section style={sectionStyle}>
        <article style={articleStyle}>
          <Button style={buttonStyle} type="danger">
            danger
          </Button>
          <Button type="danger" disabled={true}>
            danger disabled
          </Button>
        </article>
      </section>
    );
  }
}
```

##### 连接 storybook

为了用例能被 storybook 使用，需要在`docs/load-components.js`文件下做以下配置

```js
module.exports = [
  {
    name: "Button",
    component: getDefaultExport(require("../src/components/button")),
    examplesContext: require.context(
      "../src/components/button/examples",
      true,
      /\.jsx?$/
    ),
    examplesContextRaw: require.context(
      "!!raw-loader!../src/components/button/examples",
      true,
      /\.jsx?$/
    )
  },
  {
    name: "Modal",
    component: getDefaultExport(require("../src/components/modal")),
    examplesContext: require.context(
      "../src/components/modal/examples",
      true,
      /\.jsx?$/
    ),
    examplesContextRaw: require.context(
      "!!raw-loader!../src/components/modal/examples",
      true,
      /\.jsx?$/
    )
  }
];
```

我们在`module.exports`数组中新增了一个 button 相关的配置项，这样就完成了组件用例与 storybook 的连接。打开http://localhost:6006 网页侧边栏应该多了一个 Button 项，可以开始查看关于 Button 组件的使用实例。

#### 组件测试

新建`button\button.spec.js`文件...
