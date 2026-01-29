import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                const statusCode = context.switchToHttp().getResponse().statusCode;

                // If data has a 'message' property, use it, else default
                let message = 'Operation successful';
                let finalData = data;

                if (data && typeof data === 'object' && 'message' in data) {
                    message = data.message;
                    const { message: msg, ...rest } = data;
                    // If there are other properties, they become 'data', otherwise data is null
                    finalData = Object.keys(rest).length > 0 ? rest : null;

                    // If 'data' property was explicitly returned inside the object, use it directly (common pattern)
                    if ('data' in rest) {
                        finalData = rest.data;
                    }
                }

                return {
                    statusCode,
                    message,
                    data: finalData,
                };
            }),
        );
    }
}
