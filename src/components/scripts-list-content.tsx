'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Terminal, ArrowRight, Copy, Check, FileCode, Upload, Search,
  Zap, Database, Globe, Shield, BarChart3, FileText, Image,
  Mail, Folder, Clock, LayoutGrid, Code, Webhook, HardDrive,
  Cpu, Wifi
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdBanner } from '@/components/ads/ad-banner';

// ─── Category Definitions ────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All Scripts', icon: LayoutGrid },
  { id: 'Automation', label: 'Automation', icon: Zap },
  { id: 'Web Scraping', label: 'Web Scraping', icon: Globe },
  { id: 'DevOps', label: 'DevOps & Deploy', icon: Webhook },
  { id: 'Data Processing', label: 'Data Processing', icon: Database },
  { id: 'Security', label: 'Security', icon: Shield },
  { id: 'Files', label: 'File Management', icon: Folder },
  { id: 'API', label: 'API & HTTP', icon: Webhook },
  { id: 'Monitoring', label: 'Monitoring & Logs', icon: BarChart3 },
  { id: 'Productivity', label: 'Productivity', icon: Clock },
  { id: 'Email', label: 'Email & Notifications', icon: Mail },
  { id: 'Images', label: 'Image & Media', icon: Image },
];

function getLangColor(lang: string) {
  const map: Record<string, string> = {
    Python: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    JavaScript: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Bash: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400',
    Go: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
    SQL: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    PowerShell: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
  };
  return map[lang] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400';
}

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Automation: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
    'Web Scraping': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
    DevOps: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    'Data Processing': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Security: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    Files: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    API: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
    Monitoring: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
    Productivity: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
    Email: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
    Images: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  };
  return map[cat] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400';
}

function getCategoryIcon(cat: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Automation: Zap,
    'Web Scraping': Globe,
    DevOps: Webhook,
    'Data Processing': Database,
    Security: Shield,
    Files: Folder,
    API: Webhook,
    Monitoring: BarChart3,
    Productivity: Clock,
    Email: Mail,
    Images: Image,
  };
  return map[cat] || Terminal;
}

// ─── 35+ Scripts ─────────────────────────────────────────────────────────────
const scripts = [
  // ── Automation (1-5) ────────────────────────────────────────────────────────
  {
    title: 'File Renamer — Batch Rename with Regex',
    description: 'Batch rename files in a directory using regex patterns with dry-run mode, recursive scanning, and undo functionality. Perfect for organizing photo libraries and downloaded files.',
    language: 'Python',
    tags: ['Python', 'Automation', 'Files', 'Regex'],
    lines: 85,
    category: 'Automation',
    code: `import os\nimport re\nimport argparse\nfrom pathlib import Path\n\ndef batch_rename(directory, pattern, replacement, dry_run=True):\n    """Batch rename files using regex pattern matching."""\n    renamed = 0\n    for filepath in Path(directory).rglob('*'):\n        if filepath.is_file():\n            new_name = re.sub(pattern, replacement, filepath.name)\n            if new_name != filepath.name:\n                new_path = filepath.parent / new_name\n                print(f"{'[DRY] ' if dry_run else ''}{filepath.name} -> {new_name}")\n                if not dry_run:\n                    filepath.rename(new_path)\n                renamed += 1\n    return renamed`,
  },
  {
    title: 'Automated Backup Script with Compression',
    description: 'Automated backup script that compresses directories, rotates old backups, and uploads to cloud storage. Supports incremental backups, encryption, and scheduled execution via cron or Task Scheduler.',
    language: 'Python',
    tags: ['Python', 'Backup', 'Compression', 'Cloud'],
    lines: 92,
    category: 'Automation',
    code: `import shutil\nimport tarfile\nfrom pathlib import Path\nfrom datetime import datetime\n\ndef create_backup(source_dir, backup_dir, max_backups=7):\n    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')\n    backup_name = f"backup_{timestamp}.tar.gz"\n    backup_path = Path(backup_dir) / backup_name\n    with tarfile.open(backup_path, "w:gz") as tar:\n        tar.add(source_dir, arcname=Path(source_dir).name)\n    backups = sorted(Path(backup_dir).glob("backup_*.tar.gz"))\n    while len(backups) > max_backups:\n        backups[0].unlink()\n        backups.pop(0)\n    return backup_path`,
  },
  {
    title: 'Cron Job Manager — Schedule & Monitor Tasks',
    description: 'Manage cron jobs with a simple Python interface. Add, remove, list, and validate scheduled tasks with human-readable descriptions and error logging for failed executions.',
    language: 'Python',
    tags: ['Python', 'Cron', 'Scheduling', 'Monitoring'],
    lines: 78,
    category: 'Automation',
    code: `import subprocess\nimport croniter\nfrom datetime import datetime\n\ndef list_cron_jobs():\n    result = subprocess.run(['crontab', '-l'], capture_output=True, text=True)\n    return [line for line in result.stdout.split('\\n') if line and not line.startswith('#')]\n\ndef add_cron_job(schedule, command, comment=''):\n    entry = f"{schedule} {command}"\n    if comment:\n        entry = f"# {comment}\\n{entry}"\n    current = list_cron_jobs()\n    current.append(entry)\n    subprocess.run(['crontab', '-'], input='\\n'.join(current), text=True)\n\ndef remove_cron_job(pattern):\n    jobs = list_cron_jobs()\n    filtered = [j for j in jobs if pattern not in j]\n    subprocess.run(['crontab', '-'], input='\\n'.join(filtered), text=True)`,
  },
  {
    title: 'Spreadsheet Automation — Excel to Google Sheets',
    description: 'Automatically sync Excel files to Google Sheets with formatting preservation. Monitors a directory for new files, converts, and uploads while maintaining cell styles, formulas, and charts.',
    language: 'Python',
    tags: ['Python', 'Excel', 'Google Sheets', 'Sync'],
    lines: 105,
    category: 'Automation',
    code: `import gspread\nimport openpyxl\nfrom oauth2client.service_account import ServiceAccountCredentials\n\ndef excel_to_sheets(excel_path, sheet_name, credentials_json):\n    scope = ['https://spreadsheets.google.com/feeds',\n             'https://www.googleapis.com/auth/drive']\n    creds = ServiceAccountCredentials.from_json_keyfile_name(credentials_json, scope)\n    client = gspread.authorize(creds)\n    wb = openpyxl.load_workbook(excel_path)\n    ws = wb.active\n    spreadsheet = client.create(sheet_name)\n    sheet = spreadsheet.sheet1\n    for row in ws.iter_rows(values_only=True):\n        sheet.append_row(list(row))\n    return spreadsheet.url`,
  },
  {
    title: 'System Update Automation Script',
    description: 'Automate system updates across Linux servers with pre-checks, snapshots, and rollback capability. Logs all changes and sends notification emails on success or failure.',
    language: 'Bash',
    tags: ['Bash', 'Linux', 'Updates', 'Server'],
    lines: 68,
    category: 'Automation',
    code: `#!/bin/bash\n# System Update Automation\nset -euo pipefail\n\nLOG_FILE="/var/log/auto-update.log"\nlog() { echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"; }\n\nlog "Starting system update..."\napt-get update -y >> "$LOG_FILE" 2>&1\napt-get upgrade -y >> "$LOG_FILE" 2>&1\napt-get autoremove -y >> "$LOG_FILE" 2>&1\napt-get autoclean -y >> "$LOG_FILE" 2>&1\n\nif [ $? -eq 0 ]; then\n    log "Update completed successfully"\nelse\n    log "ERROR: Update failed"\n    exit 1\nfi`,
  },

  // ── Web Scraping (6-10) ─────────────────────────────────────────────────────
  {
    title: 'Web Scraper with Rate Limiting & Retry',
    description: 'Production-ready web scraper with configurable rate limiting, automatic retries, proxy rotation, and user-agent spoofing. Handles pagination, JavaScript-rendered pages, and exports to JSON/CSV.',
    language: 'Python',
    tags: ['Python', 'Scraping', 'Requests', 'BeautifulSoup'],
    lines: 110,
    category: 'Web Scraping',
    code: `import requests\nfrom bs4 import BeautifulSoup\nimport time\nimport random\n\ndef scrape(url, retries=3, delay=1.0):\n    headers = {'User-Agent': 'Mozilla/5.0 (compatible; Scraper/1.0)'}\n    for attempt in range(retries):\n        try:\n            resp = requests.get(url, headers=headers, timeout=10)\n            resp.raise_for_status()\n            return BeautifulSoup(resp.text, 'html.parser')\n        except requests.RequestException as e:\n            wait = delay * (2 ** attempt) + random.uniform(0, 1)\n            print(f"Retry {attempt+1}/{retries} after {wait:.1f}s: {e}")\n            time.sleep(wait)\n    return None`,
  },
  {
    title: 'SEO Analyzer — On-Page Checker',
    description: 'Analyze web pages for SEO issues including meta tags, heading structure, image alt text, broken links, page speed indicators, and content quality metrics. Generates actionable reports.',
    language: 'Python',
    tags: ['Python', 'SEO', 'Analysis', 'Web'],
    lines: 135,
    category: 'Web Scraping',
    code: `import requests\nfrom bs4 import BeautifulSoup\nfrom urllib.parse import urljoin, urlparse\n\ndef analyze_seo(url):\n    resp = requests.get(url, timeout=10)\n    soup = BeautifulSoup(resp.text, 'html.parser')\n    report = {}\n    report['title'] = soup.title.string if soup.title else 'MISSING'\n    report['meta_desc'] = soup.find('meta', attrs={'name': 'description'})\n    report['h1_count'] = len(soup.find_all('h1'))\n    report['h2_count'] = len(soup.find_all('h2'))\n    imgs = soup.find_all('img')\n    report['images_without_alt'] = sum(1 for i in imgs if not i.get('alt'))\n    links = soup.find_all('a', href=True)\n    report['internal_links'] = sum(1 for a in links if urlparse(a['href']).netloc == urlparse(url).netloc)\n    report['external_links'] = len(links) - report['internal_links']\n    return report`,
  },
  {
    title: 'Price Tracker — Monitor Product Prices',
    description: 'Track product prices across e-commerce sites with configurable price drop alerts. Supports Amazon, eBay, and custom stores with price history logging and trend visualization data.',
    language: 'Python',
    tags: ['Python', 'Price Tracking', 'E-Commerce', 'Alerts'],
    lines: 98,
    category: 'Web Scraping',
    code: `import requests\nfrom bs4 import BeautifulSoup\nimport json\nfrom datetime import datetime\n\ndef track_price(url, selector, target_price):\n    resp = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})\n    soup = BeautifulSoup(resp.text, 'html.parser')\n    price_elem = soup.select_one(selector)\n    if not price_elem:\n        return None\n    price_text = price_elem.get_text(strip=True).replace('$', '').replace(',', '')\n    current_price = float(price_text)\n    record = {'url': url, 'price': current_price, 'date': datetime.now().isoformat()}\n    if current_price <= target_price:\n        print(f"ALERT: Price dropped to ${current_price}!")\n    return record`,
  },
  {
    title: 'LinkedIn Profile Scraper',
    description: 'Extract public profile data from LinkedIn including experience, education, and skills. Uses session management and rate limiting to avoid detection. Exports to structured JSON format.',
    language: 'Python',
    tags: ['Python', 'LinkedIn', 'Scraping', 'Profiles'],
    lines: 88,
    category: 'Web Scraping',
    code: `import requests\nfrom bs4 import BeautifulSoup\nimport json\nimport time\n\ndef scrape_linkedin(profile_url, session_cookie):\n    headers = {'User-Agent': 'Mozilla/5.0'}\n    cookies = {'li_at': session_cookie}\n    resp = requests.get(profile_url, headers=headers, cookies=cookies)\n    soup = BeautifulSoup(resp.text, 'html.parser')\n    data = {\n        'name': soup.find('h1').get_text(strip=True) if soup.find('h1') else '',\n        'headline': soup.find('div', class_='text-body-medium').get_text(strip=True) if soup.find('div', class_='text-body-medium') else '',\n    }\n    return data`,
  },
  {
    title: 'Sitemap Generator — Crawl & Build XML Sitemaps',
    description: 'Crawl a website and generate a valid XML sitemap with proper lastmod, changefreq, and priority values. Respects robots.txt and handles large sites with sitemap index splitting.',
    language: 'Python',
    tags: ['Python', 'Sitemap', 'SEO', 'Crawler'],
    lines: 115,
    category: 'Web Scraping',
    code: `import requests\nfrom bs4 import BeautifulSoup\nfrom urllib.parse import urljoin, urlparse\nfrom xml.etree.ElementTree import Element, SubElement, tostring\n\ndef generate_sitemap(base_url, max_pages=500):\n    visited = set()\n    to_visit = {base_url}\n    while to_visit and len(visited) < max_pages:\n        url = to_visit.pop()\n        if url in visited:\n            continue\n        visited.add(url)\n        try:\n            resp = requests.get(url, timeout=10)\n            soup = BeautifulSoup(resp.text, 'html.parser')\n            for link in soup.find_all('a', href=True):\n                full_url = urljoin(url, link['href'])\n                if urlparse(full_url).netloc == urlparse(base_url).netloc:\n                    to_visit.add(full_url)\n        except:\n            pass\n    return visited`,
  },

  // ── DevOps & Deploy (11-15) ─────────────────────────────────────────────────
  {
    title: 'Docker Compose Generator',
    description: 'Generate docker-compose.yml files from a simple configuration object. Supports multi-service setups, volumes, networks, environment variables, health checks, and development overrides.',
    language: 'Python',
    tags: ['Python', 'Docker', 'DevOps', 'Containers'],
    lines: 95,
    category: 'DevOps',
    code: `import yaml\n\ndef generate_compose(services, project_name='myapp'):\n    compose = {'version': '3.8', 'services': {}}\n    for svc in services:\n        compose['services'][svc['name']] = {\n            'image': svc['image'],\n            'ports': svc.get('ports', []),\n            'environment': svc.get('env', {}),\n            'volumes': svc.get('volumes', []),\n            'restart': svc.get('restart', 'unless-stopped'),\n            'healthcheck': svc.get('healthcheck'),\n        }\n    if any(s.get('volumes') for s in services):\n        compose['volumes'] = {v.split(':')[0]: {} for s in services for v in s.get('volumes', [])}\n    return yaml.dump(compose, default_flow_style=False)`,
  },
  {
    title: 'SSL Certificate Expiry Monitor',
    description: 'Monitor SSL certificates for multiple domains and send alerts before expiration. Checks certificate chain validity, remaining days, and provides installation instructions for renewal.',
    language: 'Python',
    tags: ['Python', 'SSL', 'Monitoring', 'Security'],
    lines: 62,
    category: 'DevOps',
    code: `import ssl\nimport socket\nfrom datetime import datetime\n\ndef check_ssl_expiry(hostname, port=443, warn_days=30):\n    context = ssl.create_default_context()\n    conn = context.wrap_socket(socket.socket(), server_hostname=hostname)\n    conn.connect((hostname, port))\n    cert = conn.getpeercert()\n    conn.close()\n    expiry = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')\n    remaining = (expiry - datetime.now()).days\n    return {'hostname': hostname, 'expiry': expiry.isoformat(), 'days_remaining': remaining, 'warning': remaining <= warn_days}`,
  },
  {
    title: 'Nginx Config Generator',
    description: 'Generate optimized Nginx configuration files for reverse proxy, static sites, and Node.js apps. Includes SSL setup, gzip compression, caching headers, and security hardening.',
    language: 'Python',
    tags: ['Python', 'Nginx', 'Config', 'Web Server'],
    lines: 88,
    category: 'DevOps',
    code: `def generate_nginx_config(domain, upstream_port, ssl=True):\n    config = f\"\"\"\nserver {{\n    listen 80;\n    server_name {domain};\n    return 301 https://$host$request_uri;\n}}\nserver {{\n    listen 443 ssl http2;\n    server_name {domain};\n    ssl_certificate /etc/letsencrypt/live/{domain}/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/{domain}/privkey.pem;\n    location / {{\n        proxy_pass http://127.0.0.1:{upstream_port};\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }}\n}}\"\"\"\n    return config`,
  },
  {
    title: 'GitHub Actions Workflow Builder',
    description: 'Generate GitHub Actions CI/CD workflow files for Node.js, Python, and Docker projects. Includes build, test, lint, security scan, and deploy stages with caching and matrix builds.',
    language: 'TypeScript',
    tags: ['TypeScript', 'GitHub Actions', 'CI/CD', 'DevOps'],
    lines: 120,
    category: 'DevOps',
    code: `import * as yaml from 'js-yaml';\n\ninterface WorkflowConfig {\n  name: string;\n  nodeVersion?: string;\n  pythonVersion?: string;\n  deployTarget?: 'vercel' | 'aws' | 'docker';\n}\n\nfunction buildWorkflow(config: WorkflowConfig): string {\n  const workflow = {\n    name: config.name,\n    on: { push: { branches: ['main'] }, pull_request: { branches: ['main'] } },\n    jobs: {\n      build: {\n        'runs-on': 'ubuntu-latest',\n        steps: [\n          { uses: 'actions/checkout@v4' },\n          { uses: 'actions/setup-node@v4', with: { 'node-version': config.nodeVersion || '20' } },\n          { run: 'npm ci' },\n          { run: 'npm run build' },\n          { run: 'npm test' },\n        ],\n      },\n    },\n  };\n  return yaml.dump(workflow);\n}`,
  },
  {
    title: 'Log Rotation & Cleanup Script',
    description: 'Automate log file rotation with compression, age-based cleanup, and size limits. Supports custom retention policies, disk space monitoring, and notification when thresholds are exceeded.',
    language: 'Bash',
    tags: ['Bash', 'Logs', 'Rotation', 'Cleanup'],
    lines: 55,
    category: 'DevOps',
    code: `#!/bin/bash\n# Log Rotation & Cleanup\nLOG_DIR="/var/log/app"\nMAX_AGE_DAYS=30\nMAX_SIZE_MB=500\n\ncd "$LOG_DIR" || exit 1\n\n# Compress logs older than 1 day\nfind . -name "*.log" -mtime +1 ! -name "*.gz" -exec gzip {} \\;\n\n# Remove compressed logs older than MAX_AGE_DAYS\nfind . -name "*.log.gz" -mtime +$MAX_AGE_DAYS -delete\n\n# Check total log directory size\nTOTAL_SIZE=$(du -sm "$LOG_DIR" | cut -f1)\nif [ "$TOTAL_SIZE" -gt "$MAX_SIZE_MB" ]; then\n    echo "WARNING: Log directory exceeds ${MAX_SIZE_MB}MB (current: ${TOTAL_SIZE}MB)"\n    # Remove oldest files first\n    find . -name "*.gz" -printf '%T+ %p\\n' | sort | head -5 | awk '{print $2}' | xargs rm -f\nfi`,
  },

  // ── Data Processing (16-20) ─────────────────────────────────────────────────
  {
    title: 'JSON to CSV Converter',
    description: 'Versatile JSON to CSV converter with nested object flattening, custom field selection, and encoding support. Handles large files efficiently with streaming and batch processing.',
    language: 'Python',
    tags: ['Python', 'JSON', 'CSV', 'Data Processing'],
    lines: 68,
    category: 'Data Processing',
    code: `import json\nimport csv\nfrom pathlib import Path\n\ndef flatten_json(data, prefix=''):\n    items = {}\n    for key, value in data.items():\n        new_key = f"{prefix}.{key}" if prefix else key\n        if isinstance(value, dict):\n            items.update(flatten_json(value, new_key))\n        elif isinstance(value, list):\n            items[new_key] = str(value)\n        else:\n            items[new_key] = value\n    return items\n\ndef json_to_csv(input_file, output_file):\n    with open(input_file, 'r') as f:\n        data = json.load(f)\n    if isinstance(data, dict):\n        data = [data]\n    flattened = [flatten_json(item) for item in data]\n    fields = list(dict.fromkeys(k for item in flattened for k in item))\n    with open(output_file, 'w', newline='') as f:\n        writer = csv.DictWriter(f, fieldnames=fields)\n        writer.writeheader()\n        writer.writerows(flattened)`,
  },
  {
    title: 'Database Backup & Restore Utility',
    description: 'Complete database backup and restore utility supporting PostgreSQL, MySQL, and SQLite. Includes compression, encryption, scheduled backups, and point-in-time recovery options.',
    language: 'Python',
    tags: ['Python', 'Database', 'Backup', 'PostgreSQL'],
    lines: 95,
    category: 'Data Processing',
    code: `import subprocess\nimport gzip\nfrom datetime import datetime\nfrom pathlib import Path\n\ndef backup_postgres(db_name, user, host, output_dir, compress=True):\n    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')\n    filename = f"{db_name}_{timestamp}.sql"\n    filepath = Path(output_dir) / filename\n    cmd = f"pg_dump -U {user} -h {host} {db_name}"\n    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)\n    if result.returncode != 0:\n        raise Exception(f"Backup failed: {result.stderr}")\n    if compress:\n        with gzip.open(f"{filepath}.gz", 'wt') as f:\n            f.write(result.stdout)\n        return f"{filepath}.gz"\n    else:\n        filepath.write_text(result.stdout)\n        return filepath`,
  },
  {
    title: 'CSV Data Cleaner & Normalizer',
    description: 'Clean and normalize CSV data with duplicate removal, whitespace trimming, date format standardization, and type inference. Handles missing values with configurable strategies (drop, fill, interpolate).',
    language: 'Python',
    tags: ['Python', 'CSV', 'Cleaning', 'Normalization'],
    lines: 88,
    category: 'Data Processing',
    code: `import pandas as pd\nimport numpy as np\n\ndef clean_csv(filepath, **kwargs):\n    df = pd.read_csv(filepath)\n    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')\n    df = df.drop_duplicates()\n    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)\n    for col in df.select_dtypes(include=['object']):\n        try:\n            df[col] = pd.to_datetime(df[col])\n        except:\n            pass\n    strategy = kwargs.get('missing', 'drop')\n    if strategy == 'drop':\n        df = df.dropna()\n    elif strategy == 'fill':\n        df = df.fillna(df.mean(numeric_only=True))\n    return df`,
  },
  {
    title: 'API Data Pipeline — Fetch, Transform, Load',
    description: 'ETL pipeline script that fetches data from REST APIs, transforms and normalizes the response, and loads into databases or data warehouses. Supports pagination, rate limiting, and error recovery.',
    language: 'Python',
    tags: ['Python', 'ETL', 'API', 'Pipeline'],
    lines: 105,
    category: 'Data Processing',
    code: `import requests\nimport pandas as pd\nfrom typing import List, Dict\n\ndef fetch_data(url: str, params: dict = None, headers: dict = None) -> List[Dict]:\n    all_data = []\n    page = 1\n    while True:\n        resp = requests.get(url, params={**params, 'page': page}, headers=headers)\n        resp.raise_for_status()\n        data = resp.json()\n        if not data:\n            break\n        all_data.extend(data if isinstance(data, list) else [data])\n        page += 1\n    return all_data\n\ndef transform(data: List[Dict]) -> pd.DataFrame:\n    df = pd.DataFrame(data)\n    df.columns = [c.lower().replace(' ', '_') for c in df.columns]\n    return df\n\ndef load(df: pd.DataFrame, output: str):\n    df.to_csv(output, index=False)`,
  },
  {
    title: 'XML to JSON Converter with Schema Validation',
    description: 'Convert XML files to JSON with proper type inference, namespace handling, and optional XSD schema validation. Handles complex nested structures and attribute preservation.',
    language: 'Python',
    tags: ['Python', 'XML', 'JSON', 'Schema'],
    lines: 72,
    category: 'Data Processing',
    code: `import xmltodict\nimport json\nfrom pathlib import Path\n\ndef xml_to_json(xml_path, json_path=None, pretty=True):\n    with open(xml_path, 'r', encoding='utf-8') as f:\n        xml_content = f.read()\n    data = xmltodict.parse(xml_content)\n    output = json.dumps(data, indent=2 if pretty else None, ensure_ascii=False)\n    if json_path:\n        Path(json_path).write_text(output, encoding='utf-8')\n    return data`,
  },

  // ── Security (21-24) ────────────────────────────────────────────────────────
  {
    title: 'Password Strength Analyzer & Generator',
    description: 'Analyze password strength with entropy calculation, dictionary attack simulation, and pattern detection. Generate strong passwords with customizable length, character sets, and readability options.',
    language: 'Python',
    tags: ['Python', 'Security', 'Password', 'Generator'],
    lines: 75,
    category: 'Security',
    code: `import secrets\nimport string\nimport math\n\ndef analyze_password(password):\n    entropy = 0\n    charsets = {'lower': string.ascii_lowercase in password, 'upper': string.ascii_uppercase in password,\n                'digits': string.digits in password, 'special': any(c in string.punctuation for c in password)}\n    pool_size = sum(26 if v in ('lower', 'upper') else 10 if v == 'digits' else 32 for v, has in charsets.items() if has)\n    entropy = len(password) * math.log2(max(pool_size, 1))\n    return {'entropy': round(entropy, 1), 'score': min(entropy / 128, 1.0), 'length': len(password)}\n\ndef generate_password(length=20, use_special=True):\n    chars = string.ascii_letters + string.digits + (string.punctuation if use_special else '')\n    return ''.join(secrets.choice(chars) for _ in range(length))`,
  },
  {
    title: 'Port Scanner — Network Security Audit',
    description: 'Fast multi-threaded port scanner for security auditing with service detection, banner grabbing, and vulnerability assessment. Outputs structured results with risk levels and remediation suggestions.',
    language: 'Python',
    tags: ['Python', 'Security', 'Networking', 'Scanning'],
    lines: 82,
    category: 'Security',
    code: `import socket\nimport concurrent.futures\nfrom typing import Dict, List\n\ndef scan_port(host: str, port: int, timeout: float = 1.0) -> Dict:\n    try:\n        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:\n            s.settimeout(timeout)\n            result = s.connect_ex((host, port))\n            if result == 0:\n                try:\n                    s.sendall(b'HEAD / HTTP/1.0\\r\\n\\r\\n')\n                    banner = s.recv(1024).decode(errors='ignore').strip()\n                except:\n                    banner = ''\n                return {'port': port, 'state': 'open', 'banner': banner}\n    except:\n        pass\n    return {'port': port, 'state': 'closed'}\n\ndef scan_host(host: str, ports: range = range(1, 1024)) -> List[Dict]:\n    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:\n        results = list(executor.map(lambda p: scan_port(host, p), ports))\n    return [r for r in results if r.get('state') == 'open']`,
  },
  {
    title: 'File Integrity Monitor — Detect Changes',
    description: 'Monitor files and directories for unauthorized changes using SHA-256 hash comparison. Detects modifications, additions, and deletions with alerts and detailed change reports for compliance auditing.',
    language: 'Python',
    tags: ['Python', 'Security', 'Integrity', 'Monitoring'],
    lines: 70,
    category: 'Security',
    code: `import hashlib\nimport json\nfrom pathlib import Path\n\ndef compute_hash(filepath):\n    sha256 = hashlib.sha256()\n    with open(filepath, 'rb') as f:\n        for chunk in iter(lambda: f.read(8192), b''):\n            sha256.update(chunk)\n    return sha256.hexdigest()\n\ndef scan_directory(directory):\n    hashes = {}\n    for filepath in Path(directory).rglob('*'):\n        if filepath.is_file():\n            hashes[str(filepath)] = compute_hash(filepath)\n    return hashes\n\ndef detect_changes(directory, baseline_file):\n    current = scan_directory(directory)\n    baseline = json.loads(Path(baseline_file).read_text())\n    added = set(current) - set(baseline)\n    removed = set(baseline) - set(current)\n    modified = {f for f in set(current) & set(baseline) if current[f] != baseline[f]}\n    return {'added': list(added), 'removed': list(removed), 'modified': list(modified)}`,
  },
  {
    title: 'JWT Token Inspector & Decoder',
    description: 'Decode and inspect JWT tokens without verification, check expiration, validate claims, and identify potential security issues like weak algorithms, missing claims, or overly long expiration times.',
    language: 'JavaScript',
    tags: ['Node.js', 'JWT', 'Security', 'Token'],
    lines: 55,
    category: 'Security',
    code: `function decodeJWT(token) {\n  const parts = token.split('.');\n  if (parts.length !== 3) throw new Error('Invalid JWT format');\n  const decode = (str) => JSON.parse(Buffer.from(str, 'base64url').toString());\n  const header = decode(parts[0]);\n  const payload = decode(parts[1]);\n  const issues = [];\n  if (header.alg === 'none') issues.push('WARNING: Algorithm "none" detected');\n  if (!payload.exp) issues.push('No expiration set');\n  if (payload.exp && payload.exp - payload.iat > 86400 * 30) issues.push('Token expires after 30+ days');\n  return { header, payload, issues, expired: payload.exp ? Date.now() / 1000 > payload.exp : false };\n}`,
  },

  // ── File Management (25-28) ─────────────────────────────────────────────────
  {
    title: 'Duplicate File Finder & Remover',
    description: 'Find and remove duplicate files using content hash comparison. Supports multiple hash algorithms, dry-run mode, and selective removal. Generates detailed reports of all duplicates found.',
    language: 'Python',
    tags: ['Python', 'Files', 'Duplicates', 'Cleanup'],
    lines: 78,
    category: 'Files',
    code: `import hashlib\nfrom pathlib import Path\nfrom collections import defaultdict\n\ndef find_duplicates(directory):\n    hashes = defaultdict(list)\n    for filepath in Path(directory).rglob('*'):\n        if filepath.is_file():\n            sha256 = hashlib.sha256()\n            with open(filepath, 'rb') as f:\n                for chunk in iter(lambda: f.read(8192), b''):\n                    sha256.update(chunk)\n            hashes[sha256.hexdigest()].append(filepath)\n    return {h: paths for h, paths in hashes.items() if len(paths) > 1}`,
  },
  {
    title: 'File Organizer — Auto-Sort by Type',
    description: 'Automatically organize files into categorized folders based on file type, date, or custom rules. Supports undo, dry-run mode, and configurable category mappings for downloads and desktop cleanup.',
    language: 'Python',
    tags: ['Python', 'Files', 'Organization', 'Automation'],
    lines: 65,
    category: 'Files',
    code: `from pathlib import Path\nimport shutil\n\ndef organize_files(directory, dry_run=True):\n    categories = {\n        'Images': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],\n        'Documents': ['.pdf', '.docx', '.xlsx', '.pptx', '.txt'],\n        'Videos': ['.mp4', '.mkv', '.avi', '.mov'],\n        'Audio': ['.mp3', '.wav', '.flac', '.aac'],\n        'Archives': ['.zip', '.rar', '.7z', '.tar.gz'],\n        'Code': ['.js', '.py', '.ts', '.html', '.css'],\n    }\n    for filepath in Path(directory).iterdir():\n        if filepath.is_file():\n            ext = filepath.suffix.lower()\n            for cat, exts in categories.items():\n                if ext in exts:\n                    dest = Path(directory) / cat\n                    dest.mkdir(exist_ok=True)\n                    print(f"{'[DRY] ' if dry_run else ''}{filepath.name} -> {cat}/")\n                    if not dry_run:\n                        shutil.move(str(filepath), str(dest / filepath.name))\n                    break`,
  },
  {
    title: 'Bulk Image Resizer & Optimizer',
    description: 'Resize and optimize images in bulk with support for multiple formats, quality settings, watermarking, and EXIF data preservation. Uses Pillow for processing with multiprocessing for speed.',
    language: 'Python',
    tags: ['Python', 'Images', 'Resize', 'Optimization'],
    lines: 72,
    category: 'Files',
    code: `from PIL import Image\nfrom pathlib import Path\n\ndef resize_image(input_path, output_path, max_width=1200, quality=85):\n    img = Image.open(input_path)\n    if img.width > max_width:\n        ratio = max_width / img.width\n        new_size = (max_width, int(img.height * ratio))\n        img = img.resize(new_size, Image.Resampling.LANCZOS)\n    img.save(output_path, quality=quality, optimize=True)\n\ndef bulk_resize(directory, output_dir, max_width=1200):\n    output = Path(output_dir)\n    output.mkdir(exist_ok=True)\n    for filepath in Path(directory).rglob('*'):\n        if filepath.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']:\n            resize_image(filepath, output / filepath.name, max_width)`,
  },
  {
    title: 'PDF Merger & Splitter',
    description: 'Merge multiple PDFs into one or split a PDF into individual pages. Supports page range selection, bookmark preservation, and encryption. Also converts images to PDF for easy document creation.',
    language: 'Python',
    tags: ['Python', 'PDF', 'Merge', 'Split'],
    lines: 58,
    category: 'Files',
    code: `from PyPDF2 import PdfReader, PdfWriter\nfrom pathlib import Path\n\ndef merge_pdfs(pdf_paths, output_path):\n    writer = PdfWriter()\n    for path in pdf_paths:\n        reader = PdfReader(path)\n        for page in reader.pages:\n            writer.add_page(page)\n    with open(output_path, 'wb') as f:\n        writer.write(f)\n\ndef split_pdf(pdf_path, output_dir):\n    reader = PdfReader(pdf_path)\n    for i, page in enumerate(reader.pages):\n        writer = PdfWriter()\n        writer.add_page(page)\n        output = Path(output_dir) / f"page_{i+1}.pdf"\n        with open(output, 'wb') as f:\n            writer.write(f)`,
  },

  // ── API & HTTP (29-32) ──────────────────────────────────────────────────────
  {
    title: 'API Health Monitor with Alerts',
    description: 'Monitor API endpoints with configurable health checks, response time measurement, and multi-channel alerting via email and Slack. Includes SLA tracking and uptime percentage calculation.',
    language: 'JavaScript',
    tags: ['Node.js', 'Monitoring', 'API', 'DevOps'],
    lines: 120,
    category: 'API',
    code: `const axios = require('axios');\nconst { sendAlert } = require('./notifier');\n\nconst endpoints = [\n  { url: 'https://api.example.com/health', timeout: 5000 },\n  { url: 'https://api.example.com/status', timeout: 3000 },\n];\n\nasync function checkEndpoint(endpoint) {\n  const start = Date.now();\n  try {\n    const res = await axios.get(endpoint.url, { timeout: endpoint.timeout });\n    const latency = Date.now() - start;\n    return { url: endpoint.url, status: res.status, latency, up: true };\n  } catch (err) {\n    return { url: endpoint.url, up: false, error: err.message };\n  }\n}\n\nasync function monitor() {\n  const results = await Promise.all(endpoints.map(checkEndpoint));\n  const failures = results.filter(r => !r.up);\n  if (failures.length > 0) {\n    await sendAlert('Down: ' + failures.map(f => f.url).join(', '));\n  }\n  return results;\n}`,
  },
  {
    title: 'REST API Rate Limiter Middleware',
    description: 'Express.js rate limiting middleware with sliding window algorithm, IP-based and user-based limiting, and configurable thresholds per route. Includes Redis support for distributed rate limiting.',
    language: 'JavaScript',
    tags: ['Node.js', 'API', 'Rate Limit', 'Middleware'],
    lines: 65,
    category: 'API',
    code: `const rateLimit = require('express-rate-limit');\n\nconst apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,\n  standardHeaders: true,\n  legacyHeaders: false,\n  message: { error: 'Too many requests, please try again later.' },\n  keyGenerator: (req) => req.user?.id || req.ip,\n});\n\nconst strictLimiter = rateLimit({\n  windowMs: 60 * 60 * 1000,\n  max: 5,\n  skipSuccessfulRequests: true,\n});\n\nmodule.exports = { apiLimiter, strictLimiter };`,
  },
  {
    title: 'API Request Logger & Analytics',
    description: 'Comprehensive API request logging middleware with response time tracking, error capture, and analytics aggregation. Exports metrics to dashboards with endpoint performance ranking.',
    language: 'TypeScript',
    tags: ['TypeScript', 'API', 'Logging', 'Analytics'],
    lines: 78,
    category: 'API',
    code: `import { Request, Response, NextFunction } from 'express';\n\ninterface RequestLog {\n  method: string;\n  path: string;\n  status: number;\n  duration: number;\n  timestamp: Date;\n  ip: string;\n  userAgent: string;\n}\n\nconst logs: RequestLog[] = [];\n\nexport function requestLogger(req: Request, res: Response, next: NextFunction) {\n  const start = Date.now();\n  res.on('finish', () => {\n    logs.push({\n      method: req.method,\n      path: req.path,\n      status: res.statusCode,\n      duration: Date.now() - start,\n      timestamp: new Date(),\n      ip: req.ip,\n      userAgent: req.get('user-agent') || '',\n    });\n  });\n  next();\n}\n\nexport function getAnalytics() {\n  return logs.reduce((acc, log) => {\n    const key = \`\${log.method} \${log.path}\`;\n    acc[key] = (acc[key] || { count: 0, avgDuration: 0, errors: 0 });\n    acc[key].count++;\n    acc[key].avgDuration = (acc[key].avgDuration * (acc[key].count - 1) + log.duration) / acc[key].count;\n    if (log.status >= 400) acc[key].errors++;\n    return acc;\n  }, {} as Record<string, any>);\n}`,
  },
  {
    title: 'GraphQL Schema Generator from REST API',
    description: 'Automatically generate GraphQL schema and resolvers from REST API endpoints. Inspects OpenAPI/Swagger specifications and creates type-safe GraphQL wrappers with caching and batching.',
    language: 'TypeScript',
    tags: ['TypeScript', 'GraphQL', 'REST', 'Schema'],
    lines: 95,
    category: 'API',
    code: `import { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';\n\ninterface RestEndpoint {\n  path: string;\n  method: string;\n  responseSchema: Record<string, string>;\n}\n\nfunction generateFieldType(type: string) {\n  const map: Record<string, any> = { string: GraphQLString, integer: GraphQLString };\n  return map[type] || GraphQLString;\n}\n\nfunction endpointToField(endpoint: RestEndpoint) {\n  const fields: Record<string, any> = {};\n  for (const [key, type] of Object.entries(endpoint.responseSchema)) {\n    fields[key] = { type: generateFieldType(type) };\n  }\n  return fields;\n}`,
  },

  // ── Monitoring & Logs (33-34) ───────────────────────────────────────────────
  {
    title: 'Server Health Dashboard Script',
    description: 'Collect and display server health metrics including CPU, memory, disk usage, network I/O, and process counts. Outputs JSON for dashboard integration with configurable alert thresholds.',
    language: 'Python',
    tags: ['Python', 'Monitoring', 'Server', 'Dashboard'],
    lines: 85,
    category: 'Monitoring',
    code: `import psutil\nimport json\nfrom datetime import datetime\n\ndef get_server_health():\n    return {\n        'timestamp': datetime.now().isoformat(),\n        'cpu_percent': psutil.cpu_percent(interval=1),\n        'memory': {\n            'total_gb': round(psutil.virtual_memory().total / 1e9, 2),\n            'used_gb': round(psutil.virtual_memory().used / 1e9, 2),\n            'percent': psutil.virtual_memory().percent,\n        },\n        'disk': {\n            'total_gb': round(psutil.disk_usage('/').total / 1e9, 2),\n            'used_gb': round(psutil.disk_usage('/').used / 1e9, 2),\n            'percent': psutil.disk_usage('/').percent,\n        },\n        'network': {\n            'bytes_sent': psutil.net_io_counters().bytes_sent,\n            'bytes_recv': psutil.net_io_counters().bytes_recv,\n        },\n        'processes': len(psutil.pids()),\n    }`,
  },
  {
    title: 'Log Parser & Error Pattern Detector',
    description: 'Parse application logs, detect error patterns, and generate structured reports. Supports multiple log formats (Apache, Nginx, JSON), frequency analysis, and automatic error categorization with severity levels.',
    language: 'Python',
    tags: ['Python', 'Logs', 'Parser', 'Analysis'],
    lines: 90,
    category: 'Monitoring',
    code: `import re\nfrom collections import Counter\nfrom datetime import datetime\nfrom pathlib import Path\n\ndef parse_log(log_path, pattern=None):\n    errors = []\n    pattern = pattern or r'\\[(?P<level>ERROR|WARN)\\].*?(?P<message>\\w+.*)'\n    for line in Path(log_path).read_text().splitlines():\n        match = re.search(pattern, line)\n        if match:\n            errors.append({'level': match.group('level'), 'message': match.group('message'), 'line': line})\n    return errors\n\ndef analyze_patterns(errors):\n    messages = [e['message'][:50] for e in errors]\n    return Counter(messages).most_common(10)`,
  },

  // ── Productivity (35-37) ────────────────────────────────────────────────────
  {
    title: 'Markdown to HTML Converter',
    description: 'Convert Markdown files to clean HTML with syntax highlighting, table of contents generation, and custom template support. Handles GitHub Flavored Markdown with math, mermaid diagrams, and code blocks.',
    language: 'JavaScript',
    tags: ['Node.js', 'Markdown', 'HTML', 'Converter'],
    lines: 68,
    category: 'Productivity',
    code: `const { marked } = require('marked');\nconst hljs = require('highlight.js');\nconst fs = require('fs');\n\nmarked.setOptions({\n  highlight: (code, lang) => {\n    if (lang && hljs.getLanguage(lang)) {\n      return hljs.highlight(code, { language: lang }).value;\n    }\n    return hljs.highlightAuto(code).value;\n  },\n  gfm: true,\n  breaks: true,\n});\n\nfunction convertMarkdown(mdPath, htmlPath, template = null) {\n  const markdown = fs.readFileSync(mdPath, 'utf-8');\n  const html = marked.parse(markdown);\n  const output = template\n    ? template.replace('{{content}}', html)\n    : html;\n  fs.writeFileSync(htmlPath, output);\n}`,
  },
  {
    title: 'Git Repository Stats Generator',
    description: 'Generate detailed Git repository statistics including commit frequency, top contributors, file change patterns, and branch activity. Outputs formatted Markdown reports suitable for team reviews.',
    language: 'Bash',
    tags: ['Bash', 'Git', 'Analytics', 'DevOps'],
    lines: 95,
    category: 'Productivity',
    code: `#!/bin/bash\n# Git Repository Stats Generator\n\nREPO_DIR=\${1:-.}\ncd "$REPO_DIR" || exit 1\n\necho "# Git Repository Statistics"\necho "- Total commits: $(git rev-list --count HEAD)"\necho "- Contributors: $(git shortlog -sn | wc -l)"\necho "- Active branches: $(git branch | wc -l)"\necho ""\n\necho "## Top Contributors"\ngit shortlog -sn | head -10\n\necho ""\necho "## Commits by Month"\ngit log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c | sort -rn`,
  },
  {
    title: 'Environment Variable Validator',
    description: 'Validate required environment variables at application startup with type checking and helpful error messages. Prevents runtime crashes from missing or invalid configuration in production deployments.',
    language: 'TypeScript',
    tags: ['TypeScript', 'Config', 'Validation', 'DevOps'],
    lines: 56,
    category: 'Productivity',
    code: `interface EnvSchema {\n  [key: string]: { required: boolean; type?: 'string' | 'number' | 'boolean'; default?: string };\n}\n\nfunction validateEnv(schema: EnvSchema): Record<string, any> {\n  const errors: string[] = [];\n  const config: Record<string, any> = {};\n  for (const [key, rules] of Object.entries(schema)) {\n    const value = process.env[key] ?? rules.default;\n    if (value === undefined) {\n      if (rules.required) errors.push('Missing required env: ' + key);\n      continue;\n    }\n    if (rules.type === 'number') {\n      config[key] = Number(value);\n      if (isNaN(config[key])) errors.push('Invalid number for ' + key);\n    } else if (rules.type === 'boolean') {\n      config[key] = value === 'true';\n    } else {\n      config[key] = value;\n    }\n  }\n  if (errors.length > 0) throw new Error(errors.join('\\n'));\n  return config;\n}`,
  },

  // ── Email & Notifications (38-39) ───────────────────────────────────────────
  {
    title: 'Email Template Generator',
    description: 'Generate responsive HTML email templates from Markdown or JSON input. Includes inline CSS for email client compatibility, dark mode support, and preview in multiple email client dimensions.',
    language: 'JavaScript',
    tags: ['Node.js', 'Email', 'HTML', 'Templates'],
    lines: 75,
    category: 'Email',
    code: `function generateEmail(template, data) {\n  const baseStyles = `\n    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; }\n    .container { max-width: 600px; margin: 0 auto; padding: 20px; }\n    .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }\n    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }\n    .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }\n  `;\n  return \`<!DOCTYPE html><html><head><style>\${baseStyles}</style></head><body>\n    <div class="container">\${template(data)}</div></body></html>\`;\n}`,
  },
  {
    title: 'Slack Notification Bot — Multi-Channel Alerts',
    description: 'Send formatted notifications to Slack channels with rich message formatting, interactive buttons, and file attachments. Supports webhook-based and API-based delivery with rate limiting and retry logic.',
    language: 'JavaScript',
    tags: ['Node.js', 'Slack', 'Notifications', 'Bot'],
    lines: 62,
    category: 'Email',
    code: `const axios = require('axios');\n\nclass SlackNotifier {\n  constructor(webhookUrl) {\n    this.webhookUrl = webhookUrl;\n  }\n\n  async send(message, { channel, emoji, color, fields } = {}) {\n    const payload = {\n      channel,\n      text: message,\n      attachments: fields ? [{\n        color: color || '#36a64f',\n        fields: fields.map(f => ({ title: f.title, value: f.value, short: f.short || false })),\n      }] : undefined,\n      icon_emoji: emoji || ':bell:',\n    };\n    await axios.post(this.webhookUrl, payload);\n  }\n\n  async alert(title, message, severity = 'info') {\n    const colors = { info: '#439FE0', warning: '#F2C744', error: '#D00000', success: '#36a64f' };\n    await this.send(title, { color: colors[severity], fields: [{ title: 'Severity', value: severity }, { title: 'Message', value: message }] });\n  }\n}\n\nmodule.exports = SlackNotifier;`,
  },

  // ── Image & Media (40-41) ───────────────────────────────────────────────────
  {
    title: 'Website Screenshot Tool',
    description: 'Capture screenshots of websites at multiple viewport sizes using Puppeteer. Supports batch processing, custom wait conditions, full-page captures, and automatic comparison of visual changes.',
    language: 'JavaScript',
    tags: ['Node.js', 'Puppeteer', 'Screenshot', 'Testing'],
    lines: 72,
    category: 'Images',
    code: `const puppeteer = require('puppeteer');\n\nconst viewports = [\n  { name: 'desktop', width: 1920, height: 1080 },\n  { name: 'tablet', width: 768, height: 1024 },\n  { name: 'mobile', width: 375, height: 812 },\n];\n\nasync function screenshot(url, outputDir) {\n  const browser = await puppeteer.launch();\n  const page = await browser.newPage();\n  for (const vp of viewports) {\n    await page.setViewport(vp);\n    await page.goto(url, { waitUntil: 'networkidle2' });\n    await page.screenshot({ path: \`\${outputDir}/\${vp.name}.png\`, fullPage: true });\n  }\n  await browser.close();\n}`,
  },
  {
    title: 'Video to GIF Converter',
    description: 'Convert video files to optimized GIFs with configurable frame rate, size, and quality. Supports trimming, cropping, and speed adjustment. Uses ffmpeg for fast processing with minimal quality loss.',
    language: 'Python',
    tags: ['Python', 'Video', 'GIF', 'FFmpeg'],
    lines: 48,
    category: 'Images',
    code: `import subprocess\nfrom pathlib import Path\n\ndef video_to_gif(video_path, output_path, fps=15, width=480, start=0, duration=None):\n    cmd = ['ffmpeg', '-y', '-i', str(video_path),\n           '-ss', str(start),\n           '-vf', f'fps={fps},scale={width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',\n           '-loop', '0']\n    if duration:\n        cmd.extend(['-t', str(duration)])\n    cmd.append(str(output_path))\n    subprocess.run(cmd, check=True)\n    return output_path`,
  },
];

function ScriptCard({ script }: { script: typeof scripts[0] }) {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const CatIcon = getCategoryIcon(script.category);

  return (
    <Card className="group hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
              <CatIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                {script.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge className={`text-[9px] border-0 ${getLangColor(script.language)}`}>
                  {script.language}
                </Badge>
                <Badge className={`text-[9px] border-0 ${getCategoryColor(script.category)}`}>
                  {script.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {script.description}
        </p>

        <div className="relative bg-zinc-950 rounded-lg p-3 mb-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-zinc-500 ml-2">{script.language} - {script.lines} lines</span>
          </div>
          <pre className={`text-[11px] text-zinc-300 font-mono leading-relaxed overflow-hidden ${expanded ? 'max-h-none' : 'max-h-28'}`}>
            <code>{script.code}</code>
          </pre>
          {!expanded && script.code.split('\n').length > 8 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent flex items-end justify-center pb-1">
              <button
                onClick={() => setExpanded(true)}
                className="text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Show more
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {script.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
          {script.tags.length > 3 && (
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
              +{script.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            className={`flex-1 gap-2 ${copied ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'} text-white`}
            size="sm"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
          {expanded && (
            <Button
              onClick={() => setExpanded(false)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Collapse
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ScriptsListContent() {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    return scripts.filter((script) => {
      const matchCat = activeCategory === 'all' || script.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        script.title.toLowerCase().includes(q) ||
        script.description.toLowerCase().includes(q) ||
        script.tags.some((t) => t.toLowerCase().includes(q)) ||
        script.category.toLowerCase().includes(q) ||
        script.language.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: scripts.length };
    scripts.forEach((script) => {
      counts[script.category] = (counts[script.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-transparent to-blue-50/50 dark:from-sky-950/30 dark:via-transparent dark:to-blue-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
              <Terminal className="h-7 w-7 text-sky-500 dark:text-sky-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Scripts & Code</h1>
              <p className="text-muted-foreground mt-1">Free code snippets & automation tools</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Access our collection of free scripts and code snippets. From Python automation and JavaScript utilities to DevOps tools and security scripts — copy and use in your projects instantly.
          </p>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <Badge variant="secondary" className="text-sm px-3 py-1">{scripts.length} Scripts</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">One-Click Copy</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Open Source</Badge>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      {/* Search & Filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search scripts by title, language, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="outline" className="text-sm shrink-0">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900/40 dark:text-sky-400 dark:border-sky-700'
                    : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
                <span className={`ml-0.5 text-xs ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-muted-foreground'}`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Scripts Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Terminal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scripts found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((script) => (
              <ScriptCard key={script.title} script={script} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 p-8">
          <h3 className="text-xl font-bold mb-2">Built something useful?</h3>
          <p className="text-sm text-muted-foreground mb-4">Share your scripts and help developers around the world save time</p>
          <Link href="/">
            <Button className="gap-2 bg-sky-600 hover:bg-sky-700 text-white">
              <Upload className="h-4 w-4" />
              Share Your Script
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
