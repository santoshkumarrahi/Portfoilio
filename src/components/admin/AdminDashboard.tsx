import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Palette,
  Cpu,
  Layers,
  GraduationCap,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Upload,
  ExternalLink,
  Check,
  X,
  Eye,
  Star,
  CheckCircle2,
  AlertCircle,
  Save,
  KeyRound,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import {
  ProfileData,
  SkillItem,
  ServiceItem,
  WebProject,
  GraphicDesignItem,
  TimelineEntry,
  ContactMessage,
  SiteSettings
} from '../../types/portfolio.ts';
import { AjrakStar } from '../AjrakPattern.tsx';

type AdminTab =
  | 'overview'
  | 'profile'
  | 'projects'
  | 'designs'
  | 'skills'
  | 'services'
  | 'timeline'
  | 'messages'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const {
    showAdminDashboard,
    setShowAdminDashboard,
    logoutAdmin,
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<ProfileData>(() => adminData?.profile || {} as ProfileData);
  React.useEffect(() => {
    if (adminData?.profile) setProfileForm(adminData.profile);
  }, [adminData?.profile]);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(() => adminData?.settings || {} as SiteSettings);
  React.useEffect(() => {
    if (adminData?.settings) setSettingsForm(adminData.settings);
  }, [adminData?.settings]);

  // Modal Editing States
  const [editingProject, setEditingProject] = useState<WebProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingDesign, setEditingDesign] = useState<GraphicDesignItem | null>(null);
  const [isAddingDesign, setIsAddingDesign] = useState(false);

  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingTimeline, setEditingTimeline] = useState<TimelineEntry | null>(null);
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);

  // Password Change State
  const [pwdForm, setPwdForm] = useState({ current: '', next: '', confirm: '' });

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  if (!showAdminDashboard) return null;

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onUploaded: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const uploadedUrl = await uploadFile(base64, file.name);
      if (uploadedUrl) {
        onUploaded(uploadedUrl);
        notify('File uploaded and saved to server successfully!');
      } else {
        notify('Failed to upload file.', 'error');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Top Bar in Deep Navy */}
      <header className="h-16 px-6 bg-[#0b132b] border-b border-slate-800 flex items-center justify-between shrink-0 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <AjrakStar size={16} className="text-teal-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white font-heading tracking-wide">
              Santosh Kumar Bheel — Portfolio CMS
            </h1>
            <span className="text-[10px] text-teal-400 font-mono">Authenticated Admin Active</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowAdminDashboard(false)}
            className="px-3 py-1.5 text-xs text-slate-200 hover:text-white bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye size={14} className="text-teal-400" />
            <span>View Public Website</span>
          </button>

          <button
            type="button"
            onClick={logoutAdmin}
            className="px-3 py-1.5 text-xs text-rose-300 hover:text-rose-100 bg-rose-950/60 border border-rose-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`absolute top-20 right-6 z-50 px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2 text-xs transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-900 border-emerald-700 text-white'
              : 'bg-rose-900 border-rose-700 text-white'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 size={16} className="text-emerald-300" />
          ) : (
            <AlertCircle size={16} className="text-rose-300" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Workspace: Sidebar & Active Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col justify-between p-4 overflow-y-auto shrink-0 text-slate-300">
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile & Bio', icon: User },
              { id: 'projects', label: 'Web Projects', icon: FolderGit2, badge: adminData?.webProjects?.length },
              { id: 'designs', label: 'Graphic Designs', icon: Palette, badge: adminData?.graphicDesigns?.length },
              { id: 'skills', label: 'Skills & Tech', icon: Cpu, badge: adminData?.skills?.length },
              { id: 'services', label: 'Services', icon: Layers, badge: adminData?.services?.length },
              { id: 'timeline', label: 'Experience & Edu', icon: GraduationCap, badge: adminData?.timeline?.length },
              {
                id: 'messages',
                label: 'Client Inquiries',
                icon: Mail,
                badge: adminData?.messages?.filter((m: any) => !m.isRead).length || 0,
                isAlert: (adminData?.messages?.filter((m: any) => !m.isRead).length || 0) > 0
              },
              { id: 'settings', label: 'Website Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-900/60 text-white border border-teal-500/40 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-teal-400' : 'text-slate-500'} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold ${
                        tab.isAlert
                          ? 'bg-rose-900 text-rose-200'
                          : isActive
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 text-[11px] text-slate-400">
            <div className="text-white font-medium mb-1">Persistent Database</div>
            <span>Auto-synced to disk in real-time. Changes survive browser reloads.</span>
          </div>
        </aside>

        {/* Tab Content Panes in Soft Grey */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 text-slate-900">
          {/* ========================================= */}
          {/* OVERVIEW TAB */}
          {/* ========================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Dashboard Overview
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage your portfolio content, review live inquiries, and update your personal brand.
                </p>
              </div>

              {/* Metric KPI cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Web Projects</div>
                  <div className="text-3xl font-extrabold text-teal-700 font-heading mt-1 tabular-nums">
                    {adminData?.webProjects?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {adminData?.webProjects?.filter((p: any) => p.isPublished).length} published
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Graphic Designs</div>
                  <div className="text-3xl font-extrabold text-slate-900 font-heading mt-1 tabular-nums">
                    {adminData?.graphicDesigns?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {adminData?.graphicDesigns?.filter((d: any) => d.isPublished).length} published
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Skills & Services</div>
                  <div className="text-3xl font-extrabold text-teal-700 font-heading mt-1 tabular-nums">
                    {(adminData?.skills?.length || 0) + (adminData?.services?.length || 0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {adminData?.skills?.length} skills · {adminData?.services?.length} services
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Contact Inquiries</div>
                  <div className="text-3xl font-extrabold text-amber-700 font-heading mt-1 tabular-nums">
                    {adminData?.messages?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {adminData?.messages?.filter((m: any) => !m.isRead).length || 0} unread
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Management Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('projects');
                      setIsAddingProject(true);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add Web Project
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('designs');
                      setIsAddingDesign(true);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload size={14} /> Upload Graphic Design
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <User size={14} /> Edit Profile & Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail size={14} /> View Inquiries
                  </button>
                </div>
              </div>

              {/* Recent Messages Preview */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Recent Inquiries</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-teal-700 font-semibold hover:underline"
                  >
                    View All →
                  </button>
                </div>
                {adminData?.messages && adminData.messages.length > 0 ? (
                  <div className="space-y-3">
                    {adminData.messages.slice(0, 3).map((m: any) => (
                      <div
                        key={m.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{m.name}</span>
                            <span className="text-[11px] text-slate-500">{m.email}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-1">{m.subject}: {m.message}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                          {new Date(m.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No contact messages received yet.</p>
                )}
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* PROFILE & BIO TAB */}
          {/* ========================================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Profile Management</h2>
                  <p className="text-xs text-slate-500">Update identity, biography, photo, and direct contact details.</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await updateProfile(profileForm);
                    if (ok) notify('Profile updated successfully!');
                    else notify('Failed to save profile changes.', 'error');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Save size={14} /> Save Profile Changes
                </button>
              </div>

              {/* Profile Photo Replacement Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Profile Photograph</h3>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-28 h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-300 shadow-xs relative shrink-0">
                    <img
                      src={profileForm.avatarUrl || '/assets/aistudio/Santosh_Profile_Image_814470b2.png'}
                      alt="Santosh"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs text-slate-600">
                      Upload a new photo or keep your verified photograph. Uploaded images are stored permanently on the server.
                    </p>
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                      <Upload size={14} />
                      <span>Choose New Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setProfileForm({ ...profileForm, avatarUrl: url }))
                        }
                      />
                    </label>
                    <div className="text-[11px] text-slate-400 font-mono break-all">
                      Current: {profileForm.avatarUrl}
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Headline Fields */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Personal & Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={profileForm.headline}
                      onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp (International)</label>
                    <input
                      type="text"
                      value={profileForm.whatsapp}
                      onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Statistics */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Years Experience</label>
                    <input
                      type="text"
                      value={profileForm.yearsExperience}
                      onChange={(e) => setProfileForm({ ...profileForm, yearsExperience: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Web Projects Completed</label>
                    <input
                      type="text"
                      value={profileForm.projectsCompleted}
                      onChange={(e) => setProfileForm({ ...profileForm, projectsCompleted: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Design Deliveries</label>
                    <input
                      type="text"
                      value={profileForm.designDeliveries}
                      onChange={(e) => setProfileForm({ ...profileForm, designDeliveries: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Satisfaction Rate</label>
                    <input
                      type="text"
                      value={profileForm.satisfactionRate}
                      onChange={(e) => setProfileForm({ ...profileForm, satisfactionRate: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Biography Paragraphs */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">About Me Narrative Paragraphs</h3>
                {profileForm.bioParagraphs?.map((para, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Paragraph {idx + 1}</span>
                      {profileForm.bioParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newParas = profileForm.bioParagraphs.filter((_, i) => i !== idx);
                            setProfileForm({ ...profileForm, bioParagraphs: newParas });
                          }}
                          className="text-rose-600 hover:text-rose-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const newParas = [...profileForm.bioParagraphs];
                        newParas[idx] = e.target.value;
                        setProfileForm({ ...profileForm, bioParagraphs: newParas });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setProfileForm({
                      ...profileForm,
                      bioParagraphs: [...(profileForm.bioParagraphs || []), '']
                    })
                  }
                  className="px-3 py-1.5 text-xs text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors font-semibold"
                >
                  + Add Another Paragraph
                </button>
              </div>

              {/* Social Profiles */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Social & Portfolio URLs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={profileForm.socials?.github || ''}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, github: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={profileForm.socials?.linkedin || ''}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, linkedin: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* WEB PROJECTS TAB */}
          {/* ========================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Web Development Portfolio</h2>
                  <p className="text-xs text-slate-500">Add, edit, publish, feature, or remove web applications.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject({
                      id: '',
                      title: '',
                      tagline: '',
                      description: '',
                      category: 'Full-Stack',
                      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
                      technologies: ['React', 'Node.js', 'Tailwind CSS'],
                      liveUrl: '#',
                      githubUrl: 'https://github.com/santoshkumarbheel',
                      isFeatured: false,
                      isPublished: true,
                      createdAt: new Date().toISOString().split('T')[0],
                      order: (adminData?.webProjects?.length || 0) + 1
                    });
                    setIsAddingProject(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus size={14} /> Add New Web Project
                </button>
              </div>

              {/* Projects List Table / Cards */}
              <div className="space-y-3">
                {adminData?.webProjects?.map((project: WebProject) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 font-heading">{project.title}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                            {project.category}
                          </span>
                          {!project.isPublished && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              Draft / Unpublished
                            </span>
                          )}
                          {project.isFeatured && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{project.tagline}</p>
                        <div className="text-[11px] text-slate-400 font-mono mt-1">
                          {project.technologies?.join(' · ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject({ ...project });
                          setIsAddingProject(false);
                        }}
                        className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`Delete project "${project.title}"?`)) {
                            const ok = await deleteProject(project.id);
                            if (ok) notify('Project deleted successfully.');
                          }
                        }}
                        className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Add / Edit Modal Drawer */}
              {(isAddingProject || editingProject) && editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                  <div className="w-full max-w-2xl bg-white border border-slate-300 rounded-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-slate-900">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <h3 className="text-base font-bold text-slate-900">
                        {isAddingProject ? 'Add Web Project' : 'Edit Web Project'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setEditingProject(null);
                        }}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Project Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Tagline / Short Hook</label>
                        <input
                          type="text"
                          value={editingProject.tagline}
                          onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Category</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          >
                            <option value="Full-Stack">Full-Stack</option>
                            <option value="Front-End">Front-End</option>
                            <option value="Back-End">Back-End</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="E-Commerce">E-Commerce</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Screenshot / Image</label>
                          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold cursor-pointer w-full justify-center shadow-xs">
                            <Upload size={14} />
                            <span>Upload Screenshot</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) => setEditingProject({ ...editingProject, imageUrl: url }))
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Image URL / Path</label>
                        <input
                          type="text"
                          value={editingProject.imageUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Technologies (Comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.technologies?.join(', ')}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Live Demo URL</label>
                          <input
                            type="text"
                            value={editingProject.liveUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">GitHub Repo URL</label>
                          <input
                            type="text"
                            value={editingProject.githubUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-medium">
                          <input
                            type="checkbox"
                            checked={editingProject.isPublished}
                            onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                            className="rounded border-slate-300 text-teal-600"
                          />
                          <span>Published on Website</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-medium">
                          <input
                            type="checkbox"
                            checked={editingProject.isFeatured}
                            onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                            className="rounded border-slate-300 text-amber-600"
                          />
                          <span>Featured Highlight</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingProject.title) return alert('Title required');
                          const ok = await saveProject(editingProject);
                          if (ok) {
                            notify('Web project saved successfully!');
                            setIsAddingProject(false);
                            setEditingProject(null);
                          } else {
                            notify('Error saving project.', 'error');
                          }
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                      >
                        Save Project
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* GRAPHIC DESIGNS TAB */}
          {/* ========================================= */}
          {activeTab === 'designs' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Graphic Design Manager</h2>
                  <p className="text-xs text-slate-500">
                    Upload and manage brand identities, posters, flyers, thumbnails, and creative graphics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingDesign({
                      id: '',
                      title: '',
                      description: '',
                      category: 'Logo Design',
                      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
                      toolsUsed: ['Adobe Illustrator', 'CorelDRAW'],
                      dimensions: '3000 x 3000 Vector',
                      isFeatured: false,
                      isPublished: true,
                      createdAt: new Date().toISOString().split('T')[0],
                      order: (adminData?.graphicDesigns?.length || 0) + 1
                    });
                    setIsAddingDesign(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Upload size={14} /> Upload New Design Artwork
                </button>
              </div>

              {/* Designs Grid in Admin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminData?.graphicDesigns?.map((design: GraphicDesignItem) => (
                  <div
                    key={design.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                        <img src={design.imageUrl} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded bg-slate-900/90 text-white font-medium">
                          {design.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{design.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{design.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        {design.isFeatured && (
                          <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5">
                            <Star size={10} fill="currentColor" /> Featured
                          </span>
                        )}
                        {!design.isPublished && (
                          <span className="text-[10px] text-rose-600 font-medium">Unpublished</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDesign({ ...design });
                            setIsAddingDesign(false);
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm(`Delete design "${design.title}"?`)) {
                              const ok = await deleteDesign(design.id);
                              if (ok) notify('Design deleted.');
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Design Add/Edit Modal */}
              {(isAddingDesign || editingDesign) && editingDesign && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                  <div className="w-full max-w-xl bg-white border border-slate-300 rounded-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-slate-900">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <h3 className="text-base font-bold text-slate-900">
                        {isAddingDesign ? 'Upload Graphic Design' : 'Edit Graphic Design'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingDesign(false);
                          setEditingDesign(null);
                        }}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Design Title</label>
                        <input
                          type="text"
                          value={editingDesign.title}
                          onChange={(e) => setEditingDesign({ ...editingDesign, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Category</label>
                          <select
                            value={editingDesign.category}
                            onChange={(e) => setEditingDesign({ ...editingDesign, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          >
                            <option value="Logo Design">Logo Design</option>
                            <option value="Brand Identity">Brand Identity</option>
                            <option value="Posters">Posters</option>
                            <option value="Flyers">Flyers</option>
                            <option value="YouTube Thumbnails">YouTube Thumbnails</option>
                            <option value="Social Media Designs">Social Media Designs</option>
                            <option value="Promotional Banners">Promotional Banners</option>
                            <option value="Other Creative Designs">Other Creative Designs</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Upload Artwork File</label>
                          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold cursor-pointer w-full justify-center shadow-xs">
                            <Upload size={14} />
                            <span>Select Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) => setEditingDesign({ ...editingDesign, imageUrl: url }))
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Image URL / File Path</label>
                        <input
                          type="text"
                          value={editingDesign.imageUrl}
                          onChange={(e) => setEditingDesign({ ...editingDesign, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingDesign.description}
                          onChange={(e) => setEditingDesign({ ...editingDesign, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Tools Used (Comma separated)</label>
                          <input
                            type="text"
                            value={editingDesign.toolsUsed?.join(', ')}
                            onChange={(e) =>
                              setEditingDesign({
                                ...editingDesign,
                                toolsUsed: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                              })
                            }
                            placeholder="CorelDRAW, Adobe Illustrator, PixelLab"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Dimensions</label>
                          <input
                            type="text"
                            value={editingDesign.dimensions || ''}
                            onChange={(e) => setEditingDesign({ ...editingDesign, dimensions: e.target.value })}
                            placeholder="e.g. 1920x1080 (HD)"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                          <input
                            type="checkbox"
                            checked={editingDesign.isPublished}
                            onChange={(e) => setEditingDesign({ ...editingDesign, isPublished: e.target.checked })}
                            className="rounded border-slate-300 text-teal-600"
                          />
                          <span>Published on Website</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                          <input
                            type="checkbox"
                            checked={editingDesign.isFeatured}
                            onChange={(e) => setEditingDesign({ ...editingDesign, isFeatured: e.target.checked })}
                            className="rounded border-slate-300 text-amber-600"
                          />
                          <span>Featured Highlight</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingDesign(false);
                          setEditingDesign(null);
                        }}
                        className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingDesign.title) return alert('Title required');
                          const ok = await saveDesign(editingDesign);
                          if (ok) {
                            notify('Graphic design saved successfully!');
                            setIsAddingDesign(false);
                            setEditingDesign(null);
                          } else {
                            notify('Error saving design.', 'error');
                          }
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                      >
                        Save Design
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* SKILLS TAB */}
          {/* ========================================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Skills & Technologies</h2>
                  <p className="text-xs text-slate-500">Add, edit proficiency, categorize, or delete skills.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSkill({
                      id: '',
                      name: '',
                      category: 'web-dev',
                      level: 90,
                      isFeatured: true,
                      order: (adminData?.skills?.length || 0) + 1
                    });
                    setIsAddingSkill(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus size={14} /> Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adminData?.skills?.map((skill: SkillItem) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                        <span className="text-[10px] text-slate-500">({skill.category})</span>
                      </div>
                      <div className="text-[11px] text-teal-700 font-mono font-semibold mt-0.5">
                        Proficiency: {skill.level}%
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkill({ ...skill });
                          setIsAddingSkill(false);
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`Delete skill "${skill.name}"?`)) {
                            const ok = await deleteSkill(skill.id);
                            if (ok) notify('Skill removed.');
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Add/Edit Drawer */}
              {(isAddingSkill || editingSkill) && editingSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                  <div className="w-full max-w-md bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-2xl text-slate-900">
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAddingSkill ? 'Add Skill' : 'Edit Skill'}
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Skill Name</label>
                        <input
                          type="text"
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Category</label>
                        <select
                          value={editingSkill.category}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        >
                          <option value="web-dev">Web Development</option>
                          <option value="graphic-design">Graphic Design</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Proficiency Level ({editingSkill.level}%)
                        </label>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={editingSkill.level}
                          onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingSkill(false);
                          setEditingSkill(null);
                        }}
                        className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingSkill.name) return;
                          const ok = await saveSkill(editingSkill);
                          if (ok) {
                            notify('Skill saved.');
                            setIsAddingSkill(false);
                            setEditingSkill(null);
                          }
                        }}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* SERVICES TAB */}
          {/* ========================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Services Offered</h2>
                  <p className="text-xs text-slate-500">Manage client-facing services and key feature highlights.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingService({
                      id: '',
                      title: '',
                      category: 'web-dev',
                      description: '',
                      features: ['Modern Architecture', 'High Performance'],
                      icon: 'Layers',
                      order: (adminData?.services?.length || 0) + 1
                    });
                    setIsAddingService(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus size={14} /> Add Service
                </button>
              </div>

              <div className="space-y-3">
                {adminData?.services?.map((service: ServiceItem) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{service.title}</h4>
                        <span className="text-[10px] text-teal-700 font-semibold uppercase">({service.category})</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{service.description}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mt-2">
                        {service.features?.map((f, i) => (
                          <span key={i} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingService({ ...service });
                          setIsAddingService(false);
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`Delete service "${service.title}"?`)) {
                            const ok = await deleteService(service.id);
                            if (ok) notify('Service deleted.');
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Add/Edit Modal */}
              {(isAddingService || editingService) && editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                  <div className="w-full max-w-lg bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-2xl text-slate-900">
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAddingService ? 'Add Service' : 'Edit Service'}
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Service Title</label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Category</label>
                        <select
                          value={editingService.category}
                          onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        >
                          <option value="web-dev">Web Development</option>
                          <option value="graphic-design">Graphic Design</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Features (One per line)</label>
                        <textarea
                          rows={3}
                          value={editingService.features?.join('\n')}
                          onChange={(e) =>
                            setEditingService({
                              ...editingService,
                              features: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingService(false);
                          setEditingService(null);
                        }}
                        className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingService.title) return;
                          const ok = await saveService(editingService);
                          if (ok) {
                            notify('Service saved.');
                            setIsAddingService(false);
                            setEditingService(null);
                          }
                        }}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* TIMELINE TAB */}
          {/* ========================================= */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Experience & Education Timeline</h2>
                  <p className="text-xs text-slate-500">Manage career positions, degrees, and certificates.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTimeline({
                      id: '',
                      type: 'experience',
                      title: '',
                      organization: '',
                      location: 'Pakistan',
                      period: '2024 — Present',
                      description: '',
                      highlights: ['Accomplished Key Milestone'],
                      order: (adminData?.timeline?.length || 0) + 1
                    });
                    setIsAddingTimeline(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus size={14} /> Add Timeline Entry
                </button>
              </div>

              <div className="space-y-3">
                {adminData?.timeline?.map((entry: TimelineEntry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{entry.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-teal-800 font-mono font-semibold">
                          {entry.period}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium capitalize">
                          ({entry.type})
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">
                        {entry.organization} {entry.location ? `· ${entry.location}` : ''}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{entry.description}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTimeline({ ...entry });
                          setIsAddingTimeline(false);
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`Delete entry "${entry.title}"?`)) {
                            const ok = await deleteTimeline(entry.id);
                            if (ok) notify('Timeline entry deleted.');
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Add/Edit Modal */}
              {(isAddingTimeline || editingTimeline) && editingTimeline && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                  <div className="w-full max-w-lg bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-2xl text-slate-900">
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAddingTimeline ? 'Add Milestone' : 'Edit Milestone'}
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Role / Degree / Certificate</label>
                        <input
                          type="text"
                          value={editingTimeline.title}
                          onChange={(e) => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Type</label>
                          <select
                            value={editingTimeline.type}
                            onChange={(e) => setEditingTimeline({ ...editingTimeline, type: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          >
                            <option value="experience">Experience</option>
                            <option value="education">Education</option>
                            <option value="certification">Certification</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Time Period</label>
                          <input
                            type="text"
                            value={editingTimeline.period}
                            onChange={(e) => setEditingTimeline({ ...editingTimeline, period: e.target.value })}
                            placeholder="e.g. 2022 — Present"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Organization / Institution</label>
                          <input
                            type="text"
                            value={editingTimeline.organization}
                            onChange={(e) => setEditingTimeline({ ...editingTimeline, organization: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Location</label>
                          <input
                            type="text"
                            value={editingTimeline.location || ''}
                            onChange={(e) => setEditingTimeline({ ...editingTimeline, location: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingTimeline.description}
                          onChange={(e) => setEditingTimeline({ ...editingTimeline, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Key Highlights (One per line)</label>
                        <textarea
                          rows={2}
                          value={editingTimeline.highlights?.join('\n')}
                          onChange={(e) =>
                            setEditingTimeline({
                              ...editingTimeline,
                              highlights: e.target.value.split('\n').map((h) => h.trim()).filter(Boolean)
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingTimeline(false);
                          setEditingTimeline(null);
                        }}
                        className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!editingTimeline.title) return;
                          const ok = await saveTimeline(editingTimeline);
                          if (ok) {
                            notify('Timeline entry saved.');
                            setIsAddingTimeline(false);
                            setEditingTimeline(null);
                          }
                        }}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* MESSAGES TAB */}
          {/* ========================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-heading">Client Inquiries & Contact Submissions</h2>
                <p className="text-xs text-slate-500">All messages submitted via the website contact form.</p>
              </div>

              <div className="space-y-3">
                {adminData?.messages && adminData.messages.length > 0 ? (
                  adminData.messages.map((msg: ContactMessage) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.isRead
                          ? 'bg-white border-slate-200 shadow-xs'
                          : 'bg-white border-teal-500 shadow-md ring-1 ring-teal-500/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{msg.name}</span>
                          {!msg.isRead && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-semibold border border-teal-200">
                              New
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {new Date(msg.date).toLocaleString()}
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 mb-3 flex flex-wrap items-center gap-3">
                        <a href={`mailto:${msg.email}`} className="text-teal-700 font-semibold hover:underline">
                          {msg.email}
                        </a>
                        {msg.phone && (
                          <>
                            <span>·</span>
                            <span>Phone: {msg.phone}</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="text-slate-700 font-medium">Subject: {msg.subject}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal mb-4">
                        {msg.message}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateMessageStatus(msg.id, !msg.isRead, msg.isStarred)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 transition-colors cursor-pointer"
                          >
                            Mark as {msg.isRead ? 'Unread' : 'Read'}
                          </button>
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`}
                            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-teal-700 text-[11px] text-white transition-colors"
                          >
                            Reply via Email
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm('Permanently delete this inquiry?')) {
                              const ok = await deleteMessage(msg.id);
                              if (ok) notify('Message deleted.');
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 text-slate-400 text-sm">
                    No contact inquiries received yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* SETTINGS & SECURITY TAB */}
          {/* ========================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-heading">Website Settings & Security</h2>
                <p className="text-xs text-slate-500">Configure global site titles, hero headlines, and password.</p>
              </div>

              {/* Site Content Settings */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">General Site Settings</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Site SEO Title</label>
                    <input
                      type="text"
                      value={settingsForm.siteTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Hero Subheadline / Core Quote</label>
                    <textarea
                      rows={2}
                      value={settingsForm.heroSubheadline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Footer Quote</label>
                    <input
                      type="text"
                      value={settingsForm.footerQuote}
                      onChange={(e) => setSettingsForm({ ...settingsForm, footerQuote: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await updateSettings(settingsForm);
                        if (ok) notify('Site settings saved successfully!');
                        else notify('Failed to save settings.', 'error');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 shadow-xs"
                    >
                      <Save size={14} /> Save Site Settings
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Change Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <KeyRound size={16} className="text-teal-600" />
                  <span>Update Admin Password</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Change your secure admin master password. Defaults to: <code className="text-teal-700 font-semibold">santosh2026</code>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Current Password</label>
                    <input
                      type="password"
                      value={pwdForm.current}
                      onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">New Password (min 6 chars)</label>
                    <input
                      type="password"
                      value={pwdForm.next}
                      onChange={(e) => setPwdForm({ ...pwdForm, next: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!pwdForm.current || !pwdForm.next) {
                        return alert('Please enter both current and new password.');
                      }
                      const res = await changeAdminPassword(pwdForm.current, pwdForm.next);
                      if (res.success) {
                        notify('Admin password successfully updated!');
                        setPwdForm({ current: '', next: '', confirm: '' });
                      } else {
                        notify(res.error || 'Failed to update password.', 'error');
                      }
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
