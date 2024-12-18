interface KeyAuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const KEYAUTH_API_URL = "https://f667-2a01-41e3-2bd3-a100-f85b-46e6-96d4-378b.ngrok-free.app";
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const verifyKey = async (key: string): Promise<KeyAuthResponse> => {
  if (!key) {
    return {
      success: false,
      error: "License key is required"
    };
  }

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(KEYAUTH_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Origin": window.location.origin,
          "Referer": window.location.href
        },
        body: JSON.stringify({ licenseKey: key }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (attempt < MAX_RETRIES - 1) {
          await sleep(RETRY_DELAY);
          continue;
        }
        return {
          success: false,
          error: data.error || `HTTP error! status: ${response.status}`
        };
      }

      return {
        success: data.success,
        message: data.message,
        error: data.error
      };
    } catch (error) {
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY);
        continue;
      }
      return {
        success: false,
        error: error instanceof Error && error.message === "Failed to fetch" 
          ? "Unable to connect to authentication server. Please try again later."
          : "Failed to validate license key. Please try again."
      };
    }
  }

  return {
    success: false,
    error: "Maximum retry attempts reached. Please try again later."
  };
};