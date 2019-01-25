'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

export default function(app: any) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/client', (req: any, res: any) => {
    console.log(path.join(
      path.normalize(`${__dirname}/..`), ('client' + req.url)
    ));
    res.sendFile(path.join(
      path.normalize(`${__dirname}/..`), ('client' + req.url)
    ));
  })
  app.use(express.static(path.join(
    path.normalize(`${__dirname}/..`), 'dist'
  )));

  // Routes go here



  app.all('/*', (req: any, res: any) => {
    console.log('Requested route not found:');
    console.log(req.url);
    res.sendFile(path.join(
      path.normalize(`${__dirname}/..`), 'client/index.html'
    ));
  });
}
