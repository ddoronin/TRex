import {HttpStatus} from "./HttpStatus";

export class HttpBag<T>{
    status: HttpStatus;
    data: T;
}
