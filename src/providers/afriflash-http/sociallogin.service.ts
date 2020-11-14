import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SocialloginService {
    url: string;

    constructor(private http: HttpClient) {
    }

    Savesresponse(responce) {
        console.log(responce);
        this.url = 'http://localhost:3000/login/save';
        return this.http.post(this.url, responce);
    }
}
