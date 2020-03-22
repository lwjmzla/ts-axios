import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

axios.get('/simple/get',{
  params: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})