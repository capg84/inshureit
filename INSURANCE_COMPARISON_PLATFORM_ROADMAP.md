# InshureIt - Insurance Comparison Platform Implementation Plan
**Project Name:** InshureIt Multi-Provider Comparison Platform
**Version:** 1.0
**Date:** November 30, 2025
**Status:** Planning Phase

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Goals & Objectives](#project-goals--objectives)
3. [Competitive Analysis](#competitive-analysis)
4. [Technical Architecture](#technical-architecture)
5. [Feature Breakdown](#feature-breakdown)
6. [Implementation Phases](#implementation-phases)
7. [Detailed Roadmap](#detailed-roadmap)
8. [API Integration Strategy](#api-integration-strategy)
9. [Database Schema Updates](#database-schema-updates)
10. [Frontend Components](#frontend-components)
11. [Backend Services](#backend-services)
12. [User Flows](#user-flows)
13. [Testing Strategy](#testing-strategy)
14. [Deployment Plan](#deployment-plan)
15. [Risk Assessment](#risk-assessment)
16. [Success Metrics](#success-metrics)
17. [Budget & Resources](#budget--resources)

---

## Executive Summary

### Vision
Transform InshureIt from a single-provider quote platform into a comprehensive multi-provider insurance comparison marketplace, similar to QuoteZone, enabling customers to compare 20-50+ insurance providers in real-time.

### Business Opportunity
- **Market Size**: UK insurance comparison market valued at £1.2B+ annually
- **Competition**: QuoteZone processes 4-5M quotes/year across 130+ providers
- **Differentiation**: Focus on specific niches, superior UX, integrated rewards program

### Key Success Factors
1. ✅ Seamless Seopa API integration for multi-provider quotes
2. ✅ Superior user experience vs. competitors
3. ✅ Fast quote comparison (<5 seconds)
4. ✅ Mobile-first responsive design
5. ✅ Trust signals (FCA compliance, reviews, security)

### Timeline Overview
- **Phase 1 (MVP)**: 8-10 weeks
- **Phase 2 (Enhancement)**: 6-8 weeks
- **Phase 3 (Scale)**: 8-12 weeks
- **Total**: 22-30 weeks (5.5-7.5 months)

---

## Project Goals & Objectives

### Primary Goals
1. **Multi-Provider Comparison**: Aggregate and compare quotes from 20-50+ insurance providers
2. **API Integration**: Successfully integrate Seopa API platform
3. **User Experience**: Reduce quote journey from 5 minutes to <2 minutes
4. **Conversion Rate**: Achieve 15-20% quote-to-purchase conversion
5. **Scale**: Handle 10,000+ quotes per month by month 6

### Secondary Goals
- Build customer loyalty program (rewards/cashback)
- Establish trust through reviews and certifications
- Mobile traffic target: 60%+ of total users
- Average savings showcase: £200-500 per policy

### KPIs
| Metric | Current | Target (6 months) |
|--------|---------|-------------------|
| Providers | 0 | 20-50 |
| Monthly Quotes | ~100 | 10,000+ |
| Conversion Rate | Unknown | 15-20% |
| Mobile Traffic | ~40% | 60%+ |
| Page Load Time | ~3s | <1.5s |
| Quote Generation Time | N/A | <5s |

---

## Competitive Analysis

### QuoteZone (Primary Benchmark)

**Strengths:**
- 60+ insurance products
- 130+ providers
- 20 years experience
- Integrated rewards program
- 4-5M quotes annually
- Strong brand recognition

**Weaknesses:**
- Complex navigation (too many products)
- Dated UI/UX in some areas
- Long forms (>10 steps for some products)
- Generic positioning

**InshureIt Differentiation Strategy:**
1. **Focus**: Start with 3-5 core products (car, home, business)
2. **UX**: Modern, streamlined interface
3. **Speed**: Faster quote generation (<5s vs. 10-15s)
4. **Transparency**: Clear pricing, no hidden fees
5. **Mobile**: Superior mobile experience

### Other Competitors
- **Compare The Market**: Meerkat rewards, broad coverage
- **GoCompare**: Price focus, strong marketing
- **MoneySuperMarket**: Established brand, comprehensive
- **Confused.com**: Good UX, trusted brand

---

## Technical Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Desktop    │  │    Mobile    │  │    Tablet    │      │
│  │   (React)    │  │   (React)    │  │   (React)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/REST
┌────────────────────────▼────────────────────────────────────┐
│                  API Gateway / Load Balancer                 │
│                     (Nginx / CloudFlare)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   InshureIt Backend API                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Express.js + TypeScript + Prisma            │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   Auth      │  │   Quote      │  │  Provider  │ │  │
│  │  │  Service    │  │   Service    │  │  Service   │ │  │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │  Seopa      │  │  Comparison  │  │   User     │ │  │
│  │  │ Integration │  │   Engine     │  │  Service   │ │  │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌──────▼──────┐  ┌─────▼──────┐
│   MySQL DB   │  │  Seopa API  │  │   Redis    │
│  (Prisma)    │  │  (External) │  │  (Cache)   │
└──────────────┘  └─────────────┘  └────────────┘
```

### Technology Stack

**Frontend:**
- React 18.x
- TypeScript
- Tailwind CSS
- React Router v6
- React Query (data fetching/caching)
- Zustand (state management)
- Vite (build tool)

**Backend:**
- Node.js 18.x LTS
- Express.js
- TypeScript
- Prisma ORM
- MySQL 8.0
- Redis (session/cache)
- Bull (job queue)

**Third-Party Services:**
- Seopa API (insurance quotes)
- Stripe (payments - future)
- SendGrid/Nodemailer (emails)
- CloudFlare (CDN/security)
- AWS S3 (document storage)

**DevOps:**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Oracle Cloud (hosting)
- Let's Encrypt (SSL)
- Sentry (error tracking)

---

## Feature Breakdown

### Phase 1: MVP (Weeks 1-10)

#### Core Features

**1. Multi-Provider Quote Comparison**
- Display quotes from 5-10 providers side-by-side
- Real-time pricing from Seopa API
- Filter by price, coverage, rating
- Sort functionality
- Save quotes for later

**2. Enhanced Quote Form**
- Modern multi-step form
- Progress indicator
- Auto-save functionality
- Vehicle registration lookup (UK only)
- Address autocomplete
- Form validation with helpful errors

**3. Provider Integration (Seopa API)**
- Quote request aggregation
- Provider data normalization
- Real-time status tracking
- Error handling and fallbacks
- Rate limiting and throttling

**4. Comparison Engine**
- Side-by-side comparison view
- Savings calculator
- Coverage comparison matrix
- Provider ratings/reviews
- "Best value" recommendations

**5. User Dashboard**
- View saved quotes
- Quote history
- Personal details management
- Email preferences

#### Technical Requirements

**Frontend Components:**
- [ ] QuoteWizard (multi-step form)
- [ ] ComparisonTable component
- [ ] ProviderCard component
- [ ] FilterSidebar component
- [ ] QuoteSummary component
- [ ] PriceDisplay component
- [ ] ProgressStepper component
- [ ] VehicleRegLookup component

**Backend Services:**
- [ ] SeopaIntegrationService
- [ ] QuoteAggregationService
- [ ] ComparisonEngine
- [ ] CachingService (Redis)
- [ ] QueueService (background jobs)
- [ ] NotificationService
- [ ] AuditLogService

**Database Tables:**
- [ ] `provider_quotes` (individual provider quotes)
- [ ] `quote_comparisons` (aggregated comparisons)
- [ ] `providers` (insurance provider data)
- [ ] `quote_requests` (user quote requests)
- [ ] `saved_quotes` (user saved quotes)
- [ ] `audit_logs` (system audit trail)

### Phase 2: Enhancement (Weeks 11-18)

#### Additional Features

**1. Advanced Filtering**
- Coverage level filters
- Excess amount filters
- Provider type (broker vs. direct)
- Customer rating filters
- Add-ons/extras filtering

**2. Vehicle Data Enhancement**
- Full vehicle lookup by registration
- Auto-populate make/model/year
- Mileage estimation
- Security features detection
- Modification tracking

**3. User Account Features**
- Policy renewal reminders
- Price tracking (monitor changes)
- Multi-quote management
- Document storage
- Referral program

**4. Mobile Optimization**
- PWA capabilities
- Offline form saving
- Mobile-specific UI
- Touch-optimized controls
- Faster mobile performance

**5. Trust & Social Proof**
- Trustpilot integration
- User review system
- Provider ratings
- Security badges
- FCA registration display

#### Technical Enhancements

**Frontend:**
- [ ] PWA service worker
- [ ] Offline support
- [ ] Push notifications
- [ ] Advanced form validation
- [ ] Accessibility improvements (WCAG 2.1 AA)

**Backend:**
- [ ] Advanced caching strategies
- [ ] Background job processing
- [ ] Webhook handlers
- [ ] Analytics integration
- [ ] A/B testing framework

### Phase 3: Scale & Optimize (Weeks 19-30)

#### Advanced Features

**1. Rewards Program**
- Cashback on purchases
- Partner merchant integration
- Points system
- Tier-based benefits
- Monthly prize draws

**2. Multiple Insurance Products**
- Home insurance comparison
- Business insurance
- Van insurance
- Motorcycle insurance
- Product cross-sell

**3. AI/ML Features**
- Personalized recommendations
- Price prediction
- Fraud detection
- Chatbot support
- Auto-fill suggestions

**4. Advanced Analytics**
- User behavior tracking
- Conversion funnel analysis
- A/B testing results
- Provider performance metrics
- Revenue analytics

**5. Partner Portal**
- Provider dashboard
- Quote volume statistics
- Conversion tracking
- Commission reporting
- API documentation

#### Technical Scale

**Infrastructure:**
- [ ] Kubernetes deployment
- [ ] Auto-scaling
- [ ] CDN optimization
- [ ] Database read replicas
- [ ] Multi-region support

**Performance:**
- [ ] Sub-second API responses
- [ ] Lazy loading optimization
- [ ] Code splitting
- [ ] Image optimization
- [ ] Database query optimization

---

## Detailed Roadmap

### Phase 1: MVP (Weeks 1-10)

#### Week 1-2: Foundation & Setup
**Backend:**
- [ ] Set up Seopa API sandbox account
- [ ] Review Seopa API documentation
- [ ] Design database schema updates
- [ ] Create Prisma migrations
- [ ] Set up Redis for caching
- [ ] Configure Bull queue system

**Frontend:**
- [ ] Design new quote flow wireframes
- [ ] Create component library
- [ ] Set up React Query
- [ ] Design comparison table UI

**DevOps:**
- [ ] Set up staging environment
- [ ] Configure CI/CD pipeline
- [ ] Set up error tracking (Sentry)

**Deliverables:**
- ✅ Technical architecture document
- ✅ Database schema design
- ✅ Seopa API sandbox access
- ✅ Development environment ready

---

#### Week 3-4: Seopa API Integration
**Backend:**
- [ ] Build SeopaApiClient class
- [ ] Implement quote request methods
- [ ] Implement quote retrieval methods
- [ ] Build error handling
- [ ] Create retry logic
- [ ] Build rate limiting
- [ ] Write integration tests

**Example Implementation:**
```typescript
// server/src/services/seopa/SeopaApiClient.ts
export class SeopaApiClient {
  private apiKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  async requestQuote(quoteData: QuoteRequest): Promise<QuoteResponse> {
    // Send quote request to Seopa
    // Return quote ID for tracking
  }

  async getQuoteStatus(quoteId: string): Promise<QuoteStatus> {
    // Check quote processing status
  }

  async getQuoteResults(quoteId: string): Promise<ProviderQuote[]> {
    // Retrieve all provider quotes
  }
}
```

**Testing:**
- [ ] Unit tests for API client
- [ ] Integration tests with sandbox
- [ ] Error scenario testing
- [ ] Load testing (100 requests/min)

**Deliverables:**
- ✅ Working Seopa API integration
- ✅ Test coverage >80%
- ✅ API documentation

---

#### Week 5-6: Quote Comparison Engine
**Backend:**
- [ ] Build ComparisonEngine service
- [ ] Implement quote aggregation
- [ ] Build savings calculator
- [ ] Create ranking algorithm
- [ ] Implement caching layer
- [ ] Build background job processor

```typescript
// server/src/services/comparison/ComparisonEngine.ts
export class ComparisonEngine {
  async aggregateQuotes(quoteId: string): Promise<QuoteComparison> {
    // Fetch all provider quotes
    // Normalize data structure
    // Calculate savings
    // Rank providers
    // Cache results
  }

  calculateSavings(quotes: ProviderQuote[]): SavingsData {
    // Calculate average price
    // Find cheapest option
    // Calculate savings percentage
  }

  rankProviders(quotes: ProviderQuote[]): RankedQuote[] {
    // Apply ranking algorithm
    // Consider price, rating, coverage
  }
}
```

**Frontend:**
- [ ] Build ComparisonTable component
- [ ] Build ProviderCard component
- [ ] Build FilterSidebar component
- [ ] Implement sorting logic
- [ ] Add loading states

**Deliverables:**
- ✅ Functional comparison engine
- ✅ Comparison UI components
- ✅ Sorting and filtering

---

#### Week 7-8: Enhanced Quote Form
**Frontend:**
- [ ] Build multi-step form wizard
- [ ] Implement progress indicator
- [ ] Add vehicle reg lookup
- [ ] Add address autocomplete
- [ ] Implement auto-save
- [ ] Add form validation
- [ ] Build mobile-optimized version

```typescript
// client/src/components/quote/QuoteWizard.tsx
const steps = [
  { id: 'vehicle', title: 'Your Vehicle', component: VehicleDetails },
  { id: 'driver', title: 'About You', component: DriverDetails },
  { id: 'usage', title: 'How You Use It', component: UsageDetails },
  { id: 'coverage', title: 'Coverage', component: CoverageOptions },
  { id: 'review', title: 'Review', component: ReviewSubmit }
];
```

**Backend:**
- [ ] Build VehicleLookupService (DVLA API)
- [ ] Build AddressLookupService (Postcode API)
- [ ] Implement form auto-save endpoints
- [ ] Build draft quote storage

**Deliverables:**
- ✅ Modern multi-step quote form
- ✅ Auto-save functionality
- ✅ Vehicle lookup integration
- ✅ Mobile-responsive design

---

#### Week 9-10: Testing, Polish & Launch Prep
**Testing:**
- [ ] End-to-end testing (Cypress)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Load testing (1000 concurrent users)
- [ ] Security audit
- [ ] Accessibility audit (WCAG 2.1)

**Polish:**
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Error message improvements
- [ ] Loading state animations
- [ ] Empty state designs

**Documentation:**
- [ ] User documentation
- [ ] API documentation
- [ ] Deployment guide
- [ ] Troubleshooting guide

**Deliverables:**
- ✅ MVP ready for production
- ✅ All tests passing
- ✅ Documentation complete
- ✅ Stakeholder demo completed

---

### Phase 2: Enhancement (Weeks 11-18)

#### Week 11-12: Advanced Filtering & Search
- [ ] Build advanced filter system
- [ ] Implement faceted search
- [ ] Add price range slider
- [ ] Build coverage comparison matrix
- [ ] Add provider reputation filters

#### Week 13-14: User Account Enhancements
- [ ] Build policy dashboard
- [ ] Implement renewal reminders
- [ ] Build document storage (AWS S3)
- [ ] Create price tracking alerts
- [ ] Build referral system

#### Week 15-16: Mobile PWA
- [ ] Implement service worker
- [ ] Add offline support
- [ ] Enable push notifications
- [ ] Optimize mobile performance
- [ ] Add home screen install prompt

#### Week 17-18: Trust & Social Proof
- [ ] Integrate Trustpilot reviews
- [ ] Build internal review system
- [ ] Add provider ratings
- [ ] Display security badges
- [ ] Add FAQ section

**Phase 2 Deliverables:**
- ✅ Advanced filtering features
- ✅ Enhanced user dashboard
- ✅ PWA capabilities
- ✅ Trust signals integrated

---

### Phase 3: Scale & Optimize (Weeks 19-30)

#### Week 19-22: Rewards Program
- [ ] Design rewards system architecture
- [ ] Build points calculation engine
- [ ] Integrate partner merchants (1000+)
- [ ] Build cashback tracking
- [ ] Create tier system (Free/Premium)
- [ ] Build prize draw system
- [ ] Design rewards dashboard

#### Week 23-25: Additional Insurance Products
- [ ] Add home insurance quotes
- [ ] Add business insurance quotes
- [ ] Add van insurance quotes
- [ ] Build product cross-sell logic
- [ ] Create multi-product bundles

#### Week 26-28: AI/ML Features
- [ ] Build recommendation engine
- [ ] Implement price prediction
- [ ] Add fraud detection
- [ ] Build chatbot (basic)
- [ ] Implement auto-fill intelligence

#### Week 29-30: Analytics & Partner Portal
- [ ] Build analytics dashboard
- [ ] Create conversion funnel tracking
- [ ] Implement A/B testing framework
- [ ] Build partner portal MVP
- [ ] Create reporting system

**Phase 3 Deliverables:**
- ✅ Rewards program live
- ✅ Multiple insurance products
- ✅ AI-powered features
- ✅ Analytics platform
- ✅ Partner portal

---

## API Integration Strategy

### Seopa API Integration Details

#### API Endpoints (Expected)

```typescript
// Quote Request
POST /api/v1/quotes/request
{
  "product": "motor_insurance",
  "vehicle": {
    "registration": "AB12CDE",
    "make": "Ford",
    "model": "Focus",
    "year": 2020
  },
  "driver": {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "licenseType": "FULL_UK"
  },
  "coverage": {
    "type": "COMPREHENSIVE",
    "startDate": "2025-12-15"
  }
}

// Response
{
  "quoteId": "QT-12345-ABCDE",
  "status": "PROCESSING",
  "estimatedTime": 30
}

// Get Quote Status
GET /api/v1/quotes/{quoteId}/status

// Get Quote Results
GET /api/v1/quotes/{quoteId}/results
{
  "quoteId": "QT-12345-ABCDE",
  "status": "COMPLETE",
  "providers": [
    {
      "providerId": "AVIVA-UK",
      "providerName": "Aviva",
      "premium": {
        "annual": 456.78,
        "monthly": 39.99
      },
      "excess": {
        "compulsory": 250,
        "voluntary": 100
      },
      "coverageLevel": "COMPREHENSIVE",
      "rating": 4.5,
      "reviewCount": 12543
    },
    // ... more providers
  ]
}
```

#### Integration Architecture

```typescript
// server/src/services/seopa/index.ts
export class SeopaService {
  private client: SeopaApiClient;
  private cache: RedisCache;
  private queue: QuoteQueue;

  async requestQuote(quoteData: QuoteRequestData): Promise<string> {
    // 1. Validate quote data
    // 2. Submit to Seopa API
    // 3. Store quote request in DB
    // 4. Queue status check job
    // 5. Return quote ID
  }

  async processQuoteStatus(quoteId: string): Promise<void> {
    // Background job to check quote status
    // If complete, fetch and store results
    // Send notification to user
  }

  async getComparisonResults(quoteId: string): Promise<QuoteComparison> {
    // 1. Check cache first
    // 2. Fetch from DB if not cached
    // 3. Apply business logic (ranking, filtering)
    // 4. Return formatted results
  }
}
```

#### Error Handling Strategy

```typescript
export class SeopaApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number,
    public retryable: boolean
  ) {
    super(message);
  }
}

// Error types:
// - RATE_LIMIT_EXCEEDED (429) - Retryable
// - INVALID_REQUEST (400) - Not retryable
// - PROVIDER_TIMEOUT (504) - Retryable
// - API_DOWN (503) - Retryable
// - AUTH_FAILED (401) - Not retryable
```

#### Rate Limiting & Throttling

```typescript
// Using Redis for distributed rate limiting
export class RateLimiter {
  private redis: Redis;

  async checkLimit(key: string, limit: number, window: number): Promise<boolean> {
    // Sliding window rate limiter
    // Key: user_id or ip_address
    // Limit: 100 requests
    // Window: 60 seconds
  }
}

// Seopa API limits (example):
// - 100 requests/minute per API key
// - 10,000 requests/day
// - Burst: 10 requests/second
```

---

## Database Schema Updates

### New Tables

```prisma
// prisma/schema.prisma

model Provider {
  id            String   @id @default(uuid())
  externalId    String   @unique // Seopa provider ID
  name          String
  displayName   String
  logo          String?
  rating        Float?
  reviewCount   Int      @default(0)
  description   String?  @db.Text
  website       String?
  phoneNumber   String?
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  quotes        ProviderQuote[]

  @@index([externalId])
  @@index([isActive])
}

model QuoteRequest {
  id                String   @id @default(uuid())
  userId            String?
  externalQuoteId   String?  @unique // Seopa quote ID
  product           String   // motor, home, business
  status            String   // PENDING, PROCESSING, COMPLETE, FAILED
  requestData       Json     // Full quote request payload
  ipAddress         String?
  userAgent         String?  @db.Text
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  completedAt       DateTime?

  user              User?    @relation(fields: [userId], references: [id])
  comparison        QuoteComparison?
  providerQuotes    ProviderQuote[]

  @@index([userId])
  @@index([externalQuoteId])
  @@index([status])
  @@index([createdAt])
}

model QuoteComparison {
  id              String   @id @default(uuid())
  quoteRequestId  String   @unique
  cheapestPrice   Float
  averagePrice    Float
  maxSavings      Float
  providerCount   Int
  recommendedId   String?  // Best value provider quote ID
  comparisonData  Json     // Normalized comparison data
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  quoteRequest    QuoteRequest @relation(fields: [quoteRequestId], references: [id])

  @@index([quoteRequestId])
}

model ProviderQuote {
  id              String   @id @default(uuid())
  quoteRequestId  String
  providerId      String
  externalId      String?  // Provider's quote reference
  annualPremium   Float
  monthlyPremium  Float?
  excess          Json     // { compulsory: 250, voluntary: 100 }
  coverageLevel   String
  paymentOptions  Json?
  addOns          Json?
  quoteData       Json     // Full quote details
  rank            Int?
  isRecommended   Boolean  @default(false)
  createdAt       DateTime @default(now())
  expiresAt       DateTime

  quoteRequest    QuoteRequest @relation(fields: [quoteRequestId], references: [id])
  provider        Provider @relation(fields: [providerId], references: [id])

  @@index([quoteRequestId])
  @@index([providerId])
  @@index([annualPremium])
}

model SavedQuote {
  id              String   @id @default(uuid())
  userId          String
  quoteRequestId  String
  notes           String?  @db.Text
  isFavorite      Boolean  @default(false)
  createdAt       DateTime @default(now())

  user            User @relation(fields: [userId], references: [id])

  @@index([userId])
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String?
  action      String   // QUOTE_REQUEST, QUOTE_VIEW, PURCHASE, etc.
  entity      String   // quote, user, provider
  entityId    String
  metadata    Json?
  ipAddress   String?
  userAgent   String?  @db.Text
  createdAt   DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
}
```

### Existing Table Updates

```prisma
model User {
  // ... existing fields

  // New fields
  quoteRequests   QuoteRequest[]
  savedQuotes     SavedQuote[]
  preferences     Json?        // { emailNotifications: true, priceAlerts: true }
  lastQuoteDate   DateTime?
  totalQuotes     Int          @default(0)
}

model Quote {
  // ... existing fields (keep for backward compatibility)

  // Link to new system
  quoteRequestId  String?

  @@index([quoteRequestId])
}
```

---

## Frontend Components

### Component Hierarchy

```
App
├── Routes
│   ├── Customer Routes
│   │   ├── HomePage
│   │   ├── QuoteWizardPage
│   │   │   └── QuoteWizard
│   │   │       ├── StepIndicator
│   │   │       ├── VehicleDetailsStep
│   │   │       ├── DriverDetailsStep
│   │   │       ├── UsageDetailsStep
│   │   │       ├── CoverageStep
│   │   │       └── ReviewStep
│   │   ├── ComparisonPage
│   │   │   ├── ComparisonTable
│   │   │   ├── FilterSidebar
│   │   │   ├── ProviderCard
│   │   │   └── SavingsSummary
│   │   └── QuoteResultsPage
│   └── Backoffice Routes (existing)
```

### Key Components Detail

#### 1. QuoteWizard Component

```typescript
// client/src/components/quote/QuoteWizard.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuoteWizardProps {
  productType: 'motor' | 'home' | 'business';
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({ productType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const steps = [
    { id: 'vehicle', title: 'Your Vehicle', component: VehicleDetails },
    { id: 'driver', title: 'About You', component: DriverDetails },
    { id: 'usage', title: 'How You Use It', component: UsageDetails },
    { id: 'coverage', title: 'Coverage Options', component: CoverageOptions },
    { id: 'review', title: 'Review & Submit', component: ReviewSubmit }
  ];

  const handleNext = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitQuote();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitQuote = async () => {
    try {
      const response = await quoteService.requestQuote(formData);
      navigate(`/quote/results/${response.data.quoteId}`);
    } catch (error) {
      // Handle error
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="quote-wizard">
      <StepIndicator steps={steps} currentStep={currentStep} />
      <StepComponent
        data={formData}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};
```

#### 2. ComparisonTable Component

```typescript
// client/src/components/comparison/ComparisonTable.tsx
interface ComparisonTableProps {
  quotes: ProviderQuote[];
  filters: QuoteFilters;
  sortBy: SortOption;
  onFilterChange: (filters: QuoteFilters) => void;
  onSortChange: (sort: SortOption) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  quotes,
  filters,
  sortBy,
  onFilterChange,
  onSortChange
}) => {
  const filteredQuotes = useFilteredQuotes(quotes, filters);
  const sortedQuotes = useSortedQuotes(filteredQuotes, sortBy);

  return (
    <div className="comparison-table">
      <ComparisonHeader
        sortBy={sortBy}
        onSortChange={onSortChange}
        totalResults={quotes.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedQuotes.map(quote => (
          <ProviderCard
            key={quote.id}
            quote={quote}
            isRecommended={quote.isRecommended}
            savings={calculateSavings(quote, sortedQuotes)}
          />
        ))}
      </div>

      {sortedQuotes.length === 0 && (
        <EmptyState
          title="No quotes found"
          message="Try adjusting your filters"
          action={() => onFilterChange({})}
        />
      )}
    </div>
  );
};
```

#### 3. ProviderCard Component

```typescript
// client/src/components/comparison/ProviderCard.tsx
interface ProviderCardProps {
  quote: ProviderQuote;
  isRecommended: boolean;
  savings: number;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  quote,
  isRecommended,
  savings
}) => {
  return (
    <div className={`provider-card ${isRecommended ? 'recommended' : ''}`}>
      {isRecommended && <Badge>Best Value</Badge>}

      <div className="provider-header">
        <img src={quote.provider.logo} alt={quote.provider.name} />
        <div className="provider-rating">
          <StarRating value={quote.provider.rating} />
          <span className="text-sm text-gray-600">
            {quote.provider.reviewCount} reviews
          </span>
        </div>
      </div>

      <div className="pricing">
        <div className="annual-price">
          <span className="label">Annual</span>
          <span className="amount">£{quote.annualPremium.toFixed(2)}</span>
        </div>
        {quote.monthlyPremium && (
          <div className="monthly-price">
            <span className="label">Monthly</span>
            <span className="amount">£{quote.monthlyPremium.toFixed(2)}</span>
          </div>
        )}
      </div>

      {savings > 0 && (
        <div className="savings-badge">
          Save £{savings.toFixed(2)} vs average
        </div>
      )}

      <div className="coverage-details">
        <CoverageItem label="Coverage" value={quote.coverageLevel} />
        <CoverageItem label="Excess" value={`£${quote.excess.total}`} />
      </div>

      <Button
        variant="primary"
        onClick={() => window.open(quote.purchaseUrl, '_blank')}
      >
        Get This Quote
      </Button>
    </div>
  );
};
```

---

## Backend Services

### Service Architecture

```
server/src/services/
├── seopa/
│   ├── SeopaApiClient.ts          # HTTP client for Seopa API
│   ├── SeopaService.ts            # Business logic wrapper
│   ├── SeopaWebhookHandler.ts     # Webhook processing
│   └── types.ts                   # TypeScript interfaces
├── comparison/
│   ├── ComparisonEngine.ts        # Quote aggregation and ranking
│   ├── SavingsCalculator.ts       # Savings computation
│   ├── RankingAlgorithm.ts        # Provider ranking logic
│   └── FilterEngine.ts            # Quote filtering
├── quote/
│   ├── QuoteService.ts            # Quote request handling
│   ├── QuoteValidator.ts          # Input validation
│   ├── QuoteProcessor.ts          # Background processing
│   └── QuoteNotifier.ts           # User notifications
├── vehicle/
│   ├── VehicleLookupService.ts    # DVLA API integration
│   └── VehicleDataNormalizer.ts   # Data normalization
├── cache/
│   ├── RedisCacheService.ts       # Redis caching
│   └── CacheStrategy.ts           # Cache invalidation
└── queue/
    ├── QuoteQueue.ts              # Bull queue wrapper
    └── JobProcessor.ts            # Background job handlers
```

### Core Services Implementation

#### 1. SeopaService

```typescript
// server/src/services/seopa/SeopaService.ts
import { SeopaApiClient } from './SeopaApiClient';
import { QuoteQueue } from '../queue/QuoteQueue';
import { RedisCacheService } from '../cache/RedisCacheService';

export class SeopaService {
  private client: SeopaApiClient;
  private cache: RedisCacheService;
  private queue: QuoteQueue;

  constructor() {
    this.client = new SeopaApiClient({
      apiKey: process.env.SEOPA_API_KEY!,
      baseUrl: process.env.SEOPA_API_URL!,
      timeout: 30000
    });
    this.cache = new RedisCacheService();
    this.queue = new QuoteQueue();
  }

  async requestQuote(data: QuoteRequestData): Promise<QuoteRequestResult> {
    // 1. Validate input data
    const validatedData = await this.validateQuoteData(data);

    // 2. Submit quote request to Seopa
    const seopaResponse = await this.client.requestQuote(validatedData);

    // 3. Store quote request in database
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        externalQuoteId: seopaResponse.quoteId,
        userId: data.userId,
        product: data.product,
        status: 'PROCESSING',
        requestData: validatedData,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent
      }
    });

    // 4. Queue status check job
    await this.queue.addStatusCheckJob({
      quoteRequestId: quoteRequest.id,
      externalQuoteId: seopaResponse.quoteId,
      checkInterval: 5000, // 5 seconds
      maxAttempts: 60      // 5 minutes total
    });

    // 5. Return quote ID
    return {
      quoteId: quoteRequest.id,
      externalQuoteId: seopaResponse.quoteId,
      status: 'PROCESSING',
      estimatedTime: seopaResponse.estimatedTime
    };
  }

  async checkQuoteStatus(quoteRequestId: string): Promise<QuoteStatus> {
    // Check cache first
    const cached = await this.cache.get(`quote:status:${quoteRequestId}`);
    if (cached) return cached;

    // Fetch from database
    const quoteRequest = await prisma.quoteRequest.findUnique({
      where: { id: quoteRequestId },
      include: { providerQuotes: true }
    });

    if (!quoteRequest) {
      throw new Error('Quote request not found');
    }

    // If still processing, check Seopa API
    if (quoteRequest.status === 'PROCESSING') {
      const seopaStatus = await this.client.getQuoteStatus(
        quoteRequest.externalQuoteId!
      );

      if (seopaStatus.status === 'COMPLETE') {
        // Fetch and store results
        await this.processQuoteResults(quoteRequest.id);
      }
    }

    const status = {
      quoteId: quoteRequest.id,
      status: quoteRequest.status,
      providerCount: quoteRequest.providerQuotes.length,
      updatedAt: quoteRequest.updatedAt
    };

    // Cache for 30 seconds
    await this.cache.set(`quote:status:${quoteRequestId}`, status, 30);

    return status;
  }

  async processQuoteResults(quoteRequestId: string): Promise<void> {
    const quoteRequest = await prisma.quoteRequest.findUnique({
      where: { id: quoteRequestId }
    });

    if (!quoteRequest) return;

    // Fetch results from Seopa
    const results = await this.client.getQuoteResults(
      quoteRequest.externalQuoteId!
    );

    // Store provider quotes in parallel
    await Promise.all(
      results.providers.map(async (providerData) => {
        // Get or create provider
        const provider = await this.getOrCreateProvider(providerData);

        // Store provider quote
        await prisma.providerQuote.create({
          data: {
            quoteRequestId: quoteRequest.id,
            providerId: provider.id,
            externalId: providerData.quoteReference,
            annualPremium: providerData.premium.annual,
            monthlyPremium: providerData.premium.monthly,
            excess: providerData.excess,
            coverageLevel: providerData.coverageLevel,
            quoteData: providerData,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          }
        });
      })
    );

    // Update quote request status
    await prisma.quoteRequest.update({
      where: { id: quoteRequestId },
      data: {
        status: 'COMPLETE',
        completedAt: new Date()
      }
    });

    // Generate comparison
    await this.generateComparison(quoteRequestId);

    // Send notification to user
    await this.notifyUser(quoteRequest.userId, quoteRequestId);

    // Invalidate cache
    await this.cache.delete(`quote:status:${quoteRequestId}`);
  }

  private async generateComparison(quoteRequestId: string): Promise<void> {
    const quotes = await prisma.providerQuote.findMany({
      where: { quoteRequestId },
      include: { provider: true }
    });

    if (quotes.length === 0) return;

    // Calculate statistics
    const prices = quotes.map(q => q.annualPremium);
    const cheapestPrice = Math.min(...prices);
    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const maxSavings = averagePrice - cheapestPrice;

    // Rank quotes
    const rankedQuotes = this.rankQuotes(quotes);

    // Find recommended quote
    const recommended = rankedQuotes[0];

    // Update ranks
    await Promise.all(
      rankedQuotes.map((quote, index) =>
        prisma.providerQuote.update({
          where: { id: quote.id },
          data: {
            rank: index + 1,
            isRecommended: quote.id === recommended.id
          }
        })
      )
    );

    // Create comparison record
    await prisma.quoteComparison.create({
      data: {
        quoteRequestId,
        cheapestPrice,
        averagePrice,
        maxSavings,
        providerCount: quotes.length,
        recommendedId: recommended.id,
        comparisonData: {
          rankedQuotes: rankedQuotes.map(q => ({
            id: q.id,
            provider: q.provider.name,
            price: q.annualPremium,
            rank: q.rank
          }))
        }
      }
    });
  }

  private rankQuotes(quotes: ProviderQuote[]): ProviderQuote[] {
    // Ranking algorithm considering:
    // - Price (40% weight)
    // - Provider rating (30% weight)
    // - Coverage level (20% weight)
    // - Customer reviews (10% weight)

    return quotes
      .map(quote => ({
        ...quote,
        score: this.calculateQuoteScore(quote)
      }))
      .sort((a, b) => b.score - a.score);
  }

  private calculateQuoteScore(quote: ProviderQuote): number {
    const priceScore = 1 - (quote.annualPremium / 2000); // Normalize to 0-1
    const ratingScore = (quote.provider.rating || 0) / 5;
    const coverageScore = quote.coverageLevel === 'COMPREHENSIVE' ? 1 : 0.7;
    const reviewScore = Math.min(quote.provider.reviewCount / 10000, 1);

    return (
      priceScore * 0.4 +
      ratingScore * 0.3 +
      coverageScore * 0.2 +
      reviewScore * 0.1
    );
  }
}
```

---

## User Flows

### 1. Quote Request Flow

```
User Journey: Get Car Insurance Quote

1. Homepage
   ↓
2. Click "Get Car Insurance Quote"
   ↓
3. QuoteWizard - Step 1: Vehicle Details
   - Enter registration (optional) → Auto-populate vehicle data
   - Or manually enter: Make, Model, Year, Value
   - Select modifications (if any)
   ↓
4. QuoteWizard - Step 2: Driver Details
   - Name, DOB, License type, License years
   - Address (postcode lookup)
   - Occupation
   ↓
5. QuoteWizard - Step 3: Usage Details
   - Annual mileage
   - Main use (commute/personal/business)
   - Overnight parking
   - Additional drivers
   ↓
6. QuoteWizard - Step 4: Coverage Options
   - Coverage level (Third Party / Comprehensive)
   - Voluntary excess
   - Add-ons (breakdown, legal, etc.)
   ↓
7. QuoteWizard - Step 5: Review & Submit
   - Review all entered data
   - Edit any section
   - Submit quote request
   ↓
8. Processing Screen
   - "Finding the best quotes for you..."
   - Progress indicator
   - Real-time status updates
   ↓
9. Comparison Results Page
   - See all provider quotes
   - Filter and sort options
   - Recommended quote highlighted
   - Savings summary
   ↓
10. Provider Details
    - Click on provider to see full details
    - Coverage breakdown
    - Terms and conditions
    - Reviews and ratings
    ↓
11. Purchase Decision
    a) Select provider → Redirect to provider website
    b) Save quote for later → Add to dashboard
    c) Share quote → Email/link sharing
```

### 2. Comparison & Filtering Flow

```
Comparison Page Actions:

1. Initial View
   - All quotes displayed (default sort: price low-high)
   - Recommended quote highlighted
   - Savings vs. average shown
   ↓
2. Filtering Options
   - Price range slider
   - Coverage level (TP / TPF&T / Comprehensive)
   - Excess amount
   - Provider rating (4+ stars)
   - Monthly payment available
   - Add-ons included
   ↓
3. Sorting Options
   - Price: Low to High
   - Price: High to Low
   - Rating: Best First
   - Savings: Highest First
   ↓
4. Comparison Actions
   - Compare up to 3 quotes side-by-side
   - View detailed coverage comparison
   - See what's included/excluded
   - Check provider reviews
   ↓
5. Save/Share
   - Save quote to account
   - Email quote details
   - Share comparison link
   - Set price alert
```

### 3. User Dashboard Flow

```
Dashboard Features:

1. Login → Dashboard Home
   ↓
2. Dashboard Sections:
   a) Active Quotes
      - Quotes in progress
      - Quotes completed (last 30 days)
      - Quote status indicators

   b) Saved Quotes
      - Favorited quotes
      - Notes on each quote
      - Quick comparison

   c) Price Alerts
      - Monitor quote price changes
      - Email notifications
      - Alert management

   d) Renewal Reminders
      - Upcoming policy renewals
      - Renewal quote requests
      - Historical policies

   e) Documents
      - Saved quote PDFs
      - Policy documents
      - Correspondence
```

---

## Testing Strategy

### Testing Pyramid

```
       ╱╲
      ╱  ╲    E2E Tests (10%)
     ╱────╲   - Critical user journeys
    ╱      ╲  - Cross-browser testing
   ╱────────╲
  ╱          ╲ Integration Tests (30%)
 ╱────────────╲ - API endpoint tests
╱              ╲ - Database tests
╲──────────────╱ - External API mocks
 ╲            ╱
  ╲──────────╱   Unit Tests (60%)
   ╲        ╱    - Business logic
    ╲      ╱     - Utilities
     ╲    ╱      - Components
      ╲  ╱
       ╲╱
```

### Test Coverage Goals

| Layer | Coverage Target | Tools |
|-------|----------------|-------|
| Unit Tests | 80%+ | Jest, React Testing Library |
| Integration Tests | 60%+ | Supertest, Jest |
| E2E Tests | Critical paths only | Cypress |
| API Tests | 100% of endpoints | Supertest |

### Testing Checklist

#### Unit Tests
- [ ] All utility functions
- [ ] Business logic services
- [ ] React components (rendering, interactions)
- [ ] Custom hooks
- [ ] Validation functions
- [ ] Calculation functions (savings, rankings)

#### Integration Tests
- [ ] API endpoint flows
- [ ] Database operations
- [ ] Seopa API integration (mocked)
- [ ] Redis cache operations
- [ ] Email notifications
- [ ] Background jobs

#### E2E Tests (Critical Paths)
- [ ] Complete quote journey (vehicle → results)
- [ ] Filter and sort functionality
- [ ] Save quote to dashboard
- [ ] User registration and login
- [ ] Mobile responsive behavior
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

#### Performance Tests
- [ ] Quote generation time (<5s)
- [ ] Comparison page load (<2s)
- [ ] Concurrent user handling (1000+)
- [ ] API response times (<500ms)
- [ ] Database query optimization

#### Security Tests
- [ ] SQL injection protection
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Authentication/authorization
- [ ] Rate limiting effectiveness
- [ ] Data encryption (in transit & at rest)

---

## Deployment Plan

### Environment Strategy

```
Development → Staging → Production

Development:
- Local Docker setup
- Hot reload enabled
- Debug logging
- Test data

Staging:
- Oracle Cloud (separate instance)
- Production-like environment
- Real Seopa sandbox API
- SSL enabled
- Performance monitoring

Production:
- Oracle Cloud (current setup)
- Load balanced (future)
- Auto-scaling (future)
- Full monitoring
- Automated backups
```

### Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm run test:ci
          npm run test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          docker-compose -f docker-compose.ssl.yml build

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: |
          ssh staging "cd /app && ./deploy.sh"
      - name: Run smoke tests
        run: |
          npm run test:smoke -- --env=staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Backup database
        run: |
          ssh production "cd /app && ./scripts/backup-db.sh"
      - name: Deploy to production
        run: |
          ssh production "cd /app && ./deploy.sh"
      - name: Verify deployment
        run: |
          npm run test:smoke -- --env=production
      - name: Notify team
        run: |
          curl -X POST $SLACK_WEBHOOK \
            -d "Deployment successful!"
```

### Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing
- [ ] Code review completed
- [ ] Database migration scripts ready
- [ ] Environment variables updated
- [ ] Seopa API credentials configured
- [ ] Backup created

**Deployment:**
- [ ] Run database backup
- [ ] Pull latest code
- [ ] Run database migrations
- [ ] Build Docker images
- [ ] Start containers (zero-downtime)
- [ ] Verify all services healthy

**Post-Deployment:**
- [ ] Smoke tests passing
- [ ] Monitor error rates (< 1%)
- [ ] Check response times (< 2s)
- [ ] Verify Seopa integration working
- [ ] Test critical user flows
- [ ] Monitor for 30 minutes

**Rollback Plan:**
- [ ] Restore database from backup
- [ ] Revert to previous Docker images
- [ ] Clear Redis cache
- [ ] Notify users of maintenance

---

## Risk Assessment

### High Priority Risks

#### 1. Seopa API Integration Failure
**Risk**: Seopa API doesn't meet expectations or has reliability issues
**Impact**: HIGH - Core functionality dependent on this
**Probability**: MEDIUM
**Mitigation**:
- Thorough testing with sandbox environment
- Build fallback mechanisms
- Implement circuit breaker pattern
- Have backup provider API ready
- Clear SLA agreements

#### 2. Data Loss During Deployment
**Risk**: Database data loss during updates
**Impact**: HIGH - Loss of user quotes and data
**Probability**: MEDIUM (given recent incident)
**Mitigation**:
- Automated daily backups
- Pre-deployment backup mandatory
- Tested restore procedures
- Database migration rollback scripts
- Volume persistence verification

#### 3. Performance Issues at Scale
**Risk**: System cannot handle expected load
**Impact**: HIGH - Poor user experience, lost conversions
**Probability**: MEDIUM
**Mitigation**:
- Load testing before launch (10,000+ concurrent users)
- Redis caching strategy
- Database query optimization
- CDN for static assets
- Auto-scaling infrastructure (future)

#### 4. Security Vulnerabilities
**Risk**: Data breach or unauthorized access
**Impact**: CRITICAL - Legal, financial, reputation damage
**Probability**: LOW (with proper security)
**Mitigation**:
- Security audit before launch
- Penetration testing
- OWASP top 10 compliance
- Regular security updates
- Bug bounty program (future)

### Medium Priority Risks

#### 5. Provider Data Quality Issues
**Risk**: Inconsistent or inaccurate quote data from providers
**Impact**: MEDIUM - User trust issues, complaints
**Probability**: MEDIUM
**Mitigation**:
- Data validation and normalization
- Provider data quality monitoring
- User feedback mechanism
- Regular provider audits

#### 6. Competition & Market Changes
**Risk**: Competitors improve or new entrants
**Impact**: MEDIUM - Market share loss
**Probability**: HIGH
**Mitigation**:
- Focus on differentiation (UX, rewards)
- Continuous innovation
- Customer feedback loops
- Agile development for quick pivots

#### 7. Scope Creep
**Risk**: Project scope expands beyond plan
**Impact**: MEDIUM - Delayed launch, budget overrun
**Probability**: HIGH
**Mitigation**:
- Clear phase definitions
- Strict MVP scope
- Regular stakeholder alignment
- Change request process

### Low Priority Risks

#### 8. Third-Party Service Outages
**Risk**: External dependencies fail (email, payment, etc.)
**Impact**: LOW-MEDIUM - Temporary functionality loss
**Probability**: LOW
**Mitigation**:
- Multiple service providers
- Graceful degradation
- User communication
- Monitoring and alerts

---

## Success Metrics

### Key Performance Indicators (KPIs)

#### Business Metrics (6 months post-launch)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Monthly Active Users | 5,000+ | Google Analytics |
| Quote Requests/Month | 10,000+ | Database analytics |
| Quote Completion Rate | 60%+ | Funnel analysis |
| Quote-to-Purchase Conversion | 15-20% | Provider tracking |
| Average Savings Per User | £200+ | Comparison engine |
| Customer Acquisition Cost | <£15 | Marketing analytics |
| Customer Lifetime Value | £50+ | Revenue tracking |
| Net Promoter Score | 40+ | User surveys |

#### Technical Metrics

| Metric | Target | Monitoring Tool |
|--------|--------|----------------|
| Page Load Time | <2s | Lighthouse, GTmetrix |
| Quote Generation Time | <5s | Application monitoring |
| API Response Time | <500ms | APM (Datadog/New Relic) |
| Error Rate | <1% | Sentry |
| Uptime | 99.5%+ | Uptime monitoring |
| Mobile Performance Score | 90+ | Lighthouse |
| Accessibility Score | AA (WCAG 2.1) | WAVE, axe |

#### User Experience Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Mobile Traffic | 60%+ | Analytics |
| Bounce Rate | <40% | Analytics |
| Time on Comparison Page | 3+ min | Analytics |
| Saved Quotes Rate | 30%+ | User behavior tracking |
| Return User Rate | 20%+ | Analytics |
| Customer Support Tickets | <5% of users | Support system |

### Success Criteria

**MVP Launch Success (Phase 1):**
- ✅ 5-10 insurance providers integrated
- ✅ Quote generation working (<5s)
- ✅ Comparison functionality complete
- ✅ 100+ quotes processed successfully
- ✅ Zero critical bugs
- ✅ Page load < 2s
- ✅ Mobile responsive (100%)

**3-Month Success:**
- ✅ 1,000+ monthly quotes
- ✅ 20+ providers integrated
- ✅ 10% conversion rate
- ✅ 99%+ uptime
- ✅ Positive user feedback (NPS > 30)

**6-Month Success:**
- ✅ 10,000+ monthly quotes
- ✅ 50+ providers integrated
- ✅ 15%+ conversion rate
- ✅ £200+ average savings
- ✅ Rewards program launched
- ✅ Break-even on operating costs

---

## Budget & Resources

### Team Requirements

#### Phase 1 (MVP - Weeks 1-10)

**Full-Time:**
- 1x Full-Stack Developer (You + Claude Code)
- 1x UI/UX Designer (contract - weeks 1-4)

**Part-Time/Contract:**
- 1x QA Engineer (contract - weeks 8-10)
- 1x DevOps Engineer (support - as needed)

#### Phase 2-3 (Weeks 11-30)

**Full-Time:**
- 2x Full-Stack Developers
- 1x Product Manager
- 1x QA Engineer

**Part-Time/Contract:**
- 1x UI/UX Designer (ongoing)
- 1x Marketing Specialist
- 1x Customer Support

### Budget Estimate (6 months)

#### Development Costs

| Item | Cost (GBP) | Notes |
|------|-----------|-------|
| Seopa API Setup | £500 | One-time |
| Seopa API Usage | £500/mo | Based on volume |
| UI/UX Design | £5,000 | Contract designer |
| QA/Testing | £3,000 | Contract QA engineer |
| **Subtotal** | **£11,000** | |

#### Infrastructure & Services

| Item | Monthly Cost | 6-Month Cost | Notes |
|------|-------------|-------------|-------|
| Oracle Cloud Hosting | £50 | £300 | Current setup |
| Redis Cache (upgrade) | £20 | £120 | Managed Redis |
| CDN (CloudFlare Pro) | £20 | £120 | Enhanced performance |
| Email Service (SendGrid) | £15 | £90 | 50k emails/mo |
| Error Tracking (Sentry) | £29 | £174 | Team plan |
| Monitoring (Datadog) | £15 | £90 | Basic plan |
| SSL Certificates | £0 | £0 | Let's Encrypt |
| Backup Storage | £10 | £60 | AWS S3 |
| **Subtotal** | **£159/mo** | **£954** | |

#### Third-Party Integrations

| Service | Cost | Notes |
|---------|------|-------|
| DVLA API (vehicle lookup) | £100/mo | 10,000 requests |
| Postcode API | £30/mo | Address lookup |
| Trustpilot Integration | £200 | One-time |
| **Subtotal** | **£130/mo** | **£1,080** (6 months) |

#### Marketing & Growth (Post-MVP)

| Item | Budget | Notes |
|------|--------|-------|
| Google Ads | £2,000/mo | Months 4-6 |
| SEO | £500/mo | Months 4-6 |
| Content Marketing | £500/mo | Months 4-6 |
| **Subtotal** | **£3,000/mo** | **£9,000** (3 months) |

#### Total Budget Summary

| Category | Cost |
|----------|------|
| Development | £11,000 |
| Infrastructure (6 mo) | £954 |
| Third-Party Services (6 mo) | £1,080 |
| Marketing (3 mo) | £9,000 |
| **Total** | **£22,034** |
| **Monthly Operating Cost** | **£289** (after launch) |

### Resource Allocation Timeline

```
Month 1-2: MVP Development
- Developer (full-time)
- Designer (contract)
- Infrastructure setup

Month 3: Testing & Refinement
- Developer (full-time)
- QA Engineer (contract)
- Performance optimization

Month 4-6: Growth & Scale
- Developers (2x full-time)
- Marketing specialist
- Customer support
- Product manager
```

---

## Next Steps & Action Items

### Immediate Actions (This Week)

**Priority 1: Seopa API Access**
- [ ] Contact Seopa for API documentation
- [ ] Request sandbox/test API credentials
- [ ] Review API capabilities and limitations
- [ ] Clarify pricing structure
- [ ] Understand SLA and support

**Priority 2: Technical Setup**
- [ ] Create detailed database schema
- [ ] Set up development environment
- [ ] Configure Redis for caching
- [ ] Set up Bull for job queues
- [ ] Initialize testing framework

**Priority 3: Design & Planning**
- [ ] Create wireframes for quote wizard
- [ ] Design comparison table layouts
- [ ] Create UI component library
- [ ] Define brand colors and styles
- [ ] Plan mobile-first responsive design

### Week 1-2 Goals

- [ ] Seopa API integration working in sandbox
- [ ] Database schema implemented
- [ ] Basic quote form prototype
- [ ] Component library started
- [ ] CI/CD pipeline configured

### Phase 1 Milestones

**Milestone 1 (Week 4):** Seopa Integration Complete
- Quote request working
- Quote retrieval working
- Error handling implemented
- Tests passing

**Milestone 2 (Week 7):** Quote Wizard Complete
- All form steps functional
- Validation working
- Auto-save implemented
- Mobile responsive

**Milestone 3 (Week 10):** MVP Launch Ready
- Comparison engine working
- UI polished
- All tests passing
- Documentation complete
- Stakeholder demo successful

---

## Appendices

### A. API Endpoint Specifications

```typescript
// Quote Request Endpoints

POST /api/v1/quotes/request
POST /api/v1/quotes/:id/status
GET  /api/v1/quotes/:id/results
GET  /api/v1/quotes/:id/comparison
POST /api/v1/quotes/:id/save
GET  /api/v1/quotes/saved

// Provider Endpoints
GET  /api/v1/providers
GET  /api/v1/providers/:id
GET  /api/v1/providers/:id/reviews

// Vehicle Lookup
GET  /api/v1/vehicles/lookup/:registration

// User Dashboard
GET  /api/v1/user/quotes
GET  /api/v1/user/quotes/saved
GET  /api/v1/user/alerts
POST /api/v1/user/alerts

// Admin (Backoffice)
GET  /api/v1/admin/quotes
GET  /api/v1/admin/providers
GET  /api/v1/admin/analytics
```

### B. Environment Variables

```bash
# Seopa API
SEOPA_API_KEY=your_seopa_api_key
SEOPA_API_URL=https://api.seopa.com/v1
SEOPA_WEBHOOK_SECRET=your_webhook_secret

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password

# External Services
DVLA_API_KEY=your_dvla_api_key
POSTCODE_API_KEY=your_postcode_api_key
TRUSTPILOT_API_KEY=your_trustpilot_key

# Email
SENDGRID_API_KEY=your_sendgrid_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
DATADOG_API_KEY=your_datadog_key
```

### C. Useful Resources

**Seopa Documentation:**
- API Docs: [To be provided]
- Developer Portal: [To be provided]
- Sandbox: [To be provided]

**Design Resources:**
- QuoteZone: https://www.quotezone.co.uk/
- Compare The Market: https://www.comparethemarket.com/
- GoCompare: https://www.gocompare.com/

**Technical References:**
- Prisma Docs: https://www.prisma.io/docs
- React Query: https://tanstack.com/query/latest
- Bull Queue: https://github.com/OptimalBits/bull
- Redis: https://redis.io/docs/

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-30 | Claude Code | Initial roadmap created |

**Review Schedule:**
- Weekly during Phase 1
- Bi-weekly during Phase 2-3
- Monthly post-launch

**Stakeholder Approval:**
- [ ] Product Owner
- [ ] Technical Lead
- [ ] Business Stakeholder

---

**End of Document**
