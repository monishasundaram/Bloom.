/* =====================================================
   BLOOM — Core JS: Storage, Auth, Utilities, State
   ===================================================== */

// ── Theme Management ──────────────────────────────────
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('bloom_theme') || 'light';
    this.set(saved, false);
  },
  set(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) localStorage.setItem('bloom_theme', theme);
    // Update toggle icon
    const icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  }
};

// ── Local Storage Database ────────────────────────────
const DB = {
  PREFIX: 'bloom_',
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this.PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
      return true;
    } catch { return false; }
  },
  remove(key) { localStorage.removeItem(this.PREFIX + key); }
};

// ── Auth Manager ──────────────────────────────────────
const Auth = {
  getSession() { return DB.get('session'); },

  login(email, password) {
    const users = DB.get('users', []);
    const user = users.find(u => u.email === email && u.password === this._hash(password));
    if (!user) return { ok: false, msg: 'Invalid email or password.' };
    DB.set('session', { id: user.id, name: user.name, email: user.email, avatar: user.name[0].toUpperCase() });
    return { ok: true };
  },

  signup(name, email, password) {
    const users = DB.get('users', []);
    if (users.find(u => u.email === email)) return { ok: false, msg: 'Email already registered.' };
    const user = { id: Date.now().toString(), name, email, password: this._hash(password), createdAt: new Date().toISOString() };
    users.push(user);
    DB.set('users', users);
    DB.set('session', { id: user.id, name, email, avatar: name[0].toUpperCase() });
    // Seed demo data for new user
    this._seedData(user.id);
    return { ok: true };
  },

  logout() {
    DB.remove('session');
    window.location.href = '../index.html';
  },

  requireAuth() {
    if (!this.getSession()) {
      window.location.href = '../index.html';
      return false;
    }
    return true;
  },

  _hash(str) {
    // Simple hash for demo (NOT for production!)
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = (Math.imul(31, h) + str.charCodeAt(i)) | 0; }
    return h.toString(16);
  },

  _seedData(userId) {
    const now = new Date();
    const transactions = [];
    const cats = ['Food & Dining','Transport','Housing','Health','Shopping','Entertainment','Income'];
    const amounts = [[-1200, -800, -950, -300, -150, -500, -200, -80, -120, -450, 3500, -600, -180, -220, -75]];
    const descs = ['Grocery Shopping','Uber Ride','Monthly Rent','Doctor Visit','New Clothes','Netflix','Salary','Coffee','Lunch Out','Electric Bill','Freelance Work','Gym Membership','Movie Tickets','Restaurant Dinner','Bus Pass'];
    const catMap = ['Food & Dining','Transport','Housing','Health','Shopping','Entertainment','Income','Food & Dining','Food & Dining','Housing','Income','Health','Entertainment','Food & Dining','Transport'];

    for (let i = 0; i < 15; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - Math.floor(Math.random() * 60));
      transactions.push({
        id: `t_${i}`,
        userId,
        desc: descs[i],
        amount: amounts[0][i],
        category: catMap[i],
        date: d.toISOString().split('T')[0],
        type: amounts[0][i] > 0 ? 'income' : 'expense',
        note: ''
      });
    }
    DB.set(`tx_${userId}`, transactions);

    const budgets = [
      { id: 'b1', userId, category: 'Food & Dining', limit: 600, color: '#E8A87C', icon: '🍽️' },
      { id: 'b2', userId, category: 'Transport', limit: 200, color: '#7CB8E8', icon: '🚗' },
      { id: 'b3', userId, category: 'Shopping', limit: 300, color: '#E87CA8', icon: '🛍️' },
      { id: 'b4', userId, category: 'Entertainment', limit: 150, color: '#E8DC7C', icon: '🎬' },
      { id: 'b5', userId, category: 'Health', limit: 250, color: '#7CE8A8', icon: '❤️' }
    ];
    DB.set(`budgets_${userId}`, budgets);

    const goals = [
      { id: 'g1', userId, name: 'Emergency Fund', target: 10000, saved: 3500, icon: '🛡️', color: '#7C6BA0', deadline: new Date(now.getFullYear(), now.getMonth() + 8, 1).toISOString().split('T')[0] },
      { id: 'g2', userId, name: 'Vacation Trip', target: 3000, saved: 1200, icon: '✈️', color: '#A08CC8', deadline: new Date(now.getFullYear() + 1, 2, 1).toISOString().split('T')[0] },
      { id: 'g3', userId, name: 'New Laptop', target: 1500, saved: 800, icon: '💻', color: '#C8A8D8', deadline: new Date(now.getFullYear(), now.getMonth() + 3, 1).toISOString().split('T')[0] }
    ];
    DB.set(`goals_${userId}`, goals);

    const categories = [
      { id: 'c1', name: 'Food & Dining', icon: '🍽️', color: '#E8A87C', type: 'expense' },
      { id: 'c2', name: 'Transport', icon: '🚗', color: '#7CB8E8', type: 'expense' },
      { id: 'c3', name: 'Housing', icon: '🏠', color: '#B87CE8', type: 'expense' },
      { id: 'c4', name: 'Health', icon: '❤️', color: '#7CE8A8', type: 'expense' },
      { id: 'c5', name: 'Shopping', icon: '🛍️', color: '#E87CA8', type: 'expense' },
      { id: 'c6', name: 'Entertainment', icon: '🎬', color: '#E8DC7C', type: 'expense' },
      { id: 'c7', name: 'Income', icon: '💰', color: '#7CE87C', type: 'income' },
      { id: 'c8', name: 'Utilities', icon: '💡', color: '#A8A8A8', type: 'expense' }
    ];
    DB.set(`cats_${userId}`, categories);
  }
};

// ── Transaction Manager ───────────────────────────────
const TxManager = {
  getAll(userId) { return DB.get(`tx_${userId}`, []); },
  save(userId, txList) { DB.set(`tx_${userId}`, txList); },
  add(userId, tx) {
    const list = this.getAll(userId);
    tx.id = 'tx_' + Date.now();
    tx.userId = userId;
    list.unshift(tx);
    this.save(userId, list);
    Notify.budget(userId, tx);
    return tx;
  },
  update(userId, id, data) {
    const list = this.getAll(userId).map(t => t.id === id ? { ...t, ...data } : t);
    this.save(userId, list);
  },
  delete(userId, id) {
    this.save(userId, this.getAll(userId).filter(t => t.id !== id));
  },
  getThisMonth(userId) {
    const now = new Date();
    return this.getAll(userId).filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  },
  getSummary(userId) {
    const month = this.getThisMonth(userId);
    const income  = month.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0);
    const expense = month.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
    return { income, expense, balance: income - expense, count: month.length };
  },
  getByCategory(userId) {
    const expenses = this.getThisMonth(userId).filter(t => t.type === 'expense');
    const map = {};
    expenses.forEach(t => {
      map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
    });
    return map;
  }
};

// ── Budget Manager ────────────────────────────────────
const BudgetManager = {
  getAll(userId) { return DB.get(`budgets_${userId}`, []); },
  save(userId, list) { DB.set(`budgets_${userId}`, list); },
  add(userId, budget) {
    const list = this.getAll(userId);
    budget.id = 'b_' + Date.now();
    list.push(budget);
    this.save(userId, list);
  },
  update(userId, id, data) {
    this.save(userId, this.getAll(userId).map(b => b.id === id ? { ...b, ...data } : b));
  },
  delete(userId, id) {
    this.save(userId, this.getAll(userId).filter(b => b.id !== id));
  },
  getSpending(userId) {
    const catMap = TxManager.getByCategory(userId);
    return this.getAll(userId).map(b => ({
      ...b,
      spent: catMap[b.category] || 0,
      percent: Math.min(100, Math.round(((catMap[b.category] || 0) / b.limit) * 100))
    }));
  }
};

// ── Goals Manager ─────────────────────────────────────
const GoalManager = {
  getAll(userId) { return DB.get(`goals_${userId}`, []); },
  save(userId, list) { DB.set(`goals_${userId}`, list); },
  add(userId, goal) {
    const list = this.getAll(userId);
    goal.id = 'g_' + Date.now();
    list.push(goal);
    this.save(userId, list);
  },
  update(userId, id, data) {
    this.save(userId, this.getAll(userId).map(g => g.id === id ? { ...g, ...data } : g));
  },
  delete(userId, id) {
    this.save(userId, this.getAll(userId).filter(g => g.id !== id));
  }
};

// ── Category Manager ──────────────────────────────────
const CatManager = {
  getAll(userId) { return DB.get(`cats_${userId}`, []); },
  save(userId, list) { DB.set(`cats_${userId}`, list); },
  add(userId, cat) {
    const list = this.getAll(userId);
    cat.id = 'c_' + Date.now();
    list.push(cat);
    this.save(userId, list);
  },
  update(userId, id, data) {
    this.save(userId, this.getAll(userId).map(c => c.id === id ? { ...c, ...data } : c));
  },
  delete(userId, id) {
    this.save(userId, this.getAll(userId).filter(c => c.id !== id));
  }
};

// ── Notification Manager ──────────────────────────────
const Notify = {
  ICONS: { success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️' },

  show(msg, type = 'info', duration = 3500) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${this.ICONS[type]}</span><span>${msg}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  },

  budget(userId, tx) {
    if (tx.type !== 'expense') return;
    const budgets = BudgetManager.getSpending(userId);
    const b = budgets.find(b => b.category === tx.category);
    if (!b) return;
    if (b.percent >= 100) {
      this.show(`Budget exceeded for ${b.category}! 🚨`, 'danger', 5000);
      this._storeNotification(userId, `Budget exceeded for ${b.category}`, 'danger');
    } else if (b.percent >= 80) {
      this.show(`Warning: ${b.category} budget at ${b.percent}%`, 'warning', 4000);
      this._storeNotification(userId, `${b.category} budget at ${b.percent}%`, 'warning');
    }
  },

  _storeNotification(userId, message, type) {
    const notes = DB.get(`notifs_${userId}`, []);
    notes.unshift({ id: 'n_' + Date.now(), message, type, read: false, time: new Date().toISOString() });
    DB.set(`notifs_${userId}`, notes.slice(0, 50));
  },

  getAll(userId) { return DB.get(`notifs_${userId}`, []); },
  markRead(userId, id) {
    const notes = this.getAll(userId).map(n => n.id === id ? { ...n, read: true } : n);
    DB.set(`notifs_${userId}`, notes);
  },
  markAllRead(userId) {
    const notes = this.getAll(userId).map(n => ({ ...n, read: true }));
    DB.set(`notifs_${userId}`, notes);
  },
  unreadCount(userId) { return this.getAll(userId).filter(n => !n.read).length; }
};

// ── Formatters ────────────────────────────────────────
const Fmt = {
  currency(n, currency = '₹') { return `${currency}${Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; },
  date(str) { return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); },
  dateShort(str) { return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); },
  relativeTime(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
};

// ── Shared Sidebar Builder ────────────────────────────
function buildNav(activePage) {
  const session = Auth.getSession();
  if (!session) return;

  const unread = Notify.unreadCount(session.id);
  const navItems = [
    { href: 'dashboard.html',     icon: '🏠', label: 'Dashboard' },
    { href: 'transactions.html',  icon: '💸', label: 'Transactions' },
    { href: 'budgets.html',       icon: '🎯', label: 'Budgets' },
    { href: 'goals.html',         icon: '🚀', label: 'Goals' },
    { href: 'statistics.html',    icon: '📊', label: 'Statistics' },
    { href: 'reports.html',       icon: '📋', label: 'Reports' },
    { href: 'categories.html',    icon: '🏷️', label: 'Categories' },
    { href: 'notifications.html', icon: '🔔', label: 'Notifications', badge: unread },
    { href: 'settings.html',      icon: '⚙️', label: 'Settings' }
  ];

  const navHTML = navItems.map(item => `
    <a href="${item.href}" class="nav-item ${activePage === item.href ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
    </a>
  `).join('');

  return `
    <div class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">🌸</div>
        <span>Bloom</span>
      </div>
      <div class="nav-section-label">Main</div>
      ${navHTML}
      <div style="margin-top:auto;padding-top:16px;border-top:1.5px solid var(--border);">
        <div class="flex items-center gap-8 cursor-pointer nav-item" onclick="Auth.logout()">
          <span class="nav-icon">👋</span>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
  `;
}

function buildTopbar(title) {
  const session = Auth.getSession();
  return `
    <div class="topbar">
      <button class="hamburger" id="hamburger" onclick="toggleSidebar()">
        <span></span><span></span><span></span>
      </button>
      <span class="topbar-title">${title}</span>
      <div class="topbar-actions">
        <button class="btn btn-ghost btn-icon" onclick="ThemeManager.toggle()" title="Toggle theme">
          <span id="themeIcon">🌙</span>
        </button>
        <div class="avatar" title="${session?.name}">${session?.avatar || '?'}</div>
      </div>
    </div>
  `;
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('show');
}
