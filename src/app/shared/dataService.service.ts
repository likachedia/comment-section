import { Injectable } from "@angular/core";
import { default as data } from '../../data.json';
import { Data } from "./utils";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    getData() {
        return new Promise<Data>((resolve, reject) => {
            setTimeout(()=> resolve(data), 2000)         
        })
    }
}