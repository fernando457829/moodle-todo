import axios, { AxiosTransformer } from 'axios';
import qs from 'qs';

const api = axios.create({
  transformRequest: [
    (data) => qs.stringify(data),
    ...axios.defaults.transformRequest as AxiosTransformer[],
  ],
  responseType: 'json',
});

export default api;

export async function authenticate(url: string, username: string, password: string) {
  const { data } = await api.post(`${url}/login/token.php`, {
    service: 'moodle_mobile_app',
    username,
    password,
  });

  return data;
}

export async function webservice(url: string, wstoken: string, wsfunction: string, args: any = {}) {
  const { data } = await api.post(`${url}/webservice/rest/server.php`, {
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
