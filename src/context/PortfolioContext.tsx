import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ProfileData,
  SkillItem,
  ServiceItem,
  WebProject,
  GraphicDesignItem,
  TimelineEntry,
  ContactMessage,
  SiteSettings
} from '../types/portfolio.ts';

interface PublicData {
  profile: ProfileData;
  skills: SkillItem[];
  services: ServiceItem[];
  webProjects: WebProject[];
  graphicDesigns: GraphicDesignItem[];
  timeline: TimelineEntry[];
  settings: SiteSettings;
}

interface PortfolioContextType {
  data: PublicData | null;
  loading: boolean;
  error: string | null;
  refetchData: () => Promise<void>;
  
  // Contact submission
  submitContact: (formData: { name: string; email: string; subject: string; message: string; phone?: string }) => Promise<{ success: boolean; message: string }>;

  // Admin Auth & State
  isAdminLoggedIn: boolean;
  adminToken: string | null;
  loginAdmin: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  showAdminModal: boolean;
  setShowAdminModal: (show: boolean) => void;
  showAdminDashboard: boolean;
  setShowAdminDashboard: (show: boolean) => void;

  // Admin Data Management
  adminData: {
    profile: ProfileData;
    skills: SkillItem[];
    services: ServiceItem[];
    webProjects: WebProject[];
    graphicDesigns: GraphicDesignItem[];
    timeline: TimelineEntry[];
    messages: ContactMessage[];
    settings: SiteSettings;
  } | null;
  fetchAdminData: () => Promise<void>;
  
  // Mutations
  updateProfile: (profile: ProfileData) => Promise<boolean>;
  updateSettings: (settings: SiteSettings) => Promise<boolean>;
  saveSkill: (skill: SkillItem) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  saveService: (service: ServiceItem) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  saveProject: (project: WebProject) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveDesign: (design: GraphicDesignItem) => Promise<boolean>;
  deleteDesign: (id: string) => Promise<boolean>;
  saveTimeline: (entry: TimelineEntry) => Promise<boolean>;
  deleteTimeline: (id: string) => Promise<boolean>;
  updateMessageStatus: (id: string, isRead?: boolean, isStarred?: boolean) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  uploadFile: (base64Data: string, filename?: string, prefix?: string) => Promise<string | null>;
  changeAdminPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PublicData | null>(null);
  const [adminData, setAdminData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('santosh_admin_token') || null;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Fetch public data
  const refetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to load portfolio data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch admin data
  const fetchAdminData = useCallback(async () => {
    if (!adminToken) return;
    try {
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const json = await res.json();
        setAdminData(json);
      } else if (res.status === 401) {
        logoutAdmin();
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    }
  }, [adminToken]);

  // Initial load
  useEffect(() => {
    refetchData();
  }, [refetchData]);

  // Verify stored token
  useEffect(() => {
    if (!adminToken) {
      setIsAdminLoggedIn(false);
      return;
    }
    fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
      .then(res => {
        if (res.ok) {
          setIsAdminLoggedIn(true);
          fetchAdminData();
        } else {
          logoutAdmin();
        }
      })
      .catch(() => logoutAdmin());
  }, [adminToken, fetchAdminData]);

  const loginAdmin = async (password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const json = await res.json();
      if (res.ok && json.token) {
        setAdminToken(json.token);
        localStorage.setItem('santosh_admin_token', json.token);
        setIsAdminLoggedIn(true);
        setShowAdminModal(false);
        setShowAdminDashboard(true);
        await fetchAdminData();
        return { success: true };
      }
      return { success: false, error: json.error || 'Authentication failed' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logoutAdmin = () => {
    if (adminToken) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` }
      }).catch(() => {});
    }
    localStorage.removeItem('santosh_admin_token');
    setAdminToken(null);
    setIsAdminLoggedIn(false);
    setShowAdminDashboard(false);
    setAdminData(null);
  };

  const submitContact = async (formData: { name: string; email: string; subject: string; message: string; phone?: string }) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (!res.ok) {
        return { success: false, message: json.error || 'Failed to submit form' };
      }
      if (isAdminLoggedIn) {
        fetchAdminData();
      }
      return { success: true, message: json.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  };

  // Helper auth headers
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${adminToken}`
  });

  // Mutations
  const updateProfile = async (profile: ProfileData): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateSettings = async (settings: SiteSettings): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveSkill = async (skill: SkillItem): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(skill)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveService = async (service: ServiceItem): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(service)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveProject = async (project: WebProject): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveDesign = async (design: GraphicDesignItem): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/designs', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(design)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteDesign = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/designs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveTimeline = async (entry: TimelineEntry): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/admin/timeline', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(entry)
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteTimeline = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/timeline/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await Promise.all([refetchData(), fetchAdminData()]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateMessageStatus = async (id: string, isRead?: boolean, isStarred?: boolean): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isRead, isStarred })
      });
      if (res.ok) {
        await fetchAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await fetchAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const uploadFile = async (base64Data: string, filename = 'asset.png', prefix = 'asset'): Promise<string | null> => {
    if (!adminToken) return null;
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ base64Data, filename, prefix })
      });
      const json = await res.json();
      if (res.ok && json.url) {
        return json.url;
      }
      return null;
    } catch (err) {
      console.error('File upload failed', err);
      return null;
    }
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string) => {
    if (!adminToken) return { success: false, error: 'Unauthorized' };
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const json = await res.json();
      if (res.ok) {
        return { success: true };
      }
      return { success: false, error: json.error || 'Failed to change password' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        error,
        refetchData,
        submitContact,
        isAdminLoggedIn,
        adminToken,
        loginAdmin,
        logoutAdmin,
        showAdminModal,
        setShowAdminModal,
        showAdminDashboard,
        setShowAdminDashboard,
        adminData,
        fetchAdminData,
        updateProfile,
        updateSettings,
        saveSkill,
        deleteSkill,
        saveService,
        deleteService,
        saveProject,
        deleteProject,
        saveDesign,
        deleteDesign,
        saveTimeline,
        deleteTimeline,
        updateMessageStatus,
        deleteMessage,
        uploadFile,
        changeAdminPassword
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
