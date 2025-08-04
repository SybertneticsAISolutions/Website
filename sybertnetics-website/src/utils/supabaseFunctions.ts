// API utilities for interacting with Supabase backend

// Types (same as firebaseFunctions.ts)
export interface BetaSignupData {
  email: string;
  name?: string;
  discord?: string;
  experience?: string;
  interests?: string[];
}

export interface ContactMessageData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface NewsletterSignupData {
  email: string;
  name?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Helper function to make API calls to the Next.js backend (same as firebaseFunctions.ts)
async function callApi<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' = 'POST',
  body?: unknown,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const url = `/api/${endpoint}`; // Use relative paths for API routes
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Check if the response is JSON, otherwise return an error
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      console.error(`Error calling ${endpoint}: Invalid response`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Server returned non-JSON response: ${errorText}`);
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    return {
      success: true,
      data,
      message: data.message
    };
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error or invalid JSON response'
    };
  }
}

// Beta signup functions
export const addBetaSignup = async (signupData: BetaSignupData): Promise<ApiResponse> => {
  return callApi('beta-signup-supabase', 'POST', signupData);
};

export const getBetaSignups = async (token: string): Promise<ApiResponse> => {
  return callApi('get-beta-signups-supabase', 'GET', undefined, token);
};

// Contact form functions
export const addContactMessage = async (messageData: ContactMessageData): Promise<ApiResponse> => {
  return callApi('contact-supabase', 'POST', messageData);
};

export const getContactMessages = async (token: string): Promise<ApiResponse> => {
  return callApi('get-contact-messages-supabase', 'GET', undefined, token);
};

// Newsletter functions
export const addNewsletterSignup = async (signupData: NewsletterSignupData): Promise<ApiResponse> => {
  return callApi('newsletter-signup-supabase', 'POST', signupData);
};

export const getNewsletterSubscriptions = async (token: string): Promise<ApiResponse> => {
  return callApi('get-newsletter-signups-supabase', 'GET', undefined, token);
};

// Page content functions (these might stay with Firebase for now)
export const getPageContent = async (pagePath: string, token: string): Promise<ApiResponse> => {
  return callApi('get-page-content', 'GET', undefined, token);
};

export const savePageContent = async (pagePath: string, content: string, token: string): Promise<ApiResponse> => {
  return callApi('save-page-content', 'POST', { pagePath, content }, token);
};

// Discord function (this might stay as is)
export const getDiscordMemberCount = async (): Promise<number> => {
  try {
    const response = await fetch('/api/discord-count');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.memberCount || 0;
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
    return 0;
  }
}; 