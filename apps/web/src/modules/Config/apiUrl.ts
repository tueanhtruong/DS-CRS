import * as Yup from 'yup';

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const apiUrlSchema = Yup.string()
  .required()
  .test('is-url-valid', 'API URL is not valid', (value) => isValidUrl(value));

export class ApiUrlConfig {
  public readonly apiUrl: string;

  constructor() {
    const url = process.env.NEXT_PUBLIC_API_URL;
    apiUrlSchema.validateSync(url);
    this.apiUrl = url!;
  }
}
