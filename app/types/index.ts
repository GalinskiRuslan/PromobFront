export interface IErrorResponse {
  errorText: string | null;
  status: number | null;
  method: string | null;
}
export interface IUser {
  id: number;
  email: string | null;
  tel: string;
  name: string;
  surname: string;
  surname_2: string;
  nickname: string;
  nickname_true: boolean;
  site: string | null;
  instagram: string | null;
  whatsapp: string | null;
  categories_id: any;
  cities_id: number;
  cost_from: number;
  cost_up: number;
  details: string;
  about_yourself: string;
  language: Array<string>;
  photos: string;
  gallery: any;
  role: string;
  is_verified: number;
  created_at: string;
  updated_at: string;
  comments: Array<any>;
  rating: Array<any>;
  ratingAverage: number;
  isActive: {
    is_active: boolean;
    days_left: number;
  };
}
