import type { InsertJudicialQuery } from "@shared/schema";

export const judicialKnowledgeBase: InsertJudicialQuery[] = [
  {
    query: "How to check case status online",
    category: "case-status",
    response: `You can check your case status through multiple official channels:

**eCourts Services Portal:**
- Visit services.ecourts.gov.in
- Search by case number, party name, or advocate details
- Available for Supreme Court, High Courts, and District Courts

**eCourts Mobile App:**
- Download from Google Play Store or Apple App Store
- Real-time case updates and notifications
- Court calendar and cause list access

**SMS Service:**
- Register your mobile number with the court
- Receive automatic case status updates
- SMS format: ECOURTS <Case Number> to 9766899766

**Court Display Boards:**
- Physical display boards at court premises
- Daily cause lists and case status updates

For detailed information, you'll need your case number in the format: Case Type/Number/Year (e.g., CRL.A/123/2024)`,
    keywords: ["case status", "ecourts", "court", "case number", "online", "mobile app", "sms"]
  },
  {
    query: "eFiling procedures and requirements",
    category: "efiling",
    response: `Electronic filing (eFiling) process for Indian courts:

**Registration Process:**
1. Visit the eFiling portal of your respective court
2. Register with valid advocate enrollment number
3. Verify email and mobile number
4. Complete profile setup

**Filing Steps:**
1. Login to eFiling portal
2. Select case type and court
3. Upload required documents (PDF format, max 10MB each)
4. Fill case details and party information
5. Pay court fees online
6. Submit filing and download acknowledgment

**Required Documents:**
- Petition/Application (properly formatted)
- Vakalatnama (for advocates)
- Supporting documents and annexures
- Affidavits (digitally signed)

**Payment Methods:**
- Net banking, debit/credit cards
- UPI payments
- Digital wallets

**Available Courts:**
- Supreme Court of India
- All High Courts
- Selected District and Subordinate Courts

Processing time: 24-48 hours for verification`,
    keywords: ["efiling", "electronic filing", "online filing", "court fees", "documents", "advocate", "registration"]
  },
  {
    query: "Judge appointments and court vacancies",
    category: "judge-appointments",
    response: `Current judicial vacancy information and appointment process:

**Current Vacancies (as per latest data):**
- Supreme Court: 2 vacancies out of 34 sanctioned posts
- High Courts: 378 working strength against 1,080 sanctioned posts
- Subordinate Courts: Approximately 5,321 vacancies

**Appointment Process:**
- **Supreme Court:** Collegium system recommendation to President
- **High Courts:** State consultation with Chief Justice and Governor
- **District Courts:** State judicial service examinations and High Court recommendations

**Selection Criteria:**
- Legal qualifications and experience requirements
- Performance in judicial service exams
- Experience in legal practice
- Age and health requirements

**Information Sources:**
- Department of Justice website
- Individual High Court websites
- Supreme Court of India website
- National Judicial Data Grid (NJDG)

**Recent Initiatives:**
- Fast-track appointment processes
- Digital infrastructure for vacancy tracking
- Enhanced coordination between Centre and States

For specific court vacancy details, visit the respective court's official website or contact the registrar's office.`,
    keywords: ["judge appointments", "vacancies", "supreme court", "high court", "district court", "collegium", "judicial service"]
  },
  {
    query: "Traffic violation fines and e-challan payment",
    category: "traffic-violations",
    response: `Traffic e-challan services and fine payment procedures:

**Check Traffic Challans:**
- Visit state transport department websites
- Use Parivahan portal (parivahan.gov.in)
- Check via vehicle registration number
- SMS services available in most states

**Payment Methods:**
- Online payment through state portals
- UPI applications (Paytm, GPay, PhonePe)
- Net banking and debit/credit cards
- Designated bank branches
- Common Service Centers (CSCs)

**E-Challan Process:**
1. Traffic violation captured by cameras or issued by officers
2. Challan generated with photo evidence
3. SMS/notification sent to registered mobile
4. Payment deadline typically 60 days
5. Late payment may incur additional penalties

**Common Traffic Fines:**
- Over-speeding: ₹1,000-₹2,000
- Jumping red light: ₹1,000
- Not wearing helmet: ₹1,000
- Drunk driving: ₹10,000
- Without license: ₹5,000

**Contest Challans:**
- File objection online within specified time
- Provide evidence/documents supporting your case
- Virtual court hearings available in some states
- Appeal process through designated authorities

For state-specific information, visit your state transport department website.`,
    keywords: ["traffic challan", "e-challan", "traffic fine", "parivahan", "vehicle", "penalty", "payment", "contest"]
  },
  {
    query: "Court live streaming and webcast services",
    category: "court-streaming",
    response: `Live court proceeding streaming services:

**Supreme Court Live Streaming:**
- Website: webcast.nic.in
- Constitutional bench hearings
- Matters of national importance
- Public interest litigations
- Live streaming of select cases since 2018

**High Court Streaming:**
- Selected High Courts provide live streaming
- Constitutional matters and PILs
- Check individual High Court websites
- Delhi, Bombay, Karnataka High Courts active

**Available Features:**
- Real-time video streaming
- Audio in multiple languages (where available)
- Case schedule and cause list integration
- Archive of past proceedings
- Mobile-friendly interfaces

**Access Requirements:**
- No registration required for public streaming
- Internet connection with minimum 2 Mbps speed
- Compatible browsers (Chrome, Firefox, Safari)
- Mobile app access for some courts

**Schedule Information:**
- Daily cause lists published evening before
- Live streaming schedule on court websites
- Push notifications for important cases
- Time slots generally 10:30 AM to 4:30 PM

**Technical Support:**
- Help desk available during court hours
- Email support for streaming issues
- Alternative links for high traffic periods

Note: Not all cases are streamed due to privacy and legal considerations.`,
    keywords: ["live streaming", "webcast", "court proceedings", "supreme court", "high court", "online", "video"]
  },
  {
    query: "Tele Law services and legal aid",
    category: "tele-law",
    response: `Tele Law services for free legal consultation:

**What is Tele Law:**
- Video conferencing based legal consultation
- Pre-litigation advice and guidance
- Legal document drafting assistance
- Available in multiple Indian languages
- Free service for eligible citizens

**How to Access:**
1. Visit nearest Common Service Center (CSC)
2. Book appointment through CSC operator
3. Provide case details and documents
4. Connect with panel lawyer via video call
5. Receive legal advice and documentation

**Eligibility:**
- BPL cardholders
- SC/ST community members
- Women, children, and senior citizens
- Transgender persons
- Victims of acid attacks and human trafficking
- Persons with disabilities

**Services Provided:**
- Legal advice and consultation
- Document drafting and review
- Property and family law guidance
- Consumer protection advice
- Labour law consultations
- Criminal law preliminary advice

**Available Languages:**
Hindi, English, and 22 regional languages

**Booking Methods:**
- CSC centers across India
- Online booking portal
- Helpline: 1800-345-3570
- Mobile app: Tele-Law Mobile App

**Panel Lawyers:**
- Qualified advocates empaneled by NALSA
- Specialized in different legal areas
- Regular training on technology and law updates
- Quality monitoring and feedback system

**Success Statistics:**
- Over 75,000 consultations completed
- 95% user satisfaction rate
- Available in 600+ districts`,
    keywords: ["tele law", "legal aid", "free legal advice", "video consultation", "csc", "nalsa", "legal help"]
  }
];
