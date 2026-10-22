import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import fs from 'fs';
import { db } from './server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Token verification store
const sessionSecret = crypto.randomBytes(32).toString('hex');
const activeTokens = new Set<string>();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static assets and uploads
app.use('/assets', express.static(path.resolve(__dirname, 'public', 'assets')));
app.use('/uploads', express.static(path.resolve(__dirname, 'public', 'uploads')));

// Helper: Token Generator & Checker
function generateToken(): string {
  const token = crypto.randomBytes(24).toString('hex');
  activeTokens.add(token);
  return token;
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Please log in as admin.' });
  }
  const token = authHeader.split(' ')[1];
  if (!activeTokens.has(token)) {
    return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
  }
  next();
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// Get public portfolio data
app.get('/api/portfolio', (req: Request, res: Response) => {
  try {
    const data = db.getPublicData();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve portfolio data', message: err.message });
  }
});

// Submit contact form with validation and server-side persistence
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, phone } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Valid full name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
    }

    const savedMessage = db.addMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'Portfolio Inquiry').trim(),
      message: message.trim(),
      phone: (phone || '').trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received by Santosh. He will get back to you shortly.',
      id: savedMessage.id
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Server error processing your inquiry', message: err.message });
  }
});

// Download CV endpoint (returns generated comprehensive HTML/Printable CV or downloaded file)
app.get('/api/download-cv', (req: Request, res: Response) => {
  const profile = db.getPublicData().profile;
  const skills = db.getPublicData().skills;
  const services = db.getPublicData().services;
  const timeline = db.getPublicData().timeline;

  const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${profile.name} — Curriculum Vitae</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; margin: 0; padding: 40px; max-width: 850px; margin: auto; }
    h1 { margin-bottom: 4px; font-size: 28px; color: #042f22; }
    .subtitle { font-size: 16px; color: #065f46; font-weight: 600; margin-bottom: 12px; }
    .contact { font-size: 13px; color: #475569; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #065f46; display: flex; flex-wrap: wrap; gap: 16px; }
    h2 { font-size: 18px; color: #042f22; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; letter-spacing: 0.5px; }
    .bio { font-size: 14px; color: #334155; margin-bottom: 16px; }
    .item { margin-bottom: 14px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; color: #0f172a; }
    .item-sub { font-size: 13px; color: #065f46; font-weight: 500; margin-bottom: 4px; }
    .item-desc { font-size: 13px; color: #475569; }
    ul { margin: 4px 0 0 20px; padding: 0; font-size: 13px; color: #334155; }
    li { margin-bottom: 2px; }
    .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px; }
    .print-btn { display: inline-block; background: #065f46; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 13px; margin-bottom: 20px; }
    @media print { .print-btn { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <a href="javascript:window.print()" class="print-btn">🖨️ Print / Save as PDF</a>
  <h1>${profile.name}</h1>
  <div class="subtitle">${profile.headline}</div>
  <div class="contact">
    <span>📧 ${profile.email}</span>
    <span>📱 ${profile.phone}</span>
    <span>💬 WhatsApp: ${profile.whatsapp}</span>
    <span>📍 ${profile.location}</span>
  </div>

  <h2>Professional Summary</h2>
  <div class="bio">${profile.bioParagraphs.join('<br><br>')}</div>

  <h2>Core Competencies & Technologies</h2>
  <div class="skills-grid">
    <div>
      <strong>Web Development:</strong><br>
      ${skills.filter(s => s.category === 'web-dev').map(s => s.name).join(' · ')}
    </div>
    <div>
      <strong>Graphic Design:</strong><br>
      ${skills.filter(s => s.category === 'graphic-design').map(s => s.name).join(' · ')}
    </div>
  </div>

  <h2>Professional Experience</h2>
  ${timeline.filter(t => t.type === 'experience').map(t => `
    <div class="item">
      <div class="item-header">
        <span>${t.title}</span>
        <span>${t.period}</span>
      </div>
      <div class="item-sub">${t.organization} ${t.location ? `· ${t.location}` : ''}</div>
      <div class="item-desc">${t.description}</div>
      ${t.highlights && t.highlights.length ? `<ul>${t.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('')}

  <h2>Education & Certifications</h2>
  ${timeline.filter(t => t.type !== 'experience').map(t => `
    <div class="item">
      <div class="item-header">
        <span>${t.title}</span>
        <span>${t.period}</span>
      </div>
      <div class="item-sub">${t.organization} ${t.location ? `· ${t.location}` : ''}</div>
      <div class="item-desc">${t.description}</div>
      ${t.highlights && t.highlights.length ? `<ul>${t.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('')}
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(cvHtml);
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

// Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const isValid = db.verifyAdminPassword(password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid admin password. Default is: santosh2026' });
  }

  const token = generateToken();
  res.json({ success: true, token, message: 'Admin authentication successful.' });
});

// Verify token
app.get('/api/admin/verify', requireAuth, (req: Request, res: Response) => {
  res.json({ authenticated: true });
});

// Change password
app.post('/api/admin/change-password', requireAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required.' });
  }
  if (!db.verifyAdminPassword(currentPassword)) {
    return res.status(401).json({ error: 'Current password incorrect.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters.' });
  }
  db.updateAdminPassword(newPassword);
  res.json({ success: true, message: 'Admin password successfully updated.' });
});

// Logout
app.post('/api/admin/logout', requireAuth, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ==========================================
// PROTECTED ADMIN CRUD ROUTES
// ==========================================

// Get full admin dataset
app.get('/api/admin/data', requireAuth, (req: Request, res: Response) => {
  try {
    const data = db.getAdminData();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch admin data', message: err.message });
  }
});

// Update Profile
app.put('/api/admin/profile', requireAuth, (req: Request, res: Response) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json({ success: true, profile: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update profile', message: err.message });
  }
});

// Update Settings
app.put('/api/admin/settings', requireAuth, (req: Request, res: Response) => {
  try {
    const updated = db.updateSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update settings', message: err.message });
  }
});

// Skills CRUD
app.post('/api/admin/skills', requireAuth, (req: Request, res: Response) => {
  try {
    const skills = db.upsertSkill(req.body);
    res.json({ success: true, skills });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save skill', message: err.message });
  }
});

app.put('/api/admin/skills/batch', requireAuth, (req: Request, res: Response) => {
  try {
    const skills = db.setSkills(req.body);
    res.json({ success: true, skills });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to batch update skills', message: err.message });
  }
});

app.delete('/api/admin/skills/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const skills = db.deleteSkill(req.params.id);
    res.json({ success: true, skills });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete skill', message: err.message });
  }
});

// Services CRUD
app.post('/api/admin/services', requireAuth, (req: Request, res: Response) => {
  try {
    const services = db.upsertService(req.body);
    res.json({ success: true, services });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save service', message: err.message });
  }
});

app.put('/api/admin/services/batch', requireAuth, (req: Request, res: Response) => {
  try {
    const services = db.setServices(req.body);
    res.json({ success: true, services });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update services', message: err.message });
  }
});

app.delete('/api/admin/services/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const services = db.deleteService(req.params.id);
    res.json({ success: true, services });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete service', message: err.message });
  }
});

// Web Projects CRUD
app.post('/api/admin/projects', requireAuth, (req: Request, res: Response) => {
  try {
    const projects = db.upsertWebProject(req.body);
    res.json({ success: true, projects });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save project', message: err.message });
  }
});

app.put('/api/admin/projects/batch', requireAuth, (req: Request, res: Response) => {
  try {
    const projects = db.setWebProjects(req.body);
    res.json({ success: true, projects });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update projects', message: err.message });
  }
});

app.delete('/api/admin/projects/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const projects = db.deleteWebProject(req.params.id);
    res.json({ success: true, projects });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete project', message: err.message });
  }
});

// Graphic Designs CRUD
app.post('/api/admin/designs', requireAuth, (req: Request, res: Response) => {
  try {
    const designs = db.upsertGraphicDesign(req.body);
    res.json({ success: true, designs });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save graphic design', message: err.message });
  }
});

app.put('/api/admin/designs/batch', requireAuth, (req: Request, res: Response) => {
  try {
    const designs = db.setGraphicDesigns(req.body);
    res.json({ success: true, designs });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update graphic designs', message: err.message });
  }
});

app.delete('/api/admin/designs/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const designs = db.deleteGraphicDesign(req.params.id);
    res.json({ success: true, designs });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete graphic design', message: err.message });
  }
});

// Timeline CRUD
app.post('/api/admin/timeline', requireAuth, (req: Request, res: Response) => {
  try {
    const timeline = db.upsertTimeline(req.body);
    res.json({ success: true, timeline });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save timeline entry', message: err.message });
  }
});

app.put('/api/admin/timeline/batch', requireAuth, (req: Request, res: Response) => {
  try {
    const timeline = db.setTimeline(req.body);
    res.json({ success: true, timeline });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update timeline', message: err.message });
  }
});

app.delete('/api/admin/timeline/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const timeline = db.deleteTimeline(req.params.id);
    res.json({ success: true, timeline });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete timeline entry', message: err.message });
  }
});

// Messages management
app.put('/api/admin/messages/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const { isRead, isStarred } = req.body;
    const messages = db.updateMessageStatus(req.params.id, { isRead, isStarred });
    res.json({ success: true, messages });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update message', message: err.message });
  }
});

app.delete('/api/admin/messages/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const messages = db.deleteMessage(req.params.id);
    res.json({ success: true, messages });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete message', message: err.message });
  }
});

// Upload endpoint for images and assets
app.post('/api/admin/upload', requireAuth, (req: Request, res: Response) => {
  try {
    const { base64Data, filename, prefix } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'base64Data is required.' });
    }
    const uploadedUrl = db.saveUploadedFile(base64Data, filename || 'image.jpg', prefix || 'design');
    res.json({ success: true, url: uploadedUrl });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to upload file', message: err.message });
  }
});

// ==========================================
// VITE SPA SERVER INTEGRATION
// ==========================================

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
