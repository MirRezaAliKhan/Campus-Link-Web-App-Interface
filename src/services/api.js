const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let authToken = localStorage.getItem('authToken');

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
};

// Auth APIs
export const authAPI = {
  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.token) setAuthToken(result.token);
    return result;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (result.token) setAuthToken(result.token);
    return result;
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getHeaders()
    });
    return response.json();
  },

  logout: () => {
    setAuthToken(null);
  }
};

// Student APIs
export const studentAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/student/profile`, {
      headers: getHeaders()
    });
    return response.json();
  },

  updateProfile: async (data) => {
    const response = await fetch(`${API_BASE_URL}/student/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  addSkill: async (skillData) => {
    const response = await fetch(`${API_BASE_URL}/student/skills`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(skillData)
    });
    return response.json();
  },

  addProject: async (projectData) => {
    const response = await fetch(`${API_BASE_URL}/student/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData)
    });
    return response.json();
  },

  addInternship: async (internshipData) => {
    const response = await fetch(`${API_BASE_URL}/student/internships`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(internshipData)
    });
    return response.json();
  },

  getUssSuggestions: async () => {
    const response = await fetch(`${API_BASE_URL}/student/uss-suggestions`, {
      headers: getHeaders()
    });
    return response.json();
  }
};

// Recruiter APIs
export const recruiterAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/recruiter/profile`, {
      headers: getHeaders()
    });
    return response.json();
  },

  updateProfile: async (data) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateWeights: async (weights) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/weights`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(weights)
    });
    return response.json();
  },

  updateFilters: async (filters) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/filters`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(filters)
    });
    return response.json();
  },

  getCandidates: async () => {
    const response = await fetch(`${API_BASE_URL}/recruiter/candidates`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getCandidateDetail: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/candidates/${studentId}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  addHiringRole: async (roleData) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/roles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(roleData)
    });
    return response.json();
  }
};

// Application APIs
export const applicationAPI = {
  createApplication: async (appData) => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(appData)
    });
    return response.json();
  },

  getStudentApplications: async () => {
    const response = await fetch(`${API_BASE_URL}/applications/student`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getRecruiterApplications: async () => {
    const response = await fetch(`${API_BASE_URL}/applications/recruiter`, {
      headers: getHeaders()
    });
    return response.json();
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};
