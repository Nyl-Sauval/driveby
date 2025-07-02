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
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getGuarantees(): Observable<Guarantee[]> {
    const url = `${this.apiUrl}garanties`;
    return this.http.get<Guarantee[]>(url);
  }
}
