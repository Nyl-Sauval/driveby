export interface Client {
  id: string;
  client_name: string;
  client_firstname: string;
  client_email: string;
  client_phone?: string;
  client_birth?: string;
  client_address?: string;
  client_postal_code?: string;
  client_city?: string;
  client_country?: string;
  client_license_number?: string;
  client_license_issue_date?: string;
  client_license_expiry_date?: string;
  client_license_country?: string;
}

export function createFakeClient(): Client {
  return {
    id: '-1',
    client_name: '',
    client_firstname: '',
    client_email: '',
    client_phone: '',
    client_birth: '',
    client_address: '',
    client_postal_code: '',
    client_city: '',
    client_country: '',
    client_license_number: '',
    client_license_issue_date: '',
    client_license_expiry_date: '',
    client_license_country: '',
  };
}


