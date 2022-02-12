// MemoApp - app.js

// (a)使用モジュールの読み込み
import express = require('express');
import path = require('path');
// var cors = require('cors');
// var path = require('path');
import logger = require('morgan');
import bodyParser = require('body-parser');
import * as indexRouter from './routes/index';
// import * as usersRouter from './routes/users';

// global
// const DUMP = path.resolve(__dirname, './exp/MyMemo.dump');

// (b)アプリケーションの作成
const app = express();

// (c)ビューの設定
app.set('views', path.join(__dirname, 'views'));

// (d)ミドルウェアの設定
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const newLocal = '';
// (e)ルーティングの設定
// app.use('/api/dbman', usersRouter.default);
app.use('/api/', indexRouter.default);

//app.use('/', routes);
//app.use(express.static(path.join(__dirname, './bin')));

app.use(express.static(path.join(__dirname, './views')));
app.use('/*', express.static(path.join(__dirname, './views/index.html')));
app.use(express.static(path.join(__dirname, './exp')));
// console.log('__dirname ' + __dirname);

// module.exports = app;
export default app;
