export const blogPosts = [
  {
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications: Best Practices and Architecture Patterns",
    excerpt:
      "Learn how to structure and optimize Next.js applications for scale, including performance optimization, code organization, and deployment strategies.",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable Next.js applications requires careful consideration of architecture, performance, and maintainability. In this comprehensive guide, we'll explore the best practices and patterns that will help you create robust applications that can grow with your needs.</p>
      
      <h2>Project Structure and Organization</h2>
      <p>A well-organized project structure is the foundation of any scalable application. Here's how I recommend structuring your Next.js projects:</p>
      
      <pre><code>src/
├── app/                 # App Router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── features/       # Feature-specific components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles and themes</code></pre>
      
      <h2>Performance Optimization Strategies</h2>
      <p>Performance is crucial for user experience and SEO. Here are key optimization techniques:</p>
      
      <h3>1. Image Optimization</h3>
      <p>Always use Next.js Image component for automatic optimization:</p>
      <pre><code>import Image from 'next/image'

export function OptimizedImage() {
  return (
    &lt;Image
      src="/hero-image.jpg"
      alt="Description"
      width={800}
      height={600}
      priority
    /&gt;
  )
}</code></pre>
      
      <h3>2. Code Splitting and Lazy Loading</h3>
      <p>Implement dynamic imports for components that aren't immediately needed:</p>
      <pre><code>import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => &lt;p&gt;Loading...&lt;/p&gt;,
})</code></pre>
      
      <h2>State Management at Scale</h2>
      <p>For large applications, consider using Zustand or Redux Toolkit for global state management. Keep local state local and only lift state up when necessary.</p>
      
      <h2>API Design and Data Fetching</h2>
      <p>Use React Query or SWR for efficient data fetching and caching. Implement proper error handling and loading states throughout your application.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable Next.js applications is about making informed architectural decisions early and maintaining consistency throughout your codebase. Focus on performance, maintainability, and developer experience to create applications that can grow with your business needs.</p>
    `,
    author: "John Doe",
    publishedAt: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Next.js",
    tags: ["Next.js", "React", "Performance", "Architecture", "Scalability"],
    image: "/nextjs-app-architecture.png",
  },
  {
    slug: "mastering-typescript-advanced-patterns",
    title: "Mastering TypeScript: Advanced Patterns for Better Code Quality",
    excerpt:
      "Dive deep into advanced TypeScript patterns including utility types, conditional types, and template literal types to write more robust applications.",
    content: `
      <h2>Introduction</h2>
      <p>TypeScript has evolved significantly, offering powerful features that can dramatically improve code quality and developer experience. Let's explore advanced patterns that will take your TypeScript skills to the next level.</p>
      
      <h2>Utility Types and Type Manipulation</h2>
      <p>TypeScript provides several built-in utility types that can help you transform and manipulate types:</p>
      
      <pre><code>// Pick specific properties
type UserPreview = Pick&lt;User, 'id' | 'name' | 'email'&gt;

// Make all properties optional
type PartialUser = Partial&lt;User&gt;

// Create a type from object keys
type UserKeys = keyof User</code></pre>
      
      <h2>Conditional Types</h2>
      <p>Conditional types allow you to create types that depend on conditions:</p>
      
      <pre><code>type ApiResponse&lt;T&gt; = T extends string 
  ? { message: T } 
  : { data: T }

// Usage
type StringResponse = ApiResponse&lt;string&gt;  // { message: string }
type DataResponse = ApiResponse&lt;User&gt;     // { data: User }</code></pre>
      
      <h2>Template Literal Types</h2>
      <p>Create types from string templates for better API design:</p>
      
      <pre><code>type EventName = 'click' | 'focus' | 'blur'
type EventHandler&lt;T extends EventName&gt; = \`on\${Capitalize&lt;T&gt;}\`

// Results in: 'onClick' | 'onFocus' | 'onBlur'</code></pre>
      
      <h2>Advanced Generic Patterns</h2>
      <p>Use generic constraints and mapped types for flexible, type-safe APIs:</p>
      
      <pre><code>interface Repository&lt;T extends { id: string }&gt; {
  findById(id: string): Promise&lt;T | null&gt;
  create(data: Omit&lt;T, 'id'&gt;): Promise&lt;T&gt;
  update(id: string, data: Partial&lt;T&gt;): Promise&lt;T&gt;
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>These advanced TypeScript patterns enable you to write more expressive, type-safe code. Start incorporating these techniques gradually into your projects to see immediate improvements in code quality and developer experience.</p>
    `,
    author: "John Doe",
    publishedAt: "Dec 10, 2024",
    readTime: "6 min read",
    category: "TypeScript",
    tags: ["TypeScript", "Advanced", "Types", "Patterns", "Code Quality"],
    image: "/typescript-code-patterns-types.png",
  },
  {
    slug: "react-performance-optimization-guide",
    title: "React Performance Optimization: A Complete Guide",
    excerpt:
      "Comprehensive guide to optimizing React applications, covering memoization, code splitting, and profiling techniques for better user experience.",
    content: `
      <h2>Introduction</h2>
      <p>React performance optimization is crucial for creating smooth, responsive user interfaces. This guide covers essential techniques and best practices for optimizing your React applications.</p>
      
      <h2>Understanding React Rendering</h2>
      <p>Before optimizing, it's important to understand how React renders components and when re-renders occur. React re-renders components when:</p>
      <ul>
        <li>State changes</li>
        <li>Props change</li>
        <li>Parent component re-renders</li>
        <li>Context value changes</li>
      </ul>
      
      <h2>Memoization Techniques</h2>
      
      <h3>React.memo</h3>
      <p>Prevent unnecessary re-renders of functional components:</p>
      <pre><code>const ExpensiveComponent = React.memo(({ data }) => {
  return (
    &lt;div&gt;
      {data.map(item => &lt;Item key={item.id} item={item} /&gt;)}
    &lt;/div&gt;
  )
})</code></pre>
      
      <h3>useMemo and useCallback</h3>
      <p>Memoize expensive calculations and function references:</p>
      <pre><code>const MyComponent = ({ items, onItemClick }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])
  
  const handleClick = useCallback((id) => {
    onItemClick(id)
  }, [onItemClick])
  
  return (
    &lt;div&gt;
      &lt;p&gt;Total: {expensiveValue}&lt;/p&gt;
      {items.map(item => 
        &lt;Item key={item.id} item={item} onClick={handleClick} /&gt;
      )}
    &lt;/div&gt;
  )
}</code></pre>
      
      <h2>Code Splitting and Lazy Loading</h2>
      <p>Split your code to reduce initial bundle size:</p>
      <pre><code>import { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  )
}</code></pre>
      
      <h2>Profiling and Debugging</h2>
      <p>Use React DevTools Profiler to identify performance bottlenecks:</p>
      <ol>
        <li>Install React DevTools browser extension</li>
        <li>Open the Profiler tab</li>
        <li>Record a session while interacting with your app</li>
        <li>Analyze the flame graph to identify slow components</li>
      </ol>
      
      <h2>Virtual Scrolling</h2>
      <p>For large lists, implement virtual scrolling to render only visible items:</p>
      <pre><code>import { FixedSizeList as List } from 'react-window'

const VirtualizedList = ({ items }) => (
  &lt;List
    height={600}
    itemCount={items.length}
    itemSize={50}
    itemData={items}
  &gt;
    {({ index, style, data }) => (
      &lt;div style={style}&gt;
        {data[index].name}
      &lt;/div&gt;
    )}
  &lt;/List&gt;
)</code></pre>
      
      <h2>Conclusion</h2>
      <p>Performance optimization is an ongoing process. Start with profiling to identify bottlenecks, then apply these techniques strategically. Remember that premature optimization can lead to complex code, so measure first and optimize based on real performance issues.</p>
    `,
    author: "John Doe",
    publishedAt: "Dec 5, 2024",
    readTime: "10 min read",
    category: "React",
    tags: ["React", "Performance", "Optimization", "Memoization", "Profiling"],
    image: "/react-performance-dashboard.png",
  },
  {
    slug: "modern-css-techniques-2024",
    title: "Modern CSS Techniques Every Developer Should Know in 2024",
    excerpt:
      "Explore the latest CSS features including container queries, cascade layers, and modern layout techniques that are changing how we build interfaces.",
    content: `
      <h2>Introduction</h2>
      <p>CSS continues to evolve rapidly, with new features that make styling more powerful and intuitive. Let's explore the modern CSS techniques that every developer should master in 2024.</p>
      
      <h2>Container Queries</h2>
      <p>Container queries allow you to style elements based on their container's size, not just the viewport:</p>
      
      <pre><code>.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}</code></pre>
      
      <h2>CSS Grid Subgrid</h2>
      <p>Subgrid allows nested grids to participate in their parent's grid:</p>
      
      <pre><code>.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.child-grid {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}</code></pre>
      
      <h2>Cascade Layers</h2>
      <p>Control the cascade with explicit layers:</p>
      
      <pre><code>@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}</code></pre>
      
      <h2>Modern Color Functions</h2>
      <p>Use new color functions for better color manipulation:</p>
      
      <pre><code>:root {
  --primary: oklch(0.7 0.15 200);
  --primary-light: oklch(from var(--primary) calc(l + 0.1) c h);
  --primary-dark: oklch(from var(--primary) calc(l - 0.1) c h);
}</code></pre>
      
      <h2>Logical Properties</h2>
      <p>Use logical properties for better internationalization:</p>
      
      <pre><code>.card {
  margin-block: 1rem;
  margin-inline: 2rem;
  padding-block-start: 1rem;
  border-inline-start: 2px solid var(--primary);
}</code></pre>
      
      <h2>CSS Nesting</h2>
      <p>Native CSS nesting is now supported in modern browsers:</p>
      
      <pre><code>.card {
  padding: 1rem;
  border-radius: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    
    &:first-child {
      margin-top: 0;
    }
  }
}</code></pre>
      
      <h2>View Transitions API</h2>
      <p>Create smooth transitions between page states:</p>
      
      <pre><code>// JavaScript
document.startViewTransition(() => {
  // Update the DOM
  updateContent()
})

/* CSS */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>These modern CSS features provide powerful tools for creating more maintainable and performant stylesheets. Start experimenting with these techniques in your projects, keeping browser support in mind for production applications.</p>
    `,
    author: "John Doe",
    publishedAt: "Nov 28, 2024",
    readTime: "7 min read",
    category: "Web Development",
    tags: ["CSS", "Modern", "Container Queries", "Grid", "Styling"],
    image: "/modern-css-features.png",
  },
  {
    slug: "web-accessibility-complete-guide",
    title: "Web Accessibility: A Complete Guide for Developers",
    excerpt:
      "Learn how to build inclusive web applications that work for everyone, covering WCAG guidelines, testing strategies, and implementation best practices.",
    content: `
      <h2>Introduction</h2>
      <p>Web accessibility ensures that websites and applications are usable by people with disabilities. This comprehensive guide covers everything you need to know to build inclusive web experiences.</p>
      
      <h2>Understanding WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) are organized around four principles:</p>
      
      <h3>1. Perceivable</h3>
      <ul>
        <li>Provide text alternatives for images</li>
        <li>Ensure sufficient color contrast</li>
        <li>Make content adaptable to different presentations</li>
      </ul>
      
      <h3>2. Operable</h3>
      <ul>
        <li>Make all functionality keyboard accessible</li>
        <li>Give users enough time to read content</li>
        <li>Don't use content that causes seizures</li>
      </ul>
      
      <h3>3. Understandable</h3>
      <ul>
        <li>Make text readable and understandable</li>
        <li>Make content appear and operate predictably</li>
        <li>Help users avoid and correct mistakes</li>
      </ul>
      
      <h3>4. Robust</h3>
      <ul>
        <li>Maximize compatibility with assistive technologies</li>
      </ul>
      
      <h2>Semantic HTML</h2>
      <p>Use semantic HTML elements to provide meaning and structure:</p>
      
      <pre><code>&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;Article Title&lt;/h1&gt;
    &lt;time datetime="2024-12-01"&gt;December 1, 2024&lt;/time&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;p&gt;Article content...&lt;/p&gt;
  &lt;/main&gt;
  
  &lt;aside&gt;
    &lt;h2&gt;Related Articles&lt;/h2&gt;
    &lt;nav aria-label="Related articles"&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="/article-1"&gt;Article 1&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/article-2"&gt;Article 2&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/aside&gt;
&lt;/article&gt;</code></pre>
      
      <h2>ARIA Attributes</h2>
      <p>Use ARIA attributes to enhance accessibility when semantic HTML isn't enough:</p>
      
      <pre><code>&lt;button 
  aria-expanded="false" 
  aria-controls="menu"
  aria-haspopup="true"
&gt;
  Menu
&lt;/button&gt;

&lt;ul id="menu" role="menu" aria-hidden="true"&gt;
  &lt;li role="menuitem"&gt;&lt;a href="/home"&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li role="menuitem"&gt;&lt;a href="/about"&gt;About&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
      
      <h2>Keyboard Navigation</h2>
      <p>Ensure all interactive elements are keyboard accessible:</p>
      
      <pre><code>// Custom component with keyboard support
const CustomButton = ({ onClick, children }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }
  
  return (
    &lt;div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="custom-button"
    &gt;
      {children}
    &lt;/div&gt;
  )
}</code></pre>
      
      <h2>Color and Contrast</h2>
      <p>Ensure sufficient color contrast and don't rely solely on color:</p>
      
      <pre><code>/* Good: High contrast and additional indicators */
.error {
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}

.error::before {
  content: "⚠ ";
  font-weight: bold;
}</code></pre>
      
      <h2>Testing for Accessibility</h2>
      <p>Use these tools and techniques to test accessibility:</p>
      
      <h3>Automated Testing</h3>
      <pre><code>// Using @axe-core/react
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  const { container } = render(&lt;MyComponent /&gt;)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})</code></pre>
      
      <h3>Manual Testing</h3>
      <ul>
        <li>Navigate using only the keyboard</li>
        <li>Test with screen readers (NVDA, JAWS, VoiceOver)</li>
        <li>Check color contrast ratios</li>
        <li>Verify focus indicators are visible</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building accessible web applications is not just about compliance—it's about creating inclusive experiences for all users. Start with semantic HTML, add ARIA where needed, and test regularly with both automated tools and real users.</p>
    `,
    author: "John Doe",
    publishedAt: "Nov 20, 2024",
    readTime: "12 min read",
    category: "Web Development",
    tags: ["Accessibility", "WCAG", "Inclusive Design", "ARIA", "Testing"],
    image: "/web-accessibility.png",
  },
  {
    slug: "api-design-best-practices",
    title: "RESTful API Design: Best Practices and Common Pitfalls",
    excerpt:
      "Master the art of API design with proven patterns, versioning strategies, and error handling techniques that create developer-friendly interfaces.",
    content: `
      <h2>Introduction</h2>
      <p>Well-designed APIs are the backbone of modern applications. This guide covers best practices for creating RESTful APIs that are intuitive, maintainable, and scalable.</p>
      
      <h2>Resource Naming Conventions</h2>
      <p>Use clear, consistent naming patterns for your API endpoints:</p>
      
      <pre><code>// Good: Plural nouns for collections
GET /api/users
POST /api/users
GET /api/users/123
PUT /api/users/123
DELETE /api/users/123

// Good: Nested resources
GET /api/users/123/posts
POST /api/users/123/posts
GET /api/users/123/posts/456

// Avoid: Verbs in URLs
❌ GET /api/getUsers
❌ POST /api/createUser</code></pre>
      
      <h2>HTTP Status Codes</h2>
      <p>Use appropriate HTTP status codes to communicate the result of operations:</p>
      
      <pre><code>// Success responses
200 OK          // Successful GET, PUT, PATCH
201 Created     // Successful POST
204 No Content  // Successful DELETE

// Client error responses
400 Bad Request     // Invalid request data
401 Unauthorized    // Authentication required
403 Forbidden       // Access denied
404 Not Found       // Resource doesn't exist
409 Conflict        // Resource conflict
422 Unprocessable   // Validation errors

// Server error responses
500 Internal Server Error
503 Service Unavailable</code></pre>
      
      <h2>Request and Response Structure</h2>
      <p>Design consistent request and response formats:</p>
      
      <pre><code>// Consistent response structure
{
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2024-12-01T10:00:00Z",
    "version": "1.0"
  }
}

// Error response structure
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-12-01T10:00:00Z",
    "request_id": "req_123456"
  }
}</code></pre>
      
      <h2>Pagination</h2>
      <p>Implement consistent pagination for large datasets:</p>
      
      <pre><code>// Cursor-based pagination (recommended)
GET /api/users?cursor=eyJpZCI6MTIzfQ&limit=20

{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTQzfQ",
    "has_more": true,
    "limit": 20
  }
}

// Offset-based pagination
GET /api/users?page=2&limit=20

{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 1000,
    "total_pages": 50
  }
}</code></pre>
      
      <h2>Filtering and Sorting</h2>
      <p>Provide flexible filtering and sorting options:</p>
      
      <pre><code>// Filtering
GET /api/users?status=active&role=admin&created_after=2024-01-01

// Sorting
GET /api/users?sort=created_at&order=desc
GET /api/users?sort=name,created_at&order=asc,desc

// Complex queries
GET /api/users?filter[status]=active&filter[role][in]=admin,moderator</code></pre>
      
      <h2>API Versioning</h2>
      <p>Plan for API evolution with proper versioning:</p>
      
      <pre><code>// URL versioning (most common)
GET /api/v1/users
GET /api/v2/users

// Header versioning
GET /api/users
Accept: application/vnd.api+json;version=1

// Query parameter versioning
GET /api/users?version=1</code></pre>
      
      <h2>Rate Limiting</h2>
      <p>Implement rate limiting to protect your API:</p>
      
      <pre><code>// Rate limit headers
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200

// Rate limit exceeded response
HTTP/1.1 429 Too Many Requests
Retry-After: 3600

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Try again in 1 hour."
  }
}</code></pre>
      
      <h2>Security Best Practices</h2>
      <p>Implement security measures to protect your API:</p>
      
      <pre><code>// Authentication header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// CORS headers
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization

// Security headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block</code></pre>
      
      <h2>Documentation</h2>
      <p>Provide comprehensive API documentation:</p>
      
      <pre><code>// OpenAPI/Swagger specification
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'</code></pre>
      
      <h2>Conclusion</h2>
      <p>Great API design is about consistency, predictability, and developer experience. Follow these best practices to create APIs that are easy to use, maintain, and scale. Remember to version your APIs, document thoroughly, and gather feedback from developers using your API.</p>
    `,
    author: "John Doe",
    publishedAt: "Nov 15, 2024",
    readTime: "9 min read",
    category: "Backend",
    tags: ["API Design", "REST", "Backend", "Best Practices", "Documentation"],
    image: "/api-design-patterns-docs.png",
  },
]
