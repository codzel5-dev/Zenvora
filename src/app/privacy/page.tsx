import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Read Zenvoora's privacy policy. Learn how we collect, use, and protect your data when you use our free file upload and sharing service.",
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
        Last updated: May 12, 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            Zenvoora (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our file upload and sharing service at zenvoora.com
            (the &quot;Service&quot;). By using the Service, you agree to the collection and use of
            information in accordance with this policy.
          </p>
          <p>
            We believe in transparency. This policy is written in plain language so you
            can understand exactly what data we collect and how we use it. We encourage you
            to read this policy carefully and contact us if you have any questions.
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
              share the link with. We use AI-powered analysis to automatically generate summaries,
              tags, and categories for your files, which helps you organize and find them later.
              This analysis is performed automatically and does not involve human review of your file contents.
            </li>
            <li>
              <strong className="text-foreground">Contact Form Data:</strong> If you contact us
              through our contact form, we collect your name, email address, and message content.
              This information is used solely to respond to your inquiry.
            </li>
            <li>
              <strong className="text-foreground">Usage Analytics:</strong> We collect anonymized
              usage data such as page views, upload counts, and download counts through Google Analytics.
              This data does not identify individual users and is used to improve our Service.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Information We Do Not Collect</h2>
          <p>It is equally important to understand what we do not collect:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>We do not require or collect personal identification information (names, addresses, phone numbers) to use the core Service.</li>
            <li>We do not require or collect email addresses for file uploads.</li>
            <li>We do not use cross-site tracking technologies or fingerprinting.</li>
            <li>We do not sell, rent, or share your personal data with third parties for marketing purposes.</li>
            <li>We do not allow human access to your uploaded file contents beyond automated security scanning and AI analysis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">4. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong className="text-foreground">Service Delivery:</strong> To host and serve your uploaded files, generate shareable links, and enable downloads.</li>
            <li><strong className="text-foreground">AI Analysis:</strong> To automatically generate summaries, tags, and categories for uploaded files using artificial intelligence, enhancing file discoverability and organization.</li>
            <li><strong className="text-foreground">Security:</strong> To scan uploaded files for malware, enforce rate limits, and prevent abuse of the Service.</li>
            <li><strong className="text-foreground">Communication:</strong> To respond to inquiries submitted through our contact form.</li>
            <li><strong className="text-foreground">Service Improvement:</strong> To analyze anonymized usage patterns and improve the performance and reliability of our Service.</li>
            <li><strong className="text-foreground">Advertising:</strong> To display relevant advertisements through Google AdSense, which may use cookies and similar technologies to serve ads based on user visits.</li>
            <li><strong className="text-foreground">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes, including responding to valid DMCA takedown requests and law enforcement requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">5. Cookies and Tracking Technologies</h2>
          <p>
            Zenvoora uses cookies and similar tracking technologies for the purposes described below.
            By using our Service, you consent to the use of these technologies as described in this policy.
            You can manage your cookie preferences through our cookie consent banner or your browser settings.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Essential Cookies</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong className="text-foreground">Theme Preference:</strong> We store your light/dark
              mode preference in your browser&apos;s local storage so the site respects your choice on
              subsequent visits.
            </li>
            <li>
              <strong className="text-foreground">Session Cookies:</strong> We use essential session cookies
              to ensure the basic functionality of the Service, such as file upload and download operations.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Analytics Cookies</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong className="text-foreground">Google Analytics:</strong> We use Google Analytics to
              understand how visitors interact with our Service. Google Analytics uses cookies to collect
              information about how visitors use our site, including the number of visitors, the pages
              they visit, and the geographical location of visitors. This data is aggregated and anonymized,
              meaning it does not identify individual users. You can opt out of Google Analytics by installing
              the <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Advertising Cookies</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong className="text-foreground">Google AdSense:</strong> We use Google AdSense to display
              advertisements on our Service. Google AdSense may use cookies to serve ads based on your prior
              visits to our website or other websites. Google&apos;s use of advertising cookies enables it and
              its partners to serve ads based on your visit to our site and/or other sites on the Internet.
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized
              advertising by visiting{' '}
              <a href="https://www.aboutads.info/choices/" className="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
            </li>
            <li>
              <strong className="text-foreground">DoubleClick Cookie:</strong> Google uses the DoubleClick
              cookie on AdSense publisher websites to serve more relevant ads and to limit the number of
              times a given ad is shown to you. The DoubleClick cookie may also be used to serve ads on
              other websites.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Managing Your Cookie Preferences</h3>
          <p>
            When you first visit our website, you will be presented with a cookie consent banner that
            allows you to accept or decline non-essential cookies. You can also manage your cookie
            preferences at any time through your browser settings. Most browsers allow you to refuse
            cookies or delete existing cookies. Note that disabling cookies may affect the functionality
            of our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">6. Third-Party Services</h2>
          <p>
            We use the following third-party services to operate Zenvoora:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-foreground">Google AdSense:</strong> We display advertisements
              through Google AdSense. Google may collect and use data as described in its{' '}
              <a href="https://policies.google.com/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
              Google uses cookies to serve ads and measure advertising effectiveness. For more information,
              please visit{' '}
              <a href="https://policies.google.com/technologies/ads" className="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">How Google Uses Information from Sites or Apps Where You Use Its Services</a>.
            </li>
            <li>
              <strong className="text-foreground">Google Analytics:</strong> We use Google Analytics to
              track and analyze website traffic. Google Analytics collects data through cookies and provides
              us with aggregated reports about visitor behavior. For more information, see{' '}
              <a href="https://policies.google.com/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
            </li>
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
            <li>
              <strong className="text-foreground">CloudConvert:</strong> We use CloudConvert for file
              format conversion. When you convert a file, it is temporarily processed by CloudConvert&apos;s
              servers. CloudConvert processes files securely and does not retain file contents after
              conversion is complete.
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
            <li><strong className="text-foreground">Advertising Data:</strong> Cookies used by Google AdSense and Google Analytics are subject to Google&apos;s own data retention policies. You can manage and delete these cookies through your browser settings or through the Google Ads Settings page.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>HTTPS encryption for all data in transit (SSL/TLS)</li>
            <li>Encrypted storage for uploaded files</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls limiting who can access production systems</li>
            <li>Automated malware scanning for all uploaded files</li>
            <li>Content-aware file validation to detect disguised malicious files</li>
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
            <li>The right to withdraw consent at any time, where processing is based on consent</li>
            <li>The right to lodge a complaint with a supervisory authority</li>
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
            promptly. Parents or guardians who believe their child has provided personal information
            to us should contact us immediately at privacy@zenvoora.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">11. California Privacy Rights (CCPA)</h2>
          <p>
            If you are a California resident, you have the right under the California Consumer Privacy
            Act (CCPA) to request information about the categories of personal information we collect,
            the purposes for which we use it, and the categories of third parties with whom we share it.
            You also have the right to request deletion of your personal information and the right to
            opt out of the sale of personal information. We do not sell personal information. To exercise
            these rights, please contact us at privacy@zenvoora.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make changes, we will update
            the &quot;Last updated&quot; date at the top of this page. If we make material changes to this policy,
            we will notify you by placing a prominent notice on our website prior to the change becoming
            effective. We encourage you to review this policy periodically to stay informed about how we
            protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, our data practices, or wish to exercise
            any of your data rights, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Email: privacy@zenvoora.com</li>
            <li>Contact Form: <a href="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline">zenvoora.com/contact</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
