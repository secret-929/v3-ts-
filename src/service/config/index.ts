// 区分开发生产环境
// 1.手动切换域名
// export const BASE_URL = 'http://codercba.com:8000'
// export const BASE_URL = 'xxxxx'

// 2.代码逻辑判断,判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV)
// console.log(import.meta.env.PROD)
// console.log(import.meta.env.SSR) // 是否是服务器端渲染

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  BASE_URL = 'http://152.136.185.210:5000'
}

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_NODE)

export { BASE_URL }
export const TIME_OUT = 10000
