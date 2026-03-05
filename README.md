# Cyber Health Check - Security Vulnerability Scanner

A production-ready security assessment tool that performs **real-time security scanning** of domains using industry-standard tools. The system provides accurate vulnerability detection with detailed PDF reports.

## 🎯 What It Does

This application performs **genuine security scans** - not mock data. It:

- **SSL/TLS Verification**: Validates certificates, checks expiration dates, and inspects encryption standards
- **Port Scanning**: Identifies open ports and exposed services using real network scanning
- **Subdomain Discovery**: Finds active subdomains through DNS queries and network enumeration
- **Security Headers Analysis**: Verifies presence of critical security headers (HSTS, CSP, X-Frame-Options, etc.)
- **PDF Report Generation**: Creates comprehensive security assessment reports

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Frontend                         │
│              (React 19.2 + Tailwind CSS)                     │
│  - Domain input with scan type selection                     │
│  - Real-time scan results display                            │
│  - PDF report download                                       │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────▼────────────────────────────────────────┐
│               Python FastAPI Backend                         │
│  - Core API endpoints for scanning and reporting             │
│  - Async request processing                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        ▼            ▼            ▼              ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐
   │  nmap   │  │   DNS   │  │ SSL/TLS │  │   HTTP      │
   │ (Ports) │  │(Subdoms)│  │ (Certs) │  │ (Headers)   │
   └─────────┘  └─────────┘  └─────────┘  └─────────────┘
        │            │            │              │
        └────────────┼────────────┴──────────────┘
                     │
                ┌────▼────────┐
                │ ReportLab   │
                │ (PDF Gen)   │
                └─────────────┘
```

## 📊 Security Checks Explained

### SSL/TLS Certificate Check
- Validates certificate chain
- Checks expiration date
- Verifies issuer authenticity
- Inspects cipher strength

### Port Scanning
- Scans top 100 common ports
- Identifies open services
- Reports potential exposure
- Uses nmap for accuracy

### Subdomain Discovery
- DNS enumeration
- Common subdomain wordlist matching
- Active subdomain verification
- Detects dev/staging environments

### Security Headers
- **HSTS**: HTTP Strict Transport Security
- **CSP**: Content Security Policy
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing
- **X-XSS-Protection**: XSS attack mitigation
- **Referrer-Policy**: Referrer information control

## ❓ FAQ

**Q: Is this scanning mock data?**
A: No. This system performs real security scanning using actual tools (nmap, DNS queries, SSL verification, etc.).

**Q: Can I scan external websites?**
A: Only with permission. Unauthorized scanning may be illegal.

**Q: How accurate are the results?**
A: Results reflect actual security posture detected by industry-standard tools.

**Q: What about privacy?**
A: All reports are generated locally. No data is sent to external servers.

---

**Need Help?** Check SETUP.md for detailed configuration instructions.
