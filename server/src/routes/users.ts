// (a)使用モジュールの読み込み
import express = require('express');
// var man = require('../models/memoman');
import path = require('path');

// global
const DUMP = path.resolve(__dirname, './exp/MyMemo.dump');
// var dir = 'exp';
// var file = 'MyMemo.dump';

// (b)ルーターの作成
var router = express.Router();

/* GET db export. */
// router.get('/export', function (req, res) {

//   man.exp(dir, file, function () {
//     res.status(200);
//     res.json({
//       status: 200,
//       response: 'export completed',
//       messages: data
//     })

//   });
// });

/* POST db export. */
router.get('/export', async function (_req, res) {
  console.log('--router.get--/export');

  // await man.exp(dir, file).then((_data: any) => {
  //   console.log('await end');
  // });

  res.download(DUMP, function (err) {
    if (err) {
      console.log('--router.put--/douwnload ERROR' + err);
    } else {
      console.log('download start ');
    }
  });
});

/* PUT db Clear. */
router.put('/Clear', function (_req, _res) {
  // console.log('--router.put--/Clear');
  // man.clear(function () {
  //   res.status(200);
  //   res.json({
  //     status: 200,
  //     response: 'completed',
  //     messages: 'completed',
  //   });
  // });
});

/* PUT db import. */
router.put('/import', function (_req, _res) {
  console.log('--router.put--/import');

  // man.imp(function () {
  //   res.status(200);
  //   res.json({
  //     status: 200,
  //     response: 'メモをクリア',
  //     messages: 'completed',
  //   });
  // });
});

module.exports = router;
export default router;
