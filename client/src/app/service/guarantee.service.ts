import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Guarantee {
  guarantee_id: number;
  guarantee_name: string;
  guarantee_description: string;
  guarantee_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class GuaranteeService {
  private apiUrl = 'http://localhost:8000/api/guarantees'; // adapte selon ton .env

  constructor(private http: HttpClient) {}

  getGuarantees(): Observable<Guarantee[]> {
    return this.http.get<Guarantee[]>(this.apiUrl);
  }
}
