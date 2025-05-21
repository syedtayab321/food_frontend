export const fetchProfile = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('https://xavics.pythonanywhere.com/auth/profile/', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${authToken}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Profile API Error:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    
    // Create FormData object for multipart upload
    const formData = new FormData();
    
    // Append all fields to FormData
    for (const key in profileData) {
      // Handle file uploads differently if needed
      if (key === 'profile_picture' && profileData[key] instanceof File) {
        formData.append(key, profileData[key]);
      } else {
        formData.append(key, profileData[key]);
      }
    }

    const response = await fetch('https://xavics.pythonanywhere.com/auth/profile/', {
      method: 'PUT', // or PATCH depending on your API
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${authToken}`,
        // Don't set Content-Type header manually for FormData - 
        // the browser will set it automatically with the correct boundary
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Profile Update Error:', error);
    throw error;
  }
};