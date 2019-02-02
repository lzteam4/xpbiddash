import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";


@Injectable()
export class UserService {

    constructor(private http: HttpClient, route: ActivatedRoute) { }

    getAll() {
        return this.http.get('/api/user');
    }
}
