// src/api/profile.js
export const fetchProfile = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('https://xavics.pythonanywhere.com/auth/profile/', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${authToken}`,
        'X-CSRFToken': 'your-csrf-token-here' // You might need to handle this dynamically
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
    const response = await fetch('https://xavics.pythonanywhere.com/auth/profile/', {
      method: 'PUT', // or PATCH depending on your API
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData)
    });
    console.log('Response:', response);

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Profile Update Error:', error);
    throw error;
  }
};