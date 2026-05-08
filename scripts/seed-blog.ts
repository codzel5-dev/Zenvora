import { db } from '@/lib/db';

async function seed() {
  // Seed blog posts
  const posts = [
    {
      title: '5 Tips for Secure File Sharing in 2025',
      slug: '5-tips-secure-file-sharing-2025',
      excerpt: 'Learn the essential practices for sharing files safely online, from choosing the right service to protecting your sensitive data during transfers.',
      content: `Sharing files online has become an essential part of our daily workflow, whether you are collaborating with colleagues, sending documents to clients, or sharing photos with family. But with convenience comes risk — data breaches, malware, and privacy violations are real threats.

## 1. Choose a Service That Scans for Malware

Not all file sharing services are created equal. Look for platforms that automatically scan uploaded files for viruses and malware. This protects both you and the people you share files with. FileVault, for example, blocks executable file types and scans all uploads for known threats.

## 2. Be Careful with Sensitive Information

Before uploading any file, review its contents. Remove or redact personal information like social security numbers, bank details, or passwords. Even secure services can be compromised, so the less sensitive data you share, the better.

## 3. Use Unique Links for Sensitive Files

When sharing important documents, use services that generate unique, hard-to-guess URLs. Avoid services that use simple sequential IDs that could be discovered by anyone. A unique link ensures only people you share it with can access the file.

## 4. Check File Expiration Policies

Some file sharing services delete files after a certain period, while others keep them indefinitely. For sensitive files, choose a service with automatic expiration so your data is not lingering on servers longer than necessary.

## 5. Verify the Recipient

Always double-check that you are sending files to the right person or sharing links through the correct channel. A misdirected file containing confidential information can be just as damaging as a data breach.

By following these tips, you can enjoy the convenience of online file sharing while keeping your data safe and secure.`,
      published: true,
    },
    {
      title: 'How to Choose the Right File Sharing Service',
      slug: 'how-to-choose-right-file-sharing-service',
      excerpt: 'Not all file sharing platforms are the same. Here is what to look for when selecting a service for your personal or professional needs.',
      content: `With dozens of file sharing services available, choosing the right one can feel overwhelming. Some focus on speed, others on security, and still others on collaboration features. Here is a practical guide to help you make the right choice.

## File Size Limits Matter

If you regularly share large files like videos, high-resolution images, or complex datasets, pay close attention to file size limits. Many free services cap uploads at 25MB or 50MB, which is insufficient for most professional use cases. FileVault supports files up to 100MB, which covers the vast majority of use cases without requiring paid plans.

## Speed and Reliability

A file sharing service is only useful if it works quickly and consistently. Look for services that use content delivery networks (CDNs) to ensure fast uploads and downloads regardless of geographic location. Services with 99.9% uptime guarantees are preferable for professional use.

## Security Features

At minimum, your file sharing service should offer HTTPS encryption, malware scanning, and executable file blocking. For business use, consider services that offer password-protected links, expiration dates, and download tracking.

## No Registration Required

Sometimes you just need to share a file quickly without creating an account. Services like FileVault that work without registration are ideal for one-time sharing. You save time and avoid yet another password to manage.

## Privacy Policy Transparency

Read the privacy policy before uploading sensitive files. Look for services that clearly state what data they collect, how long they retain it, and whether they sell it to third parties. A good privacy policy should be written in plain language, not legalese.

The right file sharing service depends on your specific needs, but these criteria will help you narrow down the options and choose a platform you can trust.`,
      published: true,
    },
    {
      title: 'The Evolution of Online File Sharing',
      slug: 'evolution-of-online-file-sharing',
      excerpt: 'From FTP servers to cloud storage to instant sharing links, the way we share files has transformed dramatically. Here is a look at how we got here.',
      content: `File sharing has come a long way since the early days of the internet. What once required technical expertise and patience is now as simple as dragging and dropping a file. Let us look at how file sharing has evolved and what it means for users today.

## The Early Days: FTP and Email Attachments

In the 1990s, sharing files online meant using FTP (File Transfer Protocol) servers or sending email attachments. FTP required technical knowledge — you needed to know server addresses, ports, and credentials. Email attachments were simpler but limited to a few megabytes, making them impractical for anything beyond small documents.

## The Rise of Cloud Storage

Services like Dropbox and Google Drive revolutionized file sharing in the late 2000s. Suddenly, you could sync files across devices and share folders with collaborators. However, these services required accounts, installed desktop clients, and often had restrictive free tiers. They were designed for collaboration, not quick one-time sharing.

## The Sharing Links Revolution

The real breakthrough came with services that focused on instant sharing through unique links. Instead of requiring recipients to create accounts or install software, these services let anyone download a file simply by clicking a link. This removed the biggest friction point in file sharing.

## Modern File Sharing: Fast, Free, and Secure

Today's best file sharing services combine speed, security, and simplicity. Features like drag-and-drop uploads, automatic malware scanning, and no-registration-required policies make sharing files easier than ever. Services like FileVault represent this new generation — built for the way people actually share files, not the way engineers think they should.

## What is Next?

The future of file sharing will likely focus on even faster transfers, better security through end-to-end encryption, and smarter content detection. As internet speeds continue to increase globally, the file size limits that seem generous today will seem quaint tomorrow. One thing is certain: the trend toward simpler, faster, and more secure file sharing is here to stay.`,
      published: true,
    },
    {
      title: 'Understanding File Types: What You Can and Cannot Share',
      slug: 'understanding-file-types-what-you-can-share',
      excerpt: 'Not all file types are created equal when it comes to online sharing. Learn which formats work best and why some file types are blocked for security.',
      content: `When you upload a file to a sharing service, you might encounter restrictions on certain file types. This is not arbitrary — it is about keeping everyone safe. Understanding why some files are blocked and which formats work best will help you share more effectively.

## Why Are Some File Types Blocked?

Executable files — programs that run code on your computer — are the primary targets of file type restrictions. This includes .exe files on Windows, .sh scripts on Linux, and .php files on web servers. These file types can contain malicious code that installs malware, steals data, or damages your system.

File sharing services block these types because even well-intentioned users might inadvertently upload infected files. A single compromised .exe file could infect hundreds of downloaders.

## Image Formats

Most image formats are universally supported and safe to share:
- JPEG (.jpg, .jpeg): Best for photographs and complex images
- PNG (.png): Best for screenshots, logos, and images with transparency
- GIF (.gif): Best for simple animations
- WebP (.webp): Modern format with excellent compression
- SVG (.svg): Vector format ideal for icons and illustrations

## Document Formats

Documents are among the most commonly shared file types:
- PDF (.pdf): Universal format that preserves formatting across devices
- DOCX (.docx): Microsoft Word format, widely used in business
- TXT (.txt): Plain text, lightweight and universally compatible
- XLSX (.xlsx): Excel spreadsheets for data and calculations
- PPTX (.pptx): PowerPoint presentations

## Archive Formats

Archives are useful for bundling multiple files:
- ZIP (.zip): Most widely supported archive format
- RAR (.rar): Popular format with better compression than ZIP
- 7Z (.7z): Open format with the best compression ratio
- TAR (.tar): Common on Linux systems, often combined with gzip

## What to Do If Your File Type Is Blocked

If you need to share a blocked file type, consider these alternatives:
- Zip the file — archives of blocked files are sometimes allowed
- Upload to a specialized service designed for that file type
- Share through a different channel like a code repository for scripts

Understanding file types helps you choose the right format for sharing and ensures your files are accessible to everyone you share them with.`,
      published: true,
    },
  ];

  for (const post of posts) {
    const existing = await db.blogPost.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await db.blogPost.create({ data: post });
      console.log(`Created: ${post.title}`);
    } else {
      console.log(`Already exists: ${post.title}`);
    }
  }

  console.log('Seed complete!');
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
