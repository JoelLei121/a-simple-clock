# a-simple-clock
thu frontend summer course project.

### requirements
use `npm install` to install dependencies. We use react, react-dom, next.js and use-immer.


### dev environment setup
dev: `npm run dev`


### next.js framework structure
`_app.js`: 入口文件，可以在此处放置全局context
`_document.js`: 修改`<head>`, `<body>`等被隐藏的tag，第三方css或js在此处引入
`components`: 部件存放处
`contexts`: 主要用于跨页面的信息传递，慎用
`public\images`: 图片等资源存放处
`pages`: 页面存放处
`styles`: css文件存放处，对于每个部件或页面，建立形如`<name>.module.css`的css文件使用


### dev instruction
`useState`: declare with form of `[state, setState]`. **Never** modify state directly.
`useEffect`: async function called **after** rendering.
`useRoute`: switch pages. Pass props by `query`, use JSON.stringify with object. Use `useEffett` with `route.query` to get data after routing.
`useContext`: to send props deeply. Use it carefully.
