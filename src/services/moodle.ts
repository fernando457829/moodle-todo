import axios, { AxiosTransformer } from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: 'http://moodle.funecriacho.com.br',
  transformRequest: [
    (data) => qs.stringify(data),
    ...axios.defaults.transformRequest as AxiosTransformer[],
  ],
  responseType: 'json',
});

export default api;

export async function authenticate(username: string, password: string) {
  const { data } = await api.post('/login/token.php', {
    service: 'moodle_mobile_app',
    username,
    password,
  });

  return data;
}

export async function webservice(wstoken: string, wsfunction: string, args: any = {}) {
  const { data } = await api.post('/webservice/rest/server.php', {
    wstoken,
    wsfunction,

    moodlewsrestformat: 'json',
    moodlewssettingraw: false,
    moodlewssettingfileurl: true,
    moodlewssettingfilter: false,

    ...args,
  });

  return data;
}
