export interface Retrait {
  id: string;
  dateRetrait?: Date,
  mileage?: number,
  fuel?: number,
  exteriorStatus?: string,
  interiorStatus?: string,
  default?: string,
  done?: boolean
}

export function createFakeRetrait(): Retrait {
  return {
    id: '-1',
    dateRetrait: undefined,
    mileage: undefined,
    fuel: undefined,
    exteriorStatus: '',
    interiorStatus: '',
    default: '',
    done: false
  };
}


