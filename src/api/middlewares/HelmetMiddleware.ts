import helmet from 'helmet';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Request, Response, ErrorRequestHandler } from 'express';

@Middleware({ type: 'before' })
export class HelmetMiddleware implements ExpressMiddlewareInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public use(request: Request, response: Response, next?: (err?: ErrorRequestHandler) => any): any {
        return helmet()(request, response, next);
    }
}   