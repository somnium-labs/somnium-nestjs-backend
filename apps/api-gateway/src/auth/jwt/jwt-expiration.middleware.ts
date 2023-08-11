import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtExpirationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      try {
        const decodedToken: any = jwt.decode(token);
        if (
          decodedToken &&
          decodedToken.exp &&
          Date.now() >= decodedToken.exp * 1000
        ) {
          // 토큰이 만료되었을 경우, 적절한 처리를 수행하세요.
          return res.status(419).json({ message: 'Token has expired' });
        }
      } catch (error) {
        // 토큰 디코드에 실패하거나 유효하지 않은 토큰일 경우, 적절한 처리를 수행하세요.
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    next();
  }
}
