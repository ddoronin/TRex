import {HttpStatus} from "./HttpStatus";

export interface HttpBag<T, E> {
    status: HttpStatus;
    data?: T;
    error?: E;
}
