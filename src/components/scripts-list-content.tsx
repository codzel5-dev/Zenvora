'use client';

import * as React from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight, Copy, Check, Download, FileCode, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/ad-banner';

const scripts = [
  {
    title: 'File Renamer — Batch Rename with Regex',
    description: 'Python script to batch rename files in a directory using regex patterns. Supports dry-run mode, recursive scanning, and undo functionality. Perfect for organizing photo libraries and downloaded files.',
    language: 'Python',
    tags: ['Python', 'Automation', 'Files', 'Regex'],
    lines: 85,
    code: `import os\nimport re\nimport argparse\nfrom pathlib import Path\n\ndef batch_rename(directory, pattern, replacement, dry_run=True):\n    """Batch rename files using regex pattern matching."""\n    renamed = 0\n    for filepath in Path(directory).rglob('*'):\n        if filepath.is_file():\n            new_name = re.sub(pattern, replacement, filepath.name)\n            if new_name != filepath.name:\n                new_path = filepath.parent / new_name\n                print(f"{'[DRY] ' if dry_run else ''}{filepath.name} -> {new_name}")\n                if not dry_run:\n                    filepath.rename(new_path)\n                renamed += 1\n    return renamed`,
  },
  {
    title: 'API Health Monitor with Alerts',
    description: 'Node.js script that monitors API endpoints, measures response times, and sends alerts via email or Slack when endpoints go down or respond slowly. Includes configurable thresholds and logging.',
    language: 'JavaScript',
    tags: ['Node.js', 'Monitoring', 'API', 'DevOps'],
    lines: 120,
    code: `const axios = require('axios');\nconst { sendAlert } = require('./notifier');\n\nconst endpoints = [\n  { url: 'https://api.example.com/health', timeout: 5000 },\n  { url: 'https://api.example.com/status', timeout: 3000 },\n];\n\nasync function checkEndpoint(endpoint) {\n  const start = Date.now();\n  try {\n    const res = await axios.get(endpoint.url, { timeout: endpoint.timeout });\n    const latency = Date.now() - start;\n    return { url: endpoint.url, status: res.status, latency, up: true };\n  } catch (err) {\n    return { url: endpoint.url, up: false, error: err.message };\n  }\n}\n\nasync function monitor() {\n  const results = await Promise.all(endpoints.map(checkEndpoint));\n  const failures = results.filter(r => !r.up);\n  if (failures.length > 0) {\n    await sendAlert('Down: ' + failures.map(f => f.url).join(', '));\n  }\n  return results;\n}`,
  },
  {
    title: 'Git Repository Stats Generator',
    description: 'Bash script that generates detailed statistics for a Git repository including commit frequency, top contributors, file change patterns, and branch activity. Outputs formatted Markdown report.',
    language: 'Bash',
    tags: ['Bash', 'Git', 'Analytics', 'DevOps'],
    lines: 95,
    code: `#!/bin/bash\n# Git Repository Stats Generator\n\nREPO_DIR=\${1:-.}\ncd "$REPO_DIR" || exit 1\n\necho "# Git Repository Statistics"\necho "- Total commits: $(git rev-list --count HEAD)"\necho "- Contributors: $(git shortlog -sn | wc -l)"\necho "- Active branches: $(git branch | wc -l)"\necho ""\n\necho "## Top Contributors"\ngit shortlog -sn | head -10\n\necho ""\necho "## Commits by Month"\ngit log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c | sort -rn`,
  },
  {
    title: 'JSON to CSV Converter',
    description: 'Versatile Python script to convert JSON files to CSV format with nested object flattening, custom field selection, and encoding support. Handles large files efficiently with streaming.',
    language: 'Python',
    tags: ['Python', 'JSON', 'CSV', 'Data Processing'],
    lines: 68,
    code: `import json\nimport csv\nfrom pathlib import Path\n\ndef flatten_json(data, prefix=''):\n    items = {}\n    for key, value in data.items():\n        new_key = f"{prefix}.{key}" if prefix else key\n        if isinstance(value, dict):\n            items.update(flatten_json(value, new_key))\n        elif isinstance(value, list):\n            items[new_key] = str(value)\n        else:\n            items[new_key] = value\n    return items\n\ndef json_to_csv(input_file, output_file):\n    with open(input_file, 'r') as f:\n        data = json.load(f)\n    if isinstance(data, dict):\n        data = [data]\n    flattened = [flatten_json(item) for item in data]\n    fields = list(dict.fromkeys(k for item in flattened for k in item))\n    with open(output_file, 'w', newline='') as f:\n        writer = csv.DictWriter(f, fieldnames=fields)\n        writer.writeheader()\n        writer.writerows(flattened)`,
  },
  {
    title: 'Website Screenshot Tool',
    description: 'Node.js script using Puppeteer to capture screenshots of websites at multiple viewport sizes. Supports batch processing, custom wait conditions, and full-page captures.',
    language: 'JavaScript',
    tags: ['Node.js', 'Puppeteer', 'Screenshot', 'Testing'],
    lines: 72,
    code: `const puppeteer = require('puppeteer');\n\nconst viewports = [\n  { name: 'desktop', width: 1920, height: 1080 },\n  { name: 'tablet', width: 768, height: 1024 },\n  { name: 'mobile', width: 375, height: 812 },\n];\n\nasync function screenshot(url, outputDir) {\n  const browser = await puppeteer.launch();\n  const page = await browser.newPage();\n  for (const vp of viewports) {\n    await page.setViewport(vp);\n    await page.goto(url, { waitUntil: 'networkidle2' });\n    await page.screenshot({ path: \`\${outputDir}/\${vp.name}.png\`, fullPage: true });\n  }\n  await browser.close();\n}`,
  },
  {
    title: 'Environment Variable Validator',
    description: 'TypeScript utility that validates required environment variables at application startup, checks types, and provides helpful error messages. Prevents runtime crashes from missing configuration.',
    language: 'TypeScript',
    tags: ['TypeScript', 'Config', 'Validation', 'DevOps'],
    lines: 56,
    code: `interface EnvSchema {\n  [key: string]: { required: boolean; type?: 'string' | 'number' | 'boolean'; default?: string };\n}\n\nfunction validateEnv(schema: EnvSchema): Record<string, any> {\n  const errors: string[] = [];\n  const config: Record<string, any> = {};\n  for (const [key, rules] of Object.entries(schema)) {\n    const value = process.env[key] ?? rules.default;\n    if (value === undefined) {\n      if (rules.required) errors.push('Missing required env: ' + key);\n      continue;\n    }\n    if (rules.type === 'number') {\n      config[key] = Number(value);\n      if (isNaN(config[key])) errors.push('Invalid number for ' + key);\n    } else if (rules.type === 'boolean') {\n      config[key] = value === 'true';\n    } else {\n      config[key] = value;\n    }\n  }\n  if (errors.length > 0) throw new Error(errors.join('\\n'));\n  return config;\n}`,
  },
];

function getLangColor(lang: string) {
  const map: Record<string, string> = {
    Python: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    JavaScript: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Bash: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400',
  };
  return map[lang] || 'bg-gray-100 text-gray-700';
}

function ScriptCard({ script }: { script: typeof scripts[0] }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <Card className="group hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
              <FileCode className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {script.title}
              </h3>
              <Badge className={`text-[10px] ${getLangColor(script.language)}`}>
                {script.language}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {script.description}
        </p>

        <div className="relative bg-zinc-950 rounded-lg p-3 mb-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-zinc-500 ml-2">{script.language} - {script.lines} lines</span>
          </div>
          <pre className="text-[11px] text-zinc-300 font-mono leading-relaxed overflow-hidden max-h-32">
            <code>{script.code}</code>
          </pre>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {script.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          onClick={handleCopy}
          className={`w-full gap-2 ${copied ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'} text-white`}
          size="sm"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied to Clipboard!' : 'Copy Code'}
        </Button>
      </CardContent>
    </Card>
  );
}

export function ScriptsListContent() {
  return (
    <>
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
            Access our collection of free scripts and code snippets. From Python automation and JavaScript utilities to shell scripts and TypeScript tools — copy and use in your projects instantly.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-3 py-1">{scripts.length} Scripts</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">One-Click Copy</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Open Source</Badge>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scripts.map((script) => (
            <ScriptCard key={script.title} script={script} />
          ))}
        </div>

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
