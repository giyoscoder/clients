import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://cap-ma.jprq.live/api/",
  timeout: 100000,
//   headers: {'X-Custom-Header': 'foobar'}
});


