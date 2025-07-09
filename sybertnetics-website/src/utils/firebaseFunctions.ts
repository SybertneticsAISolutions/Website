// API utilities for interacting with the Next.js backend

// Types
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

// Helper function to make API calls to the Next.js backend
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
  return callApi('beta-signup', 'POST', signupData);
};

export const getBetaSignups = async (token: string): Promise<ApiResponse> => {
  return callApi('get-beta-signups', 'GET', undefined, token);
};

// Contact form functions
export const addContactMessage = async (messageData: ContactMessageData): Promise<ApiResponse> => {
  console.log('Using correct addContactMessage function (v2)');
  return callApi('contact', 'POST', messageData);
};

export const getContactMessages = async (token: string): Promise<ApiResponse> => {
  return callApi('get-contact-messages', 'GET', undefined, token);
};

// Newsletter functions
export const addNewsletterSignup = async (signupData: NewsletterSignupData): Promise<ApiResponse> => {
  return callApi('newsletter-signup', 'POST', signupData);
};

export const getNewsletterSubscriptions = async (token: string): Promise<ApiResponse> => {
  return callApi('get-newsletter-subscriptions', 'GET', undefined, token);
};

// Content management functions
export const getPageContent = async (pagePath: string, token: string): Promise<ApiResponse> => {
  return callApi(`content/${pagePath}`, 'GET', undefined, token);
};

export const savePageContent = async (pagePath: string, content: string, token: string): Promise<ApiResponse> => {
  return callApi(`content/${pagePath}`, 'PUT', { content }, token);
};

// Discord member count function
export const getDiscordMemberCount = async (): Promise<number> => {
  try {
    const response = await fetch('/api/get-discord-member-count');
    
    if (response.ok) {
      const data = await response.json();
      return data.memberCount || 9;
    }
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
  }
  
  // Fallback to a known reasonable value
  return 9;
}; 