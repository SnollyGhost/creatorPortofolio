import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link, Svg, G, Path, Polygon } from '@react-pdf/renderer';
import { NAFYAD_INFO, STATS, CREATOR_NAME, BUSINESS_EMAIL, SOCIAL_LINKS, WEBSITE } from '../lib/portfolio-data';

export interface PDFImages {
  creatorImg?: string;
  bybit?: string;
  ehudAi?: string;
  huluPay?: string;
  hawi?: string;
  auctionEthiopia?: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#050505',
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 155,
    backgroundColor: '#09090f',
    borderRight: '0.75pt solid #1c1c28',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    border: '1.5pt solid #a855f7',
    objectFit: 'cover',
  },
  mainContent: {
    marginLeft: 155,
    padding: 25,
    flex: 1,
    height: '100%',
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  sidebarSubtitle: {
    fontSize: 8,
    color: '#a855f7',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 25,
    marginTop: 4,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  sidebarLink: {
    fontSize: 8,
    color: '#d4d4d8',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  sidebarContactBox: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderTop: '0.5pt solid #1c1c28',
    paddingTop: 12,
  },
  header: {
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  mainSubtitle: {
    fontSize: 9,
    color: '#a1a1aa',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  accentLine: {
    width: 40,
    height: 2,
    backgroundColor: '#9333ea',
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a855f7',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 12,
  },
  paragraph: {
    fontSize: 7.5,
    lineHeight: 1.4,
    color: '#e4e4e7',
    marginBottom: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#09090f',
    padding: 10,
    border: '0.5pt solid #1c1c28',
    borderRadius: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a855f7',
  },
  statLabel: {
    fontSize: 6.5,
    color: '#71717a',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  strategyBox: {
    padding: 8,
    backgroundColor: '#09090f',
    border: '0.5pt solid #1c1c28',
    borderLeft: '2.5pt solid #a855f7',
    borderRadius: 3,
    marginBottom: 6,
  },
  strategyTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  strategyText: {
    fontSize: 7,
    color: '#a1a1aa',
    lineHeight: 1.3,
  },
  partnerList: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 5,
    marginTop: 6,
    marginBottom: 10,
  },
  partnerBadge: {
    backgroundColor: '#09090f',
    border: '0.5pt solid #1c1c28',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  partnerLogo: {
    width: 12,
    height: 12,
    borderRadius: 2,
    objectFit: 'contain',
  },
  partnerName: {
    fontSize: 6.2,
    color: '#e4e4e7',
    fontWeight: 'bold',
  },
  websiteCallout: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#09090f',
    border: '1pt dashed #a855f7',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  websiteCalloutText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  websiteLinkHighlight: {
    color: '#a855f7',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 6.5,
    color: '#52525b',
  }
});

export const MediaKitPDFDoc = ({ images }: { images?: PDFImages }) => (
  <Document title={`${CREATOR_NAME} - Creator Portfolio`}>
    <Page size="A4" style={styles.page}>
      {/* Immersive Midnight Sidebar */}
      <View style={styles.sidebar}>
        {images?.creatorImg && (
          <View style={styles.profileContainer}>
            <Image src={images.creatorImg} style={styles.profileImage} />
          </View>
        )}
        <Text style={styles.sidebarTitle}>{CREATOR_NAME}</Text>
        <Text style={styles.sidebarSubtitle}>Creator & Strategist</Text>
        
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Our Pillars</Text>
          <Text style={styles.sidebarLink}>• TechTruth: AI & Robotics</Text>
          <Text style={styles.sidebarLink}>• Cryptospace: Web3 & News</Text>
          <Text style={styles.sidebarLink}>• Spaceverse: Satellites & Space</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Milestones</Text>
          <Text style={styles.sidebarLink}>• B.S. CS (Grade: 3.9 CGPA)</Text>
          <Text style={styles.sidebarLink}>• Selected: Pilot Program 2026</Text>
          <Text style={styles.sidebarLink}>• TikTok Creative Awards</Text>
          <Text style={styles.sidebarLink}>• Effoy Portal Founder</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Presence</Text>
          <Text style={styles.sidebarLink}>TikTok: @nafyad_</Text>
          <Text style={styles.sidebarLink}>YouTube: @NafTech00</Text>
          <Text style={styles.sidebarLink}>IG: @n.a.f.y.a.d</Text>
          <Text style={styles.sidebarLink}>LinkedIn: /in/Nafyad</Text>
        </View>

        <View style={styles.sidebarContactBox}>
          <Text style={styles.sidebarSectionTitle}>Direct Line</Text>
          <Text style={styles.sidebarLink}>{BUSINESS_EMAIL}</Text>
          <Text style={{ ...styles.sidebarLink, marginTop: 4, color: '#a855f7', fontWeight: 'bold' }}>{WEBSITE}</Text>
        </View>
      </View>

      {/* Modern Main Content Column */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>CREATOR PORTFOLIO</Text>
          <Text style={styles.mainSubtitle}>Turning Complex Tech & Space Science into High-Retention Narrative</Text>
          <View style={styles.accentLine} />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.paragraph}>
            Nafyad is a highly skilled Computer Science graduate (3.9 CGPA) and digital strategist based in East Africa. By combining structural developer knowledge with high-fidelity video production, he breaks down emerging technologies—AI, blockchain, and aerospace—into viral, authority-building narratives.
          </Text>
          <Text style={styles.paragraph}>
            As the architect of NafTech, he designs comprehensive organic workflows, dynamic brand integration strategies, and targeted media campaigns that convert passive viewers into highly engaged advocates.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Global Social Impact Metrics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{STATS.totalFollowers}+</Text>
            <Text style={styles.statLabel}>SMM Audience</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{STATS.produced}+</Text>
            <Text style={styles.statLabel}>Productions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>19M+</Text>
            <Text style={styles.statLabel}>Total Impressions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>96%</Text>
            <Text style={styles.statLabel}>Retention Score</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Proven Strategic Brand Partnerships</Text>
        <Text style={styles.paragraph}>
          Nafyad has engineered custom, retention-driven campaigns and direct brand placements with leading technology and digital payment organizations:
        </Text>
        <View style={styles.partnerList}>
          <View style={styles.partnerBadge}>
            {images?.bybit && <Image src={images.bybit} style={styles.partnerLogo} />}
            <Text style={styles.partnerName}>Bybit</Text>
          </View>
          <View style={styles.partnerBadge}>
            {images?.ehudAi && <Image src={images.ehudAi} style={styles.partnerLogo} />}
            <Text style={styles.partnerName}>EhudAI</Text>
          </View>
          <View style={styles.partnerBadge}>
            <Svg viewBox="0 0 90 90" style={styles.partnerLogo}>
              <G transform="translate(0, 3)">
                <Path d="M 45,5 L 80,35 L 30,35 Z" fill="#0c4da2" opacity={0.95} />
                <Path d="M 30,35 L 48,23 L 45,5 Z" fill="#003366" opacity={0.4} />
                <Path d="M 55,35 L 90,35 L 65,78 Z" fill="#f7941d" opacity={0.95} />
                <Path d="M 65,78 L 70,51 L 55,35 Z" fill="#d9531e" opacity={0.4} />
                <Path d="M 10,25 L 35,68 L 15,78 Z" fill="#22b14c" opacity={0.95} />
                <Path d="M 15,78 L 27,46 L 10,25 Z" fill="#1b8a3c" opacity={0.5} />
                <Polygon points="45,35 55,35 50,43" fill="#8dc63f" opacity={0.9} />
              </G>
            </Svg>
            <Text style={styles.partnerName}>Auction Ethiopia</Text>
          </View>
          <View style={styles.partnerBadge}>
            {images?.huluPay && <Image src={images.huluPay} style={styles.partnerLogo} />}
            <Text style={styles.partnerName}>HuluPay</Text>
          </View>
          <View style={styles.partnerBadge}>
            {images?.hawi && <Image src={images.hawi} style={styles.partnerLogo} />}
            <Text style={styles.partnerName}>Hawi Solutions</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Engineered Content & Growth Strategy</Text>
        <View style={styles.strategyBox}>
          <Text style={styles.strategyTitle}>1. Hook-First Storytelling Architecture</Text>
          <Text style={styles.strategyText}>
            Every production is structured mathematically starting with immediate, high-retention engagement hooks, followed by systematic narrative builds, premium post-production payoff, and seamless conversion triggers.
          </Text>
        </View>

        <View style={styles.strategyBox}>
          <Text style={styles.strategyTitle}>2. High-Fidelity Multi-Platform Workflow</Text>
          <Text style={styles.strategyText}>
            Full lifecycle execution spanning from exhaustive data research to scriptwriting, filming, and advanced editing with industry-standard Adobe Premiere Pro and CapCut pipelines to deliver polished deliverables within a rapid 24-hour turnaround.
          </Text>
        </View>

        <View style={styles.strategyBox}>
          <Text style={styles.strategyTitle}>3. Analytical Audience Optimization</Text>
          <Text style={styles.strategyText}>
            Continuous testing of watch-time graphs, shares, and algorithmic retention score targets. Content is specifically optimized across YouTube long-form, YouTube shorts, and TikTok to ensure sustained organic growth.
          </Text>
        </View>

        <View style={styles.websiteCallout}>
          <Text style={styles.websiteCalloutText}>
            Check the website <Link src="https://nafyad.vercel.app" style={styles.websiteLinkHighlight}>nafyad.vercel.app</Link> for more detailed portfolio and works.
          </Text>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} {CREATOR_NAME} | Proprietary Portfolio Document</Text>
      </View>
    </Page>
  </Document>
);
