import axios from 'axios';
import { message } from 'antd';

class ModelBase {
  // get
  $get(url, params) {
    return axios.get(url, { params }).then((result) => {
      let code = null;
      let msg = null;
      code = result.data.status && result.data.status.code;
      msg = (result.data.status && result.data.status.msg) || result.data.msg;
      if (code !== 0) {
        message.error(msg);
        return result;
      }
      return result;
    });
  }
  // post
  $post(url, params) {
    return axios.post(url, params).then((result) => {
      let code = null;
      let msg = null;
      code = result.data.status && result.data.status.code;
      msg = (result.data.status && result.data.status.msg) || result.data.msg;
      if (code !== 0) {
        message.error(msg);
        return result;
      }
      return result;
    });
  }
}
export default ModelBase;
