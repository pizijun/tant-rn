# tant-rn

由 Typescript 和 React Hooks 实现的 React Native UI 组件库，不依赖 Native 模块。[文档请见这里](https://pizijun.github.io/docs/index.html#/)

## 安装

```text
npm i tant-rn -S
# or
yarn add tant-rn
```

## 示例

```text
import React from 'react';
import { View } from 'react-native';
import { NavBar } from 'tant-rn';

const App = () => {
  return (
    <View>
      <NavBar title="标题" />
    </View>
  );
};
```

## 运行示例预览程序
```
git clone git@github.com:pizijun/tant-rn.git
cd tant-rn/TantExample
yarn install
```
在 iOS 下运行:
```
react-native run-ios
```
在 Android 下运行:
```
react-native run-android
```

## 组件完成度

- [] ActionSheet
- [] Button
- [x] CountDown
- [x] Dialog
- [] DatePicker
- [x] Empty
- [x] InfiniteLoading
- [x] NavBar
- [x] Overlay
- [x] Popup
- [x] Search
- [x] Stepper
- [x] Tabs
