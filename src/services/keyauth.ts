interface KeyAuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const KEYAUTH_API_URL = "https://4be6-2a01-41e3-5197-5800-45fb-f24b-efca-e57a.ngrok-free.app/api/auth/verify-key";

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
      throw new Error("Network response was not ok");
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
      message: "Failed to connect to authentication server",
    };
  }
};