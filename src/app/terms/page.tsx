import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read Zenvoora\'s terms and conditions. Understand the rules for using our free file upload and sharing service, including acceptable use and DMCA policy.',
  openGraph: {
    title: 'Terms & Conditions — Zenvoora',
    description:
      'Understand the rules for using Zenvoora, including acceptable use policy, prohibited content, and DMCA procedures.',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
        Terms & Conditions
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: January 15, 2025
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Zenvoora (the &quot;Service&quot;), you accept and agree to be bound
            by these Terms and Conditions. If you do not agree to these terms, please do not use
            the Service. Your continued use of the Service constitutes acceptance of any updates
            to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
          <p>
            Zenvoora provides a free file upload and sharing service that allows users to upload
            files and share them via unique URLs. The Service is provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, either express or implied.
          </p>
          <p className="mt-3">
            Key features of the Service include:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>File upload up to 100MB per file</li>
            <li>Automatic generation of shareable download links</li>
            <li>Support for images, videos, audio, documents, and archive formats</li>
            <li>No registration required</li>
            <li>Automated malware scanning for all uploads</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Acceptable Use Policy</h2>
          <p>You agree to use Zenvoora only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Upload any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
            <li>Upload malware, viruses, trojans, worms, or any other malicious software</li>
            <li>Upload files that infringe upon the intellectual property rights, privacy rights, or any other rights of any third party</li>
            <li>Upload copyrighted content without proper authorization from the rights holder</li>
            <li>Share or distribute pirated software, movies, music, books, or other copyrighted materials</li>
            <li>Use the Service to distribute spam, phishing content, or deceptive materials</li>
            <li>Attempt to gain unauthorized access to our systems or infrastructure</li>
            <li>Use automated tools to upload files at a rate that exceeds our rate limits</li>
            <li>Upload content that promotes violence, terrorism, hate speech, or discrimination</li>
            <li>Upload content that contains personal information of others without their consent</li>
            <li>Use the Service for any purpose that violates applicable local, state, national, or international laws</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Prohibited File Types</h2>
          <p>
            For security reasons, the following file types are blocked from upload:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Executable files: .exe, .bat, .cmd, .com, .msi, .scr</li>
            <li>Script files: .sh, .php, .py, .js, .vbs, .ps1, .wsf</li>
            <li>System files: .dll, .sys, .inf, .reg</li>
            <li>Other dangerous types: .hta, .cpl, .gadget, .jar, .app</li>
            <li>Disk images: .iso, .img, .dmg</li>
            <li>Package files: .deb, .rpm, .apk</li>
          </ul>
          <p className="mt-3">
            This list may be updated at any time without prior notice as new threats are identified.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">5. User Content</h2>
          <p>
            You retain all rights to the content you upload to Zenvoora. By uploading a file, you grant
            Zenvoora a limited, non-exclusive license to store, serve, and distribute the file via the
            unique link generated for that upload.
          </p>
          <p className="mt-3">
            You are solely responsible for the content you upload. Zenvoora does not pre-screen
            uploaded content, but reserves the right to remove any content that violates these Terms
            or that we determine, in our sole discretion, to be objectionable or harmful.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">6. File Retention and Deletion</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong className="text-foreground">Retention Period:</strong> Files are stored as long as they are being actively accessed. Files that have not been downloaded for 90 consecutive days may be automatically deleted to manage storage capacity.</li>
            <li><strong className="text-foreground">No Guarantee of Persistence:</strong> Zenvoora does not guarantee that any uploaded file will be stored indefinitely. We recommend keeping important files backed up elsewhere.</li>
            <li><strong className="text-foreground">Manual Deletion:</strong> We may remove files that violate these Terms, are reported through our DMCA process, or are identified as malicious.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">7. DMCA and Copyright Notices</h2>
          <p>
            Zenvoora respects the intellectual property rights of others and expects its users to do
            the same. We will respond to notices of alleged copyright infringement that comply with
            the Digital Millennium Copyright Act (DMCA).
          </p>
          <p className="mt-3">
            If you believe that your copyrighted work has been uploaded to Zenvoora without
            authorization, please send a DMCA takedown notice to:
          </p>
          <ul className="list-none pl-6 space-y-1 mt-3">
            <li><strong className="text-foreground">Email:</strong> dmca@zenvoora.com</li>
            <li><strong className="text-foreground">Subject Line:</strong> DMCA Takedown Request</li>
          </ul>
          <p className="mt-3">Your DMCA notice must include:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>A description of the copyrighted work you claim has been infringed</li>
            <li>The URL of the allegedly infringing file on Zenvoora</li>
            <li>Your contact information (name, address, telephone number, and email)</li>
            <li>A statement that you have a good faith belief that the use is not authorized</li>
            <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are authorized to act on behalf of the copyright owner</li>
            <li>Your physical or electronic signature</li>
          </ul>
          <p className="mt-3">
            We will remove or disable access to the allegedly infringing content promptly after
            receiving a valid DMCA notice and will make a good faith attempt to notify the uploader.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Rate Limiting</h2>
          <p>
            To ensure fair usage and service stability, Zenvoora enforces rate limits:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li><strong className="text-foreground">File Uploads:</strong> Maximum 10 uploads per hour per IP address</li>
            <li><strong className="text-foreground">Contact Form:</strong> Maximum 3 submissions per hour per IP address</li>
          </ul>
          <p className="mt-3">
            These limits may be adjusted at any time without prior notice. If you need higher
            limits for legitimate purposes, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">9. Disclaimer of Warranties</h2>
          <p>
            ZENVOORA IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="mt-3">
            We do not warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from the Service will be accurate or reliable</li>
            <li>The quality of any content uploaded will meet your expectations</li>
            <li>Any errors in the Service will be corrected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZENVOORA AND ITS OPERATORS SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
            PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
            GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Your use of or inability to use the Service</li>
            <li>Any unauthorized access to or use of our servers or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from the Service</li>
            <li>Any bugs, viruses, or similar harmful code that may be transmitted through the Service</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content uploaded through the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Zenvoora and its operators from any claims,
            damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising
            out of or in connection with your use of the Service or your violation of these Terms,
            including but not limited to any content you upload.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">12. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting to the Service. Your continued use of the Service after any
            such changes constitutes your acceptance of the new Terms.
          </p>
          <p className="mt-3">
            We encourage you to review these Terms periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws,
            without regard to conflict of law provisions. Any disputes arising under these Terms
            shall be resolved through good faith negotiation, and if necessary, through binding
            arbitration.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">14. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Email: legal@zenvoora.com</li>
            <li>Contact Form: <a href="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline">zenvoora.com/contact</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
