/**
 * API Service Layer
 * Централизованная работа с API
 */

import { Post } from "../types";

const API_BASE_URL = "https://cloud.codesupply.co/endpoint/react";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

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
   */
  private async fetchWithRetry(
    url: string,
    options: FetchOptions = {},
    retries: number = 0
  ): Promise<Response> {
    try {
      // Проверка подключения
      if (!navigator.onLine) {
        throw new Error("Нет подключения к интернету");
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        // Повторяем запрос при ошибках сервера (5xx)
        if (response.status >= 500 && retries < MAX_RETRIES) {
          await this.delay(RETRY_DELAY * (retries + 1));
          return this.fetchWithRetry(url, options, retries + 1);
        }
        throw new ApiError(response.status, response.statusText);
      }

      return response;
    } catch (error) {
      // Проверка подключения при ошибке
      if (!navigator.onLine) {
        throw new Error("Нет подключения к интернету");
      }

      // Повторяем при сетевых ошибках
      if (retries < MAX_RETRIES && error instanceof TypeError) {
        await this.delay(RETRY_DELAY * (retries + 1));
        return this.fetchWithRetry(url, options, retries + 1);
      }

      throw error;
    }
  }

  /**
   * Выполняет запрос к API
   */
  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithRetry(url, options);
    return response.json();
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST запрос
   */
  async post<T>(
    endpoint: string,
    data: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT запрос
   */
  async put<T>(
    endpoint: string,
    data: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  /**
   * Задержка для retry
   */
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Получение постов
   */
  async getPosts(): Promise<Post[]> {
    return this.get<Post[]>("/data.json");
  }
}

// Singleton instance
export const api = new ApiService();
