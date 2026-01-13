/**
 * API Service Layer
 * Централизованная работа с API
 */

import { Post } from "../types";

// Конфигурация API, env
const API_BASE_URL = "https://cloud.codesupply.co/endpoint/react";
const MAX_RETRIES = 3; // Максимум попыток при ошибках
const RETRY_DELAY = 1000; // Базовая задержка между попытками (ms)

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Кастомная ошибка для HTTP запросов
 */
export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, message?: string) {
    super(message || `HTTP ${status}: ${statusText}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Выполняет fetch с повторными попытками
   * Retry только для GET
   */
  private async fetchWithRetry(
    url: string,
    options: FetchOptions = {},
    retries: number = 0
  ): Promise<Response> {
    try {
      const response = await fetch(url, options);

      // Проверяем, можно ли повторять запрос
      const method = options.method ?? "GET";
      const isRetryable = method === "GET";

      if (!response.ok) {
        // Повторяем только GET при 5xx
        if (isRetryable && response.status >= 500 && retries < MAX_RETRIES) {
          await this.delay(RETRY_DELAY * (retries + 1));
          return this.fetchWithRetry(url, options, retries + 1);
        }
        throw new ApiError(response.status, response.statusText);
      }

      return response;
    } catch (error) {
      // TypeError = сетевая ошибка (нет сети, DNS fail, etc)
      if (retries < MAX_RETRIES && error instanceof TypeError) {
        await this.delay(RETRY_DELAY * (retries + 1));
        return this.fetchWithRetry(url, options, retries + 1);
      }

      throw error;
    }
  }

  /**
   * Базовый метод для запросов к API
   * Проверяет Content-Type перед парсингом JSON
   */
  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithRetry(url, options);

    // Проверяем Content-Type (если есть)
    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error(
        `Invalid response format: expected JSON, got ${contentType}`
      );
    }

    return response.json();
  }

  /**
   * Задержка с экспоненциальным ростом для retry
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Получение списка постов
   */
  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>("/data.json");
  }
}

// Экспортируем singleton для использования в приложении
export const api = new ApiService();
