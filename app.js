import fs from 'fs';
import path from 'path';
import http from 'http';
import { exec,spawn } from 'child_process';

import Koa from 'koa';
import Static from 'koa-static';
import Router from 'koa-router';
import convert from 'koa-convert';

import https from 'https';

const httpPort = 1314;
const httpsOption = {
	key: fs.readFileSync(path.join(__dirname, './pem/privatekey.pem')),
	cert: fs.readFileSync(path.join(__dirname, './pem/certificate.pem'))
};

const app = new Koa();
const server = https.createServer(httpsOption, app.callback());

const router = Router();

router.get('/', async (ctx, next) => {
	ctx.body = fs.readFileSync('./index.html', 'utf-8');
})

import InitSocket from './socket/index.js';
InitSocket(app, server);

app.use(router.routes(), router.allowedMethods());

// static
app.use(convert(Static(path.join(__dirname, 'static'))));

server.listen(httpPort);

console.log(`server listening on ${httpPort}`);
