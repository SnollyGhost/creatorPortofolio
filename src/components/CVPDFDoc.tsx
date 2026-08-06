import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { NAFYAD_INFO, STATS, CREATOR_NAME, BUSINESS_EMAIL, SOCIAL_LINKS, WEBSITE } from '../lib/portfolio-data';

const styles = StyleSheet.create({
  page: {
    padding: 35,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    position: 'relative',
    fontSize: 9,
    color: '#1a1a1a',
  },
  header: {
    borderBottom: '1.5pt solid #581c87', // Rich violet color line
    paddingBottom: 15,
    marginBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827', // Deep slate/black
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b21a8', // Purple tint
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 3,
  },
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
    fontSize: 8.5,
    color: '#4b5563', // Soft cool gray
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 2,
  },
  contactLink: {
    color: '#2563eb', // Blue for clickable links
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitleContainer: {
    borderBottom: '0.75pt solid #e5e7eb',
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b21a8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#374151',
    textAlign: 'justify',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobCompany: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  jobPeriod: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  jobSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    color: '#4b5563',
    fontStyle: 'italic',
  },
  jobRole: {
    fontSize: 8.5,
    fontStyle: 'italic',
  },
  jobLocation: {
    fontSize: 8.5,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletSymbol: {
    width: 10,
    fontSize: 9,
    color: '#6b21a8',
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.35,
    color: '#374151',
  },
  eduContainer: {
    marginBottom: 8,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduPeriod: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#4b5563',
    fontStyle: 'italic',
  },
  skillsTable: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCategoryBox: {
    flex: 1,
    minWidth: '45%',
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 3,
    backgroundColor: '#f3e8ff',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 35,
    right: 35,
    borderTop: '0.5pt solid #e5e7eb',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    color: '#9ca3af',
  },
});

export const CVPDFDoc = () => {
  return (
    <Document title={`${CREATOR_NAME} - Professional CV`}>
      <Page size="A4" style={styles.page}>
        
        {/* Header Block */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.name}>{CREATOR_NAME}</Text>
              <Text style={styles.title}>Computer Science Graduate & Digital Growth Strategist</Text>
            </View>
          </View>
          
          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>Email: <Link src={`mailto:${BUSINESS_EMAIL}`} style={styles.contactLink}>{BUSINESS_EMAIL}</Link></Text>
            <Text style={styles.contactItem}>Portfolio: <Link src="https://nafyad.vercel.app" style={styles.contactLink}>{WEBSITE}</Link></Text>
            <Text style={styles.contactItem}>TikTok: <Link src="https://tiktok.com/@nafyad_" style={styles.contactLink}>@nafyad_</Link></Text>
            <Text style={styles.contactItem}>LinkedIn: <Link src="https://linkedin.com" style={styles.contactLink}>linkedin.com/in/nafyad-dachasa</Link></Text>
          </View>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.summaryText}>
            First-class Computer Science graduate with a 3.9 CGPA, combining a rigorous technical software engineering background with extensive, verified real-world expertise in digital ecosystem growth and premium high-retention video production. Founder of NafTech, a fast-growing digital education community reaching over 200,000+ total active followers across global communication networks. Proven track record executing strategic commercial campaigns for institutional fintech, crypto, and software brands—delivering optimized user acquisition and technical storytelling.
          </Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          <View style={styles.eduContainer}>
            <View style={styles.eduHeader}>
              <Text style={styles.eduSchool}>Adama Science and Technology University (ASTU)</Text>
              <Text style={styles.eduPeriod}>Graduated 2024</Text>
            </View>
            <Text style={styles.eduDegree}>Bachelor of Science (B.S.) in Computer Science — Cumulative GPA: 3.9 / 4.0 (First Class Honors)</Text>
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
          </View>

          {/* Experience 1 */}
          <View style={{ marginBottom: 12 }}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobCompany}>NafTech (Digital Media & Software Ecosystem)</Text>
              <Text style={styles.jobPeriod}>September 2024 — Present</Text>
            </View>
            <View style={styles.jobSubHeader}>
              <Text style={styles.jobRole}>Founder & Lead Architect</Text>
              <Text style={styles.jobLocation}>Addis Ababa, Ethiopia / Remote</Text>
            </View>
            <View style={styles.bulletList}>
              <View style={styles.bulletPointContainer}>
                <Text style={styles.bulletSymbol}>•</Text>
                <Text style={styles.bulletText}>Built an organic distribution asset from 0 to over 200,000+ combined, active tech-oriented followers within 18 months, engineering consistent high-retention software analyses.</Text>
              </View>
              <View style={styles.bulletPointContainer}>
                <Text style={styles.bulletSymbol}>•</Text>
                <Text style={styles.bulletText}>Engineered and distributed 440+ research-verified video representations covering complex emerging concepts including Artificial Intelligence (LLMs, neural structures), Cryptography, Web3 Futures, and Space Exploration.</Text>
              </View>
              <View style={styles.bulletPointContainer}>
                <Text style={styles.bulletSymbol}>•</Text>
                <Text style={styles.bulletText}>Managed end-to-end production pipelines including storyboard mapping, custom high-attention editing workflows in Adobe Premiere Pro/CapCut, and conversion channel telemetry, ensuring a continuous 95%+ audience retention metric.</Text>
              </View>
            </View>
          </View>

          {/* Experience 2 */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobCompany}>Effoy Portal (Local Services Platform)</Text>
              <Text style={styles.jobPeriod}>2023 — 2024</Text>
            </View>
            <View style={styles.jobSubHeader}>
              <Text style={styles.jobRole}>Co-Founder & Technology Lead</Text>
              <Text style={styles.jobLocation}>Ethiopia</Text>
            </View>
            <View style={styles.bulletList}>
              <View style={styles.bulletPointContainer}>
                <Text style={styles.bulletSymbol}>•</Text>
                <Text style={styles.bulletText}>Designed, tested, and deployed the directory framework and database model for a custom portal tailored to local business discovery and advertising services.</Text>
              </View>
              <View style={styles.bulletPointContainer}>
                <Text style={styles.bulletSymbol}>•</Text>
                <Text style={styles.bulletText}>Applied lean startup methodology, iterating directly based on user engagement metrics and database optimization performance inputs.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Selected Brand Alliances & Integrations */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Selected Brand Collaborations & Commercial Campaigns</Text>
          </View>
          <View style={styles.bulletList}>
            <View style={styles.bulletPointContainer}>
              <Text style={styles.bulletSymbol}>•</Text>
              <Text style={styles.bulletText}><Text style={{ fontWeight: 'bold' }}>HuluPay & Auction Ethiopia:</Text> Structured high-performing video campaigns explaining local digital payment integrations and decentralized online market dynamics, amplifying reach to more than 600K combined views.</Text>
            </View>
            <View style={styles.bulletPointContainer}>
              <Text style={styles.bulletSymbol}>•</Text>
              <Text style={styles.bulletText}><Text style={{ fontWeight: 'bold' }}>Bybit (Global Crypto Exchange):</Text> Curated localized tutorials on cryptocurrency futures, derivatives trading, and security checks, delivering risk-managed finance education to technical retail viewers.</Text>
            </View>
            <View style={styles.bulletPointContainer}>
              <Text style={styles.bulletSymbol}>•</Text>
              <Text style={styles.bulletText}><Text style={{ fontWeight: 'bold' }}>Ehud AI Talk & Ethio Tech AI:</Text> Partnered on strategic script development, technical interviews, and co-production of educational modules introducing advanced Machine Learning architectures to East African developers.</Text>
            </View>
          </View>
        </View>

        {/* Skills & Technologies */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Technical Skills & Core Expertises</Text>
          </View>
          <View style={styles.skillsTable}>
            <View style={styles.skillCategoryBox}>
              <Text style={styles.skillCategoryTitle}>Software & System Development</Text>
              <Text style={styles.badgeText}>Python, TypeScript, JavaScript, SQL, HTML5/CSS3, Git, Data Structures & Algorithms, OOP, Database Architecture, Systems Design</Text>
            </View>
            <View style={styles.skillCategoryBox}>
              <Text style={styles.skillCategoryTitle}>Growth Engineering & Video Production</Text>
              <Text style={styles.badgeText}>Adobe Premiere Pro, CapCut, Advanced Video Editing, Strategic Retention Hook Architecture, Technical Scriptwriting, SEO Core Metadata Optimization, Multi-Platform Digital Growth</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Nafyad Dachasa — Professional CV / Resume</Text>
          <Text>Generated via NafTech Digital Engine</Text>
        </View>

      </Page>
    </Document>
  );
};
