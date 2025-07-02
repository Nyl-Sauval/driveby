export interface Retour {
  id: string;
  dateRetour?: Date,
  mileage?: number,
  fuel?: number,
  exteriorStatus?: string,
  interiorStatus?: string,
  default?: string,
  done?: boolean,
  avenant?: Avenant
}

export interface Avenant {
  date: string;
  details: string;
  prix: number;
}

export function createFakeRetour(): Retour {
  return {
    id: '-1',
    dateRetour: undefined,
    mileage: undefined,
    fuel: undefined,
    exteriorStatus: '',
    interiorStatus: '',
    default: '',
    done: false
  };
}


