export interface CountryProps {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Timezone[];
  translations: Record<string, string>;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface Product {
  id: string;
  ingredients: string[];
  skin_types: {
    code: number;
    verbose_name: string;
  }[];
  skin_needs: {
    code: number;
    verbose_name: string;
  }[];
  skin_solar_needs: any[];
  image: string;
  score: null | number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  name: string;
  size: number;
  size_type: string;
  characteristics: string;
  recommended_use: string;
  contraindications: string;
  price: number | null;
  url: string;
  category: {
    code: string;
    verbose_name: string;
  };
  type: {
    code: number;
    verbose_name: string;
  };
}
