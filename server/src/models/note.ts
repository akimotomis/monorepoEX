// (Cloudant版)

// (a)使用モジュールの読み込み
import cloudant from '../models/credentials';
const cradle = require('cradle');

// Initialize database with cloudant
//   CF service named 'cloudantNoSQLDB'
const table = 'notebook';
const host = cloudant.host;
const port = cloudant.port;
const options = {
  cache: true,
  raw: false,
  secure: true,
  auth: {
    username: cloudant.username,
    password: cloudant.password,
  },
};

// (c)メモを保持するデータベース
const db = new cradle.Connection(host, port, options).database(table);

// (1)メモ一覧の取得
exports.list = function (callback: any) {
  db.view('memos/list', { descending: true }, callback);
};

// (2)メモの取得
exports.get = function (id: any, callback: any) {
  db.get(id, callback);
};

// (3)メモの保存
exports.save = function (id: any, doc: any, callback: any) {
  db.save(id, doc, callback);
};

// (4)メモの削除
exports.remove = function (id: any, callback: any) {
  db.remove(id, callback);
};
