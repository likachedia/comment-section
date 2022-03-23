import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    
    saveToLocalStorage<T>(key: string, value: T) {
        const stingified = JSON.stringify(value);
        localStorage.setItem(key, stingified);    
    }

    getFromLocalStorage<T>(key: string): T  | null {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null
        // return JSON.parse(localStorage.getItem(key)!)
        // ? JSON.parse(localStorage.getItem(key)!)
        // : [];
    }
}