import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read Zenvoora\'s privacy policy. Learn how we collect, use, and protect your data when you use our free file upload and sharing service.',
  openGraph: {
    title: 'Privacy Policy — Zenvoora',
    description:
      'Learn how Zenvoora handles your data, what information we collect, and how we protect your privacy.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: January 15, 2025
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            Zenvoora (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our file upload and sharing service at zenvoora.netlify.app
            (the &quot;Service&quot;). By using the Service, you agree to the collection and use of
            information in accordance with this policy.
          </p>
          <p>
            We believe in transparency. This policy is written in plain language so you
            can understand exactly what data we collect and how we use it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>We collect only the minimum information necessary to provide and improve our Service:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-foreground">IP Address:</strong> We temporarily log your IP
              address when you upload files or submit contact forms. This is used solely for rate
              limiting and abuse prevention. IP addresses are not stored permanently and are
              automatically purged after 30 days.
            </li>
            <li>
              <strong className="text-foreground">File Metadata:</strong> When you upload a file, we
              store metadata including the original filename, file size, MIME type, upload timestamp,
              and a unique file identifier. This information is necessary to serve the file to
              downloaders and manage our storage.
            </li>
            <li>
              <strong className="text-foreground">File Contents:</strong> The contents of your
              uploaded files are stored on our servers for the purpose of serving them to people you
              share the link with. We do not read, analyze, index, or otherwise process the contents
              of your files except for automated malware scanning.
            </li>
            <li>
              <strong className="text-foreground">Contact Form Data:</strong> If you contact us
              through our contact form, we collect your name, email address, and message content.
              This information is used solely to respond to your inquiry.
            </li>
            <li>
              <strong className="text-foreground">Usage Analytics:</strong> We collect anonymized
              usage data such as page views, upload counts, and download counts. This data does not
              identify individual users and is used to improve our Service.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Information We Do Not Collect</h2>
          <p>It is equally important to understand what we do not collect:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>We do not require or collect personal identification information (names, addresses, phone numbers) to use the Service.</li>
            <li>We do not require or collect email addresses for file uploads.</li>
            <li>We do not use tracking pixels, fingerprinting, or cross-site tracking technologies.</li>
            <li>We do not sell, rent, or share your personal data with third parties for marketing purposes.</li>
            <li>We do not access or read the contents of your uploaded files beyond automated security scanning.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">4. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong className="text-foreground">Service Delivery:</strong> To host and serve your uploaded files, generate shareable links, and enable downloads.</li>
            <li><strong className="text-foreground">Security:</strong> To scan uploaded files for malware, enforce rate limits, and prevent abuse of the Service.</li>
            <li><strong className="text-foreground">Communication:</strong> To respond to inquiries submitted through our contact form.</li>
            <li><strong className="text-foreground">Service Improvement:</strong> To analyze anonymized usage patterns and improve the performance and reliability of our Service.</li>
            <li><strong className="text-foreground">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes, including responding to valid DMCA takedown requests and law enforcement requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">5. Cookies and Local Storage</h2>
          <p>
            Zenvoora uses minimal cookies and local storage:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-foreground">Theme Preference:</strong> We store your light/dark
              mode preference in your browser&apos;s local storage so the site respects your choice on
              subsequent visits.
            </li>
            <li>
              <strong className="text-foreground">Analytics Cookies:</strong> We may use first-party
              analytics cookies to understand how the Service is used. These cookies do not track you
              across other websites and do not contain personally identifiable information.
            </li>
            <li>
              <strong className="text-foreground">No Third-Party Tracking Cookies:</strong> We do not
              use third-party tracking cookies from advertising networks or data brokers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">6. Third-Party Services</h2>
          <p>
            We use the following third-party services to operate Zenvoora:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-foreground">File Hosting:</strong> Uploaded files are stored on
              our cloud infrastructure provider. The provider has access to encrypted file data but does
              not have the ability to read file contents.
            </li>
            <li>
              <strong className="text-foreground">CDN:</strong> We use a content delivery network to
              ensure fast downloads worldwide. CDN providers may temporarily cache file data for
              performance purposes.
            </li>
          </ul>
          <p className="mt-3">
            We do not share your personal data with any other third parties except as required by law
            or as described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">7. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong className="text-foreground">Uploaded Files:</strong> Files are retained as long as they are being accessed. Files that have not been downloaded for 90 days may be automatically removed to manage storage capacity.</li>
            <li><strong className="text-foreground">IP Addresses:</strong> IP addresses used for rate limiting are retained for a maximum of 30 days and then automatically purged.</li>
            <li><strong className="text-foreground">Contact Messages:</strong> Messages submitted through our contact form are retained for up to 1 year for follow-up purposes, then deleted.</li>
            <li><strong className="text-foreground">Analytics Data:</strong> Anonymized analytics data is retained indefinitely as it does not identify individual users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>HTTPS encryption for all data in transit</li>
            <li>Encrypted storage for uploaded files</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls limiting who can access production systems</li>
            <li>Automated malware scanning for all uploaded files</li>
          </ul>
          <p className="mt-3">
            While we strive to protect your data, no method of transmission over the Internet or
            electronic storage is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">9. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the following rights regarding your data:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>The right to access the personal data we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to restrict or object to the processing of your data</li>
            <li>The right to data portability</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at privacy@zenvoora.com.
            We will respond to all legitimate requests within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">10. Children&apos;s Privacy</h2>
          <p>
            Zenvoora is not directed at children under the age of 13. We do not knowingly collect
            personal information from children under 13. If we become aware that we have collected
            personal data from a child under 13, we will take steps to delete that information
            promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make changes, we will update
            the &quot;Last updated&quot; date at the top of this page. We encourage you to review this
            policy periodically to stay informed about how we protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Email: privacy@zenvoora.com</li>
            <li>Contact Form: <a href="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline">zenvoora.netlify.app/contact</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
