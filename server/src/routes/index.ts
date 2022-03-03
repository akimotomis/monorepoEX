// MemoApl - routes\index.js

// (a)使用モジュールの読み込み
import express from 'express';
// var express = require('express');
import luxon from 'luxon';
// var moment = require('moment-timezone');
import uuid from 'uuid';
// var uuid = require('uuid');
var memo = require('../models/memo');
// var package = require('../package.json');

// (b)ルーターの作成
var router = express.Router();

// (1)メモ一覧
router.get(
  '/',
  function (
    _req: any,
    res: {
      status: (arg0: number) => void;
      json: (arg0: {
        status: number;
        response: string;
        message: { list: any };
      }) => void;
    }
  ) {
    memo.list(function (_err: any, list: any) {
      res.status(200);
      res.json({
        status: 200,
        response: 'メモ一覧を返却',
        message: { list },
      });
    });
  }
);

// (2)既存メモの取得
router.get(
  '/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  function (
    req: { params: { id: any } },
    res: {
      status: (arg0: number) => void;
      json: (arg0: {
        status: number;
        response: string;
        message: { doc: any };
      }) => void;
    }
  ) {
    var id = req.params.id;

    memo.get(id, function (_err: any, doc: any) {
      res.status(200);
      res.json({
        status: 200,
        response: 'メモを返却',
        message: { doc },
      });
    });
  }
);

// (3)新規メモの保存（登録）
router.post(
  '/memos',
  function (
    req: { body: { title: any; content: any } },
    res: {
      status: (arg0: number) => void;
      json: (arg0: {
        status: number;
        response: string;
        messages: string;
      }) => void;
    }
  ) {
    console.log('--router.post--/memos');

    var id = uuid.v4();
    var doc = {
      title: req.body.title,
      content: req.body.content,
      updatedAt: luxon.DateTime.local()
        .setZone('Asia/Tokyo')
        .toFormat('YYYY/MM/DD HH:mm:ss'),
    };

    memo.save(id, doc, function (_err: any) {
      res.status(200);
      res.json({
        status: 200,
        response: 'メモを登録',
        messages: '',
      });
    });
  }
);

// (4)既存メモの保存（更新）
router.put(
  '/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  function (
    req: { params: { id: any }; body: { title: any; content: any } },
    res: {
      status: (arg0: number) => void;
      json: (arg0: {
        status: number;
        response: string;
        messages: string;
      }) => void;
    }
  ) {
    console.log('--router.put--/memos/:id ', id);

    var id = req.params.id;
    var doc = {
      title: req.body.title,
      content: req.body.content,
      updatedAt: luxon.DateTime.local()
        .setZone('Asia/Tokyo')
        .toFormat('YYYY/MM/DD HH:mm:ss'),
    };

    memo.save(id, doc, function (_err: any) {
      res.status(200);
      res.json({
        status: 200,
        response: 'メモを更新',
        messages: '',
      });
    });
  }
);

// (6)既存メモの削除
router.delete(
  '/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  function (
    req: { params: { id: any } },
    res: {
      status: (arg0: number) => void;
      json: (arg0: {
        status: number;
        response: string;
        messages: string;
      }) => void;
    }
  ) {
    var id = req.params.id;

    memo.remove(id, function (_err: any) {
      res.status(200);
      res.json({
        status: 200,
        response: 'メモを削除',
        messages: '',
      });
    });
  }
);

export default router;
