import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Option {
  id: number;
  option_name: string;
  option_price: number;
  option_description: string;
}

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private apiUrl = 'http://localhost:8000/api'; // Adapte selon ton backend

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les options disponibles depuis l'API.
   */
  getOptions(): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/options`);
  }

  /**
   * (Facultatif) Récupère une option précise.
   */
  getOptionById(id: number): Observable<Option> {
    return this.http.get<Option>(`${this.apiUrl}/options/${id}`);
  }

  getOptionsByLocationId(locationId: string | null): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/location/${locationId}/options`);
  }
}
