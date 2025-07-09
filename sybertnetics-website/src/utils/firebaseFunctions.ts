// API utilities - Using Netlify Functions for production reliability
const FUNCTIONS_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sybertnetics.com/.netlify/functions'
  : 'http://localhost:8888/.netlify/functions';

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

// Helper function to make API calls
async function callFunction<T>(
  functionName: string, 
  method: 'GET' | 'POST' | 'PUT' = 'POST',
  body?: unknown,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const url = `${FUNCTIONS_BASE_URL}/${functionName}`;
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
    console.error(`Error calling ${functionName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

// Beta signup functions
export const addBetaSignup = async (signupData: BetaSignupData): Promise<ApiResponse> => {
  return callFunction('betaSignup', 'POST', signupData);
};

export const getBetaSignups = async (token: string): Promise<ApiResponse> => {
  return callFunction('getBetaSignups', 'GET', undefined, token);
};

// Contact form functions
export const addContactMessage = async (messageData: ContactMessageData): Promise<ApiResponse> => {
  return callFunction('contact', 'POST', messageData);
};

export const getContactMessages = async (token: string): Promise<ApiResponse> => {
  return callFunction('getContactMessages', 'GET', undefined, token);
};

// Newsletter functions
export const addNewsletterSignup = async (signupData: NewsletterSignupData): Promise<ApiResponse> => {
  return callFunction('newsletterSignup', 'POST', signupData);
};

export const getNewsletterSubscriptions = async (token: string): Promise<ApiResponse> => {
  return callFunction('getNewsletterSubscriptions', 'GET', undefined, token);
};

// Content management functions
export const getPageContent = async (pagePath: string, token: string): Promise<ApiResponse> => {
  const url = `${FUNCTIONS_BASE_URL}/getContent?path=${encodeURIComponent(pagePath)}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    return {
      success: true,
      data: data.content
    };
  } catch (error) {
    console.error('Error getting page content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
};

export const savePageContent = async (pagePath: string, content: string, token: string): Promise<ApiResponse> => {
  const url = `${FUNCTIONS_BASE_URL}/saveContent?path=${encodeURIComponent(pagePath)}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    console.error('Error saving page content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
};

// Discord member count function - now using Netlify Functions for production reliability
export const getDiscordMemberCount = async (): Promise<number> => {
  try {
    console.log('Attempting to fetch Discord member count...');
    
    // Use Netlify Function instead of Next.js API route for production reliability
    const netlifyUrl = `${FUNCTIONS_BASE_URL}/get-discord-member-count`;
    
    console.log('Using Netlify Function URL:', netlifyUrl);
    
    const response = await fetch(netlifyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Discord member count from Netlify Function:', data);
      return data.memberCount || 9;
    }
    
    console.warn('Netlify Function failed with status:', response.status, 'URL:', netlifyUrl);
    
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
  }
  
  // Fallback to current actual count (we know from testing that there are 9 members)
  console.log('Using fallback member count: 9');
  return 9; // Current actual member count from Discord testing
}; 