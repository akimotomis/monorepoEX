// MemoApp – models\credentials.js (Cloudant版)
// (a)使用モジュールの読み込み
import cfenv from 'cfenv';
// 資格情報の取得
// https://qiita.com/MahoTakara/items/842a6d3690015e720ff7#vcap-localjson
// var services = JSON.parse(process.env.VCAP_SERVICES);
// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('../vcap-local.json');
  console.log('Loaded local VCAP');
} catch (e) {}

var appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {};
var appEnv = cfenv.getAppEnv(appEnvOpts);

// Initialize database with credentials
//   CF service named 'cloudantNoSQLDB'
var cloudant = appEnv.services['cloudantNoSQLDB'][0].credentials;

module.exports = cloudant;
export default cloudant;
