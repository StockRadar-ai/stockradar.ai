interface KeyAuthResponse {
  success: boolean;
  message: string;
}

export const verifyKey = async (key: string): Promise<KeyAuthResponse> => {
  try {
    // Replace these with your KeyAuth API details
    const response = await fetch('YOUR_KEYAUTH_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        // Add other required KeyAuth parameters
      }),
    });

    const data = await response.json();
    return {
      success: data.success,
      message: data.message || getStatusMessage(data.status),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Connection error. Please try again.',
    };
  }
};

const getStatusMessage = (status: string): string => {
  switch (status) {
    case 'invalid':
      return 'Key not Valid';
    case 'expired':
      return 'Key Expired';
    case 'not_found':
      return 'Key not found';
    case 'success':
      return 'Successfully logged in';
    default:
      return 'Unknown error occurred';
  }
};