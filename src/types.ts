// Типы для постов
export interface Post {
  id?: number;
  title: string;
  text?: string;
  img: string;
  img_2x: string;
  tags?: string;
  autor?: string;
  date?: string;
  views?: string;
}

// Типы для меню
export interface MenuItem {
  label: string;
  submenu?: string[];
}

// Типы для API
export interface ApiResponse {
  data?: Post[];
  error?: string;
}
