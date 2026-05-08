import { db } from '@/lib/db';

async function seed() {
  const posts = [
    {
      title: 'How AI Is Transforming Cloud Storage and File Management in 2025',
      slug: 'ai-transforming-cloud-storage-file-management-2025',
      excerpt: 'Artificial intelligence is reshaping how we store, organize, and interact with files online. Discover how AI-powered features like automatic summarization, smart tagging, and content analysis are revolutionizing cloud storage platforms.',
      content: `The intersection of artificial intelligence and cloud storage is creating a paradigm shift in how individuals and businesses manage their digital assets. What was once a simple matter of uploading and downloading files has evolved into an intelligent ecosystem where AI understands your content, organizes it automatically, and provides insights that were previously impossible without manual effort. In this comprehensive guide, we explore the key ways AI is transforming cloud storage and what it means for everyday users and professionals alike.

## The Rise of Intelligent File Management

Traditional cloud storage platforms treated files as opaque objects — containers of data with a name, size, and type. Users had to manually organize their files into folders, add tags, and write descriptions if they wanted to find them later. This approach worked adequately when people had dozens or even hundreds of files, but as digital content exploded in volume, the limitations became painfully clear. People now have thousands of files spread across multiple services, and finding a specific document or image can feel like searching for a needle in a digital haystack.

AI changes this equation fundamentally. Modern cloud platforms can now analyze the content of uploaded files in real time, extract meaningful metadata, generate descriptions, and even suggest organizational structures. For example, when you upload a PDF report, AI can automatically generate a summary, extract key topics, identify mentioned entities like people and organizations, and tag the document accordingly. This transforms passive file storage into active, searchable knowledge management.

## Automatic Content Summarization

One of the most impactful AI features in modern cloud storage is automatic content summarization. Instead of opening every document to understand its contents, AI generates concise summaries that appear alongside the file listing. This is particularly valuable for professionals who receive dozens of reports, proposals, and research papers daily. A three-sentence summary can tell you whether a 40-page report warrants a full read, saving hours of skimming and scanning each week.

The technology behind this capability relies on large language models trained on vast corpora of text. These models understand document structure, identify key arguments, and produce coherent summaries that capture the essential information. Zenvoora integrates this technology directly into the file management workflow, generating summaries for PDFs, documents, and text files automatically upon upload, so users always have a quick reference without any extra steps.

## Smart Tagging and Categorization

Manual tagging is tedious and inconsistent. Different people use different terms for the same concept, and even the same person might tag similar files differently on different days. AI eliminates this inconsistency by applying standardized, relevant tags based on actual file content rather than user judgment. When you upload a financial spreadsheet, AI recognizes the content and applies tags like "finance," "spreadsheet," "budget," and "quarterly report" automatically.

This automated tagging creates a consistent taxonomy across your entire file library, making search dramatically more effective. Instead of remembering the exact filename or folder location, you can search by concept and find everything related to a topic regardless of how the files were originally named or organized. The result is a file management experience that feels less like a digital filing cabinet and more like having a knowledgeable assistant who understands every document in your collection.

## Image and Video Understanding

AI capabilities extend far beyond text documents. Computer vision models can now analyze images and videos, generating descriptions, identifying objects and people, detecting text within images through OCR, and even assessing image quality and composition. For creative professionals who manage large image libraries, this means every photo gets an automatic description and relevant tags without manual cataloging.

Video analysis takes this further by generating frame-level descriptions, identifying scene changes, and creating thumbnail suggestions. Rather than scrubbing through a 10-minute video to find a specific moment, AI-generated timestamps and descriptions let you jump directly to the relevant section. These capabilities are transforming cloud storage from a simple hosting service into an intelligent media management platform that understands your content at a deep level.

## The Future: Predictive and Proactive Storage

Looking ahead, AI will make cloud storage predictive rather than reactive. Platforms will anticipate your needs based on patterns in your workflow, suggesting relevant files before you search for them, automatically organizing new uploads into existing projects, and proactively identifying duplicate or outdated content. Some platforms are already experimenting with features that recommend file conversions based on how you typically use certain file types, or that alert you when a shared document has been updated by a collaborator.

The transformation of cloud storage by AI is not a distant future — it is happening right now. Platforms like Zenvoora are at the forefront of this revolution, integrating AI capabilities that make file management smarter, faster, and more intuitive than ever before. As these technologies continue to evolve, the gap between traditional file hosting and intelligent file platforms will only widen, making AI-powered features not just a luxury but an essential component of modern digital workflows.`,
      published: true,
    },
    {
      title: 'The Complete Guide to File Preview Technology: View Any File Without Downloading',
      slug: 'complete-guide-file-preview-technology',
      excerpt: 'Learn how modern file preview technology lets you view PDFs, images, videos, audio files, and code directly in your browser without downloading anything. Discover the benefits of instant file previews for productivity and collaboration.',
      content: `Downloading a file just to see what it contains is one of the most frustrating inefficiencies in modern digital workflows. You click a link, wait for a download to complete, open the file in a desktop application, and then realize it is not the document you were looking for. File preview technology eliminates this entire cycle by rendering files directly in your browser, giving you instant access to content without any downloads. This guide covers everything you need to know about how file preview works and why it matters.

## What Is File Preview Technology?

File preview technology refers to the ability of a web application to render and display file contents directly within the browser environment, without requiring the user to download the file first. This is accomplished through a combination of browser-native capabilities, JavaScript libraries, and server-side rendering techniques that transform various file formats into web-compatible displays. Modern preview systems support a wide range of file types including PDFs, images, videos, audio files, text documents, code files with syntax highlighting, and even complex formats like spreadsheets and presentations.

The importance of file preview extends beyond mere convenience. In professional environments where people share dozens of files daily, the ability to quickly scan through files without downloading each one can save significant time. Studies have shown that knowledge workers spend an average of 20 percent of their workweek searching for and managing information. File preview technology directly addresses this by reducing the friction between finding a file and understanding its contents.

## PDF Preview: The Most Requested Feature

PDF remains the most widely used document format for professional communication, and for good reason. It preserves formatting across devices, supports rich content including images and tables, and is universally compatible. However, PDFs can also be large and cumbersome, especially when you just need to check a single page or verify that you have the right document.

Modern PDF preview technology uses the PDF.js library, an open-source project maintained by Mozilla, to render PDF documents directly in the browser. This means you can scroll through pages, zoom in on details, and search within the document without any plugins or downloads. Zenvoora implements this technology to provide instant PDF previews on every uploaded file page, so you can verify document contents before downloading or sharing the link with others.

## Image Preview with Metadata

Image preview is deceptively complex. A good preview system does not just display the image — it also provides useful metadata such as dimensions, file size, format, color space, and in some cases, EXIF data like camera model and geolocation. This contextual information is invaluable for photographers, designers, and anyone who works with images professionally.

Zenvoora renders image previews with responsive sizing that adapts to the viewer's screen, ensuring that both high-resolution photographs and simple icons display optimally. The preview interface also shows file metadata alongside the image, giving you the information you need to decide whether the image meets your requirements without opening it in a separate application.

## Video and Audio Playback

Media file preview has come a long way from the days when every video required a proprietary plugin. Today, HTML5 video and audio elements provide native browser playback for common formats including MP4, WebM, and MP3. A well-implemented media preview includes playback controls, volume adjustment, fullscreen toggle, and in the case of video, thumbnail generation for quick navigation.

For content creators and media professionals, the ability to preview audio and video files directly in the browser streamlines the review process significantly. Instead of downloading large video files to check a short clip, you can stream the preview and confirm the content in seconds. This is especially valuable when bandwidth is limited or when working with files stored on remote servers.

## Code Preview with Syntax Highlighting

Developers frequently share code files, configuration scripts, and data formats like JSON and YAML. A plain text preview is technically sufficient, but syntax highlighting transforms the reading experience by applying color coding to keywords, strings, comments, and other language-specific elements. This makes code significantly easier to read and understand at a glance.

Zenvoora supports syntax highlighting for dozens of programming languages and markup formats. When you upload a code file, the preview automatically detects the language based on the file extension and applies appropriate highlighting. This feature is invaluable for code review, documentation sharing, and any workflow that involves sharing scripts or configuration files with colleagues.

## The Productivity Impact

The cumulative effect of instant file previews across all these file types is a dramatic improvement in workflow efficiency. Instead of the traditional download-open-review-delete cycle, you can browse through shared files as naturally as scrolling through a website. This reduces cognitive load, saves time, and makes collaboration more fluid. As file preview technology continues to advance with AI-powered features like automatic summarization and content analysis, the gap between browsing files on your local machine and browsing them online will continue to narrow until it disappears entirely.`,
      published: true,
    },
    {
      title: 'AI-Powered File Analysis: How Smart Platforms Understand Your Content',
      slug: 'ai-powered-file-analysis-smart-platforms',
      excerpt: 'Explore how AI file analysis works behind the scenes, from PDF summarization and image recognition to keyword extraction and video understanding. Learn what makes a file platform truly intelligent.',
      content: `Every day, millions of files are uploaded to cloud storage platforms around the world. Traditionally, these platforms treated files as generic data objects — they stored them reliably and served them on demand, but had no understanding of what the files actually contained. The emergence of AI-powered file analysis changes this fundamentally, transforming passive storage services into intelligent platforms that understand your content at a deep level. This article explores the technology behind AI file analysis and its practical applications for everyday users.

## How AI Reads and Understands Documents

Document analysis is perhaps the most mature application of AI in file management. Modern language models can process text from PDFs, Word documents, plain text files, and other document formats to extract meaning, identify key themes, and generate useful summaries. The process begins with text extraction, where the AI parses the document structure to separate headers, paragraphs, tables, and captions. It then applies natural language processing techniques to understand the semantic content.

For summarization, the AI identifies the most important sentences and concepts, then generates a condensed version that captures the essential information. This is not simply extracting existing sentences — the model produces new text that synthesizes the document's key points. The quality of AI summaries has improved dramatically in recent years, reaching a level where they are genuinely useful for quickly understanding document contents without reading the full text. Zenvoora applies this technology to every uploaded document, generating summaries that appear on the file's public page and in search results.

## Image Recognition and Description

Computer vision has made extraordinary progress in the past few years, and its applications in file management are profound. When you upload an image, AI can now generate a detailed textual description of what the image contains. This goes far beyond simple object detection — modern models understand scenes, relationships between objects, activities, and even emotional content.

For example, an uploaded photo might receive a description like "A group of five people sitting around a conference table in a modern office, reviewing documents on a laptop screen." This level of understanding enables powerful search capabilities. Instead of relying on filenames, users can search for images by describing what they contain. The AI also identifies dominant colors, detects text within images through OCR, and can even assess image quality factors like blur, exposure, and composition.

## Keyword Extraction and Smart Tagging

Keyword extraction is the process of identifying the most significant terms and phrases within a document. Unlike simple frequency analysis, modern AI approaches understand semantic importance — a keyword might appear only once but be central to the document's topic. AI models evaluate the context in which words appear, their relationship to other terms, and their significance within the broader subject domain.

When applied to file management, keyword extraction enables automatic tagging that is both comprehensive and consistent. Every uploaded file receives a set of relevant tags based on its actual content, creating a searchable index that works across your entire file library. This eliminates the inconsistency of manual tagging and ensures that files are always discoverable through relevant search terms. The combination of AI-generated summaries, descriptions, and keywords creates a rich metadata layer that transforms how you interact with your stored files.

## Video Content Analysis

Video presents unique challenges for AI analysis because it combines visual, auditory, and temporal information. Modern video analysis systems approach this by processing multiple streams simultaneously. Frame-by-frame analysis identifies visual content, scene changes, and on-screen text. Audio processing transcribes spoken content and identifies music or sound effects. Temporal analysis understands the sequence and duration of different segments.

The practical output of video analysis includes generated descriptions, timestamp-based summaries, spoken content transcripts, and suggested thumbnail images. For educational content, AI can identify key teaching moments and create chapter markers. For business presentations, it can extract slide content and talking points. Zenvoora leverages these capabilities to make uploaded video files immediately understandable without requiring viewers to watch the entire recording.

## The Privacy and Security Dimension

AI file analysis raises important questions about privacy and data handling. Responsible platforms process file content securely, ensuring that analysis results are only shared with authorized users and that raw content is not used to train models on customer data. Zenvoora processes files for analysis in real time without storing intermediate data, and AI-generated metadata is associated with the file record but never shared beyond the file's access permissions.

As AI file analysis becomes standard in cloud storage, the platforms that implement it responsibly — with clear privacy policies, transparent data handling, and robust security — will earn user trust and set the standard for the industry. The future of file management is intelligent, and that intelligence must be paired with equally strong commitments to user privacy and data protection.`,
      published: true,
    },
    {
      title: 'From Upload to Share: Building a Complete Digital Workflow for Teams',
      slug: 'upload-to-share-digital-workflow-teams',
      excerpt: 'Discover how modern file platforms streamline the entire content lifecycle from upload and preview through analysis and sharing. Learn the best practices for building efficient team workflows around cloud file management.',
      content: `The way teams share and collaborate on files has undergone a dramatic transformation. What once involved email attachments, USB drives, and shared network folders has evolved into sophisticated cloud-based workflows that connect team members across time zones and organizations. However, many teams still operate with fragmented toolchains that create friction at every step of the content lifecycle. This guide presents a complete framework for building an efficient digital workflow centered around a modern file platform.

## Understanding the Content Lifecycle

Every piece of digital content follows a lifecycle that includes creation, upload, organization, review, sharing, and eventually archiving or deletion. At each stage, different team members need different levels of access and different tools to interact with the content. A photographer needs to upload and preview images. A project manager needs to review files and approve them for sharing. A client needs to access shared files without needing accounts or special software.

The key insight is that a single platform that handles the entire lifecycle — from the moment a file is uploaded to the moment it is shared — eliminates the gaps and friction points that slow teams down. Instead of uploading to one service, organizing in another, sharing through a third, and tracking feedback in a fourth, teams can work within a unified system where each step flows naturally into the next.

## The Upload Experience: Speed and Reliability

The upload experience sets the tone for the entire workflow. If uploading is slow, unreliable, or complicated, users will seek alternatives and the workflow breaks down before it begins. Modern upload interfaces should support drag-and-drop, handle large files without timing out, provide progress indicators, and confirm successful uploads immediately.

Zenvoora prioritizes upload simplicity with a drag-and-drop interface that accepts files up to 100 megabytes without requiring registration. This zero-friction approach means team members can share files immediately without creating accounts, remembering passwords, or navigating complex permission systems. The uploaded file immediately gets a shareable link, and AI-powered analysis begins processing the content for previews, summaries, and tags automatically.

## Preview and Review: Seeing Is Understanding

Once a file is uploaded, the next critical step is review. Team members need to verify that the right file was uploaded, check its contents, and confirm it meets quality standards. Without file preview, this requires downloading every file to a local machine, which is time-consuming and impractical when dealing with dozens of files.

A preview-capable platform transforms the review process by rendering files directly in the browser. PDFs display with full pagination, images show with metadata, videos play with streaming, and code files render with syntax highlighting. Reviewers can assess content instantly without downloading, dramatically speeding up the review cycle. In team environments where multiple people review the same files, the time savings multiply across every reviewer.

## AI Analysis: Automatic Intelligence

The addition of AI analysis to the workflow adds a layer of automatic intelligence that benefits every subsequent step. When a file is uploaded, AI generates a summary, extracts keywords, and creates tags automatically. This metadata powers search, enables smart organization, and provides context for anyone who accesses the file later.

For teams that handle large volumes of documents, AI analysis is transformative. Instead of manually reading every document to categorize it, team members can rely on AI-generated summaries to triage incoming content quickly. Keywords and tags enable powerful search across the entire file library, making it easy to find related content and maintain organizational consistency without manual effort.

## Sharing: Secure and Trackable Links

The final step in the content lifecycle is sharing, and this is where many platforms fall short. Email attachments have size limits and create version confusion. Shared folders require account creation and permission management. Neither approach scales well for teams that share files with external partners, clients, or the public.

Link-based sharing solves these problems elegantly. Each file gets a unique URL that can be shared through any channel — email, chat, social media, or embedded in documents. Recipients access the file directly in their browser without accounts or downloads. The file page includes previews, AI-generated summaries, and download options, providing a complete experience from a single link. For sensitive content, features like expiration dates and download limits add security without sacrificing convenience.

## Putting It All Together

The most effective team workflows are those that minimize friction at every step. By choosing a platform that handles the entire content lifecycle — from instant upload and AI-powered analysis to browser-based preview and link-based sharing — teams can build workflows that feel natural rather than forced. The result is faster collaboration, better organization, and a significant reduction in the time spent managing files instead of working with them.`,
      published: true,
    },
    {
      title: 'Why Public File Pages Are the Future of Content Sharing and SEO',
      slug: 'public-file-pages-future-content-sharing-seo',
      excerpt: 'Discover how SEO-indexable public file pages are transforming cloud storage platforms into content distribution engines. Learn why indexed file pages drive organic traffic and how they benefit both platforms and users.',
      content: `The traditional model of file sharing treats shared files as private exchanges between sender and recipient. You upload a file, generate a link, and send it to specific people. The file exists in a digital vacuum — invisible to search engines, inaccessible to anyone without the link, and contributing nothing to the broader web ecosystem. Public file pages represent a fundamentally different approach, one that transforms file sharing from a private transaction into a public content distribution strategy with significant SEO benefits.

## What Are Public File Pages?

A public file page is a dedicated web page for each uploaded file that includes the file preview, AI-generated description, metadata like file type and size, relevant tags, and download options. Unlike simple download links that serve files directly, public file pages provide context, content, and discoverability. They are designed to be indexed by search engines, shared on social media with rich previews, and discovered by people searching for specific types of content.

Consider the difference between sharing a PDF report as a raw download link versus sharing it through a public file page. The raw link gives recipients a file to download with no context. The public page shows the file preview, provides an AI-generated summary explaining what the report covers, displays relevant tags like "market analysis" or "Q2 earnings," and offers related files the viewer might also find useful. The page itself becomes a valuable content resource rather than just a download mechanism.

## SEO Benefits: Turning Files into Traffic

Search engines index text content, not binary files. When you share a PDF through a simple download link, search engines see a URL pointing to a file but have no understanding of what the file contains. Public file pages change this by surrounding the file with textual content that search engines can index — descriptions, summaries, tags, and metadata that provide rich semantic signals about the file's content.

This creates a powerful flywheel effect. Users upload files on various topics, public pages with detailed descriptions and tags are generated automatically, search engines index these pages, people searching for related topics discover the files, and the resulting traffic benefits both the platform and the file uploaders. Over time, a well-structured public file system can generate significant organic traffic from search engines, transforming a file hosting service into a content discovery platform.

## Rich Social Media Sharing

When you share a link on social media platforms like Twitter, Facebook, or LinkedIn, the platform generates a preview card based on Open Graph metadata. Simple file download links typically produce unappealing previews — a generic file icon with no descriptive text. Public file pages, on the other hand, can generate rich preview cards with the file title, description, thumbnail image, and relevant tags.

This dramatically improves click-through rates when files are shared on social media. A shared link that shows an informative preview card with a compelling description is far more likely to attract clicks than a bare URL with a file icon. For content creators, marketers, and businesses sharing files publicly, this represents a significant improvement in how their shared content performs across social channels.

## Related Content and Discovery

Public file pages also enable content discovery through related file recommendations. When AI tags and categorizes every uploaded file, the platform can surface related files on each public page. Someone viewing a market research report might discover related analysis documents, data sets, or presentation templates uploaded by other users. This creates a browsing experience similar to how YouTube recommends related videos or how Amazon suggests related products.

For users, this means their uploaded files gain additional visibility through association with popular related content. For the platform, it increases page views and engagement by encouraging visitors to explore beyond their initial destination. The AI-powered tagging system ensures that related content recommendations are genuinely relevant rather than random, creating a discovery experience that adds value for every visitor.

## The SEO-Compliant Approach

It is important to note that effective public file pages must be built with SEO best practices in mind. This includes proper heading structure, semantic HTML, descriptive meta tags, canonical URLs, and fast page load times. Pages should also include structured data markup that helps search engines understand the content type and context. Zenvoora implements all of these practices to ensure that public file pages are not just indexable but optimized for maximum search visibility.

As search engines continue to prioritize content quality and user experience, platforms that invest in well-structured, informative public file pages will reap the SEO benefits for years to come. The future of file sharing is not just about storage and transfer — it is about discovery, context, and the intelligent presentation of content to both humans and search engines alike.`,
      published: true,
    },
    {
      title: 'Smart File Sharing for Remote Workers: Tools and Strategies That Actually Work',
      slug: 'smart-file-sharing-remote-workers-tools-strategies',
      excerpt: 'Remote work demands a different approach to file sharing. Learn the tools, strategies, and AI-powered solutions that make distributed team collaboration seamless and productive, regardless of location or time zone.',
      content: `The shift to remote work has fundamentally changed how teams share and collaborate on files. In a traditional office, you could walk over to a colleague's desk with a USB drive or quickly share a file over the local network. Remote teams do not have that luxury — every file exchange happens through digital channels, and the tools you choose determine whether collaboration flows smoothly or becomes a constant source of frustration. This guide provides practical strategies for smart file sharing in remote work environments, with a focus on tools and techniques that actually deliver results.

## The Remote Work File Sharing Challenge

Remote teams face several unique challenges when it comes to file sharing. Time zone differences mean that team members may not be online simultaneously, creating delays in file delivery and feedback. Bandwidth limitations in home offices make large file transfers slow and unreliable. The proliferation of devices — work laptops, personal tablets, and smartphones — creates compatibility issues when files need to be accessible across different operating systems and screen sizes.

Perhaps most importantly, remote work removes the casual file sharing that happens naturally in an office. When you can not simply hand someone a document or point at a shared screen, the formal file sharing process becomes more critical. Every interaction requires explicit sharing actions, which means the sharing workflow must be as frictionless as possible. If sharing a file requires five clicks and an account creation, remote workers will find workarounds that bypass the official system, creating security risks and version control problems.

## Choosing the Right Platform: Key Criteria

When evaluating file sharing platforms for remote work, several criteria rise above the rest. First, zero-friction sharing — the ability to upload and share a file without requiring recipients to create accounts, install software, or navigate complex permission systems. Remote teams share files with clients, contractors, and partners outside the organization, and every account requirement is a barrier to collaboration.

Second, file preview capability — the ability to view files directly in the browser without downloading. When team members are working from locations with varying bandwidth, downloading a 50-megabyte presentation just to check one slide is a significant waste of time and data. Browser-based previews eliminate this problem entirely, allowing instant access to file contents regardless of file size or connection speed.

Third, AI-powered organization — automatic tagging, summarization, and search that help team members find files without remembering exact filenames or folder locations. In a remote environment where one person might organize files differently from another, consistent AI-generated metadata ensures that everyone can find what they need regardless of how files were originally uploaded.

## The Preview-First Workflow

In remote work, the preview-first workflow replaces the traditional download-first approach. Instead of downloading files to review them, team members browse file previews directly in the browser. This is faster, uses less bandwidth, and works consistently across devices. When a colleague shares a design file, you preview it in your browser, leave feedback in the associated discussion, and only download the file if you need to work with it locally.

Zenvoora supports this workflow by providing instant previews for all common file types. PDFs render with full pagination, images display with metadata, videos stream with playback controls, and code files show with syntax highlighting. The AI-generated summary on each file page provides additional context, helping remote team members quickly understand file contents without needing to ask the uploader for clarification.

## AI Features That Matter for Remote Teams

AI-powered file analysis is particularly valuable for remote teams because it compensates for the lack of in-person communication. When you can not ask a colleague what a document covers, an AI-generated summary provides the answer instantly. When you can not browse a shared folder and quickly scan file names, AI-generated tags and search make finding specific files efficient regardless of how they are organized.

Keyword extraction helps remote teams maintain consistent terminology across documents and projects. When AI tags every file with relevant keywords, team members across different time zones and cultural backgrounds can find files using the same search terms. This eliminates the confusion that arises when one person describes a project as "Q3 revenue analysis" while another calls the same document "third quarter financial review."

## Security Considerations for Distributed Teams

Remote work introduces security challenges that on-premises teams do not face. Files may be accessed from home networks with varying security levels, shared through multiple channels, and stored on personal devices. A good file sharing platform addresses these concerns with features like rate-limited downloads, automatic file expiration, malware scanning, and secure HTTPS connections for all file transfers.

The key principle is security without complexity. If security measures make file sharing cumbersome, remote workers will bypass them. The best platforms build security into the infrastructure — automatic malware scanning, encrypted transfers, and secure storage — without requiring users to take extra steps or remember complex security procedures. This zero-trust approach to file security protects distributed teams without adding friction to their daily workflows.

## Building Your Remote File Sharing Strategy

Start by auditing your current file sharing workflow. Identify the pain points — the files that take too long to share, the recipients who can not open files, the searches that return nothing useful. Then implement a platform that addresses these specific issues while supporting the preview-first, AI-powered approach described in this guide. The result will be a remote file sharing experience that feels as natural and efficient as sharing files across a desk.`,
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

  console.log('Seed complete! 6 new articles added.');
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
