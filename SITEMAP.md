# Website Sitemap

## Main Pages
- `/` - Home page
- `/modules` - Course modules
- `/signup` - User registration
- `/signin` - User login
- `/profile` - User profile (requires authentication)
- `/urdu` - Urdu translation index
- `/urdu-chapter-1` - Urdu Chapter 1
- `/urdu-chapter-2` - Urdu Chapter 2
- `/urdu-chapter-3` - Urdu Chapter 3
- `/personalized` - Personalized book index (requires authentication)
- `/personalized-chapter-1` - Personalized Chapter 1 (requires authentication)
- `/personalized-chapter-2` - Personalized Chapter 2 (requires authentication)
- `/personalized-chapter-3` - Personalized Chapter 3 (requires authentication)
- `/auth` - Redirects to `/signin`

## Page Descriptions

### Authentication Pages
- `/signup` - Clean, responsive registration form with validation
- `/signin` - Secure login form with error handling
- `/profile` - User profile management with edit capabilities

### Urdu Translation Pages
- `/urdu` - Index page listing all translated chapters
- `/urdu-chapter-[id]` - Individual chapters with RTL support and proper Urdu formatting

### Personalized Content Pages
- `/personalized` - Index page for personalized book content
- `/personalized-chapter-[id]` - Individual chapters with personalization features (notes, highlights, images)

## Navigation Structure
- Top navbar contains links to all major sections
- Internal navigation between related pages
- Authentication-required pages properly protected
- Responsive design for all devices

## API Dependencies
All authenticated pages require the backend server running at:
- Authentication: `http://localhost:8000/api/auth/`
- Profile management: `http://localhost:8000/api/auth/profile`

## Error Handling
- Proper 404 handling for non-existent pages
- Graceful degradation when backend is unavailable
- Clear user feedback for all error states