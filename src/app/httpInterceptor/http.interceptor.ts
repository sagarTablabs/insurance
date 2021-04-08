import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { emitWarning } from 'process';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class apiInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService,) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // if (event.status == 200 && !event.body.success) {
            //   this.toastr.showWarning(event.body.message, 'Warning..!');
            // } else if (event.status == 200 && event.body.success) {
            //   this.toastr.showWarning(event.body.message, 'Success..!');
            // }
            // if (event.status == 200) {
              
            //       this.toastr.showSuccess(event.body.message, 'Success..!');
               
              
            // }
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("demo", error);
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            switch (error.status) {
              case 400:
                this.toastr.error("Bad Request")
                break;
              case 415:
                this.toastr.error("Unsupported Media Type")
                break;
              case 500:
                this.toastr.error("Internal Server Error")
                break;
                case 0:
                  this.toastr.error("Internal Server Error", `Error..!`)
                  break;
              default:
              // code block
            }
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        }

        )

      )
  }
}
