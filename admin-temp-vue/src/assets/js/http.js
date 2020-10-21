import axios from 'axios'
import qs from 'qs'


export const post = (params) => {
  return new Promise((reject, resolve) => {
    axios.post(params.url, qs.stringify(params.data),{
      headers: {
				'Content-Type':'application/x-www-form-urlencoded'  //axios默认是 json提交(payload方式)  所以改成表单提交(form data)
			}
    }).then(res => {
      reject(res.data);
    }).catch(err => {
      resolve(err);
    });
  });
}

export const get = (params) => {
  return new Promise((reject, resolve) => {
    axios.get(params.url, {
      params: params.data
    }).then(res => {
      reject(res.data);
    }).catch(err => {
      resolve(err);
    });
  });
}

