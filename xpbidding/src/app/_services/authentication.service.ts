import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";


@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, route: ActivatedRoute) {

    }

    login(username: string, password: string) {
        if (username && password) {
            return this.http.post('/api/authenticate', { username: username, password: password })
                .pipe(
                    map(user => {
                        if (user)
                            localStorage.setItem('currentUser', JSON.stringify(user))

                        return user
                    })
                );
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
