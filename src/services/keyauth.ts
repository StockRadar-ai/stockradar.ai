interface KeyAuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const KEYAUTH_API_URL = "https://eeae-2a01-41e3-2af6-f600-a553-be3f-1918-235e.ngrok-free.app/api/auth/verify-key";

export const verifyKey = async (key: string): Promise<KeyAuthResponse> => {
  try {
    const response = await fetch(KEYAUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ licenseKey: key }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message || data.error,
    };
  } catch (error) {
    console.error("Error validating license key:", error);
    return {
      success: false,
      message: error instanceof Error && error.message === "Failed to fetch" 
        ? "Unable to connect to authentication server. Please try again later."
        : "Failed to validate license key. Please try again.",
    };
  }
};