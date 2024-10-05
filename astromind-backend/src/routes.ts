import { RequestHandler, Request, Response } from 'express';
import * as AstronMindController from '../src/controller/AstronMindController';
import * as QuestionController from '../src/controller/QuestionController';
export interface IRouteItem {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares: RequestHandler[];
}

/**
 * 所有 application 裡面的 routes 陣列，格式請參考 IRouteItem
 */
export const AppRoutes: IRouteItem[] = [
  {
    path: '/',
    method: 'get',
    middlewares: [
      (req, res) => {
        res.status(200).send('Hello this is Doryyyyyyy');
      },
    ],
  },
  {
    path: '/',
    method: 'post',
    middlewares: [
      AstronMindController.initialExpoPlanets
    ],
  },
  {
    path: '/one/:id',
    method: 'get',
    middlewares: [
      AstronMindController.getChildNodes
    ],
  },
  {
    path: '/parent',
    method: 'get',
    middlewares: [
      AstronMindController.getParentRoot,
    ],
  },
  {
    path: '/question/initial',
    method: 'get',
    middlewares: [
        QuestionController.initialQuestion,
    ],
  },
  {
    path: '/question/all',
    method: 'get',
    middlewares: [
        QuestionController.getAll,
    ],
  },
];
