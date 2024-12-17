interface KeyAuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const KEYAUTH_API_URL = "https://190b-2a01-41e3-2b84-5600-6446-6c65-a64b-8ae4.ngrok-free.app/api/auth/verify-key";

export const verifyKey = async (key: string): Promise<KeyAuthResponse> => {
  if (!key) {
    return {
      success: false,
      error: "License key is required"
    };
  }

  try {
    const response = await fetch(KEYAUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ licenseKey: key }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `HTTP error! status: ${response.status}`
      };
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      error: data.error
    };
  } catch (error) {
    console.error("Error validating license key:", error);
    return {
      success: false,
      error: error instanceof Error && error.message === "Failed to fetch" 
        ? "Unable to connect to authentication server. Please try again later."
        : "Failed to validate license key. Please try again."
    };
  }
};