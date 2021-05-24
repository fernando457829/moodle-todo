import axios from 'axios';
import qs from 'qs';

const api = axios.create({ responseType: 'json' });

export default api;

export async function authenticate(url: string, username: string, password: string) {
  const { data } = await api.post(
    `${url}/login/token.php`,
    qs.stringify({
      service: 'moodle_mobile_app',
      username,
      password,
    }),
  );

  return data;
}

export async function webservice(url: string, wstoken: string, wsfunction: string, args: any = {}) {
  const { data } = await api.post(
    `${url}/webservice/rest/server.php`,
    qs.stringify({
      wstoken,
      wsfunction,

      moodlewsrestformat: 'json',
      moodlewssettingraw: false,
      moodlewssettingfileurl: true,
      moodlewssettingfilter: false,

      ...args,
    }),
  );

  return data;
}

export async function upload(url: string, wstoken: string, file: File) {
  const formData = new FormData();

  formData.append('token', wstoken);
  formData.append('file', file);

  const { data } = await api.post(`${url}/webservice/upload.php`, formData);

  return data;
}
