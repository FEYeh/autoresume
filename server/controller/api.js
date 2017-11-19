const fs = require('fs');
const path = require('path');

const readJsonFile = (fPath) => {
  return new Promise(function (resolve, reject) {
      fs.readFile(fPath, 'utf8', function(err, data) {
          if (err) {
            reject(err);
          } else {
            try {
              const templateJson = JSON.parse(data);
              resolve(templateJson)
            } catch (e) {
              console.log('json parse error:', e)
              reject(e);
            }
          }
      });
  });
}

const getTemplates = async (ctx, next) => {
  try {
    const templateJsonFile = path.resolve(__dirname, '../../public/data/templates.json')
    const json = await readJsonFile(templateJsonFile)
    // await new Promise(function(reso){
    //   fs.readFileSync(templateJsonFile, 'utf8', function(err, data){
    //       if(err) {
    //         console.log('file read error:', err)
    //         reso({
    //           status: { code: -1, msg: err }
    //         });
    //       } else {
    //         try {
    //           const templateJson = JSON.parse(data);
    //           reso({
    //             status: { code: 0, msg: 'success'},
    //             data: templateJson
    //           })
    //         } catch (e) {
    //           console.log('json parse error:', e)
    //           reso({
    //             status: { code: -2, msg: e }
    //           });
    //         }
    //       }
    //         reso(data.toString());
    //   })
    // }).then(data => {
    //   return data
    // });
    ctx.response.body = {
      status: { code: 0, msg: 'success'},
      data: { resumes: json }
    }
  } catch (e) {
    console.log('server error:', e)
    ctx.response.body =  {
      status: { code: 0, msg: '服务异常' }
    }
  }
};

module.exports = {
  'GET /api/getTemplates': getTemplates,
};