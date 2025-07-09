# Admin Authentication System

## Overview
The admin authentication system provides secure access to the admin panel using Firebase Authentication with email-based authorization.

## Current Implementation

### Authentication Flow
1. **Login**: User authenticates via Firebase Auth at `/admin/login`
2. **Authorization**: Email-based admin checking with custom claims fallback
3. **Access Control**: AdminLayout enforces authorization for all admin routes

### Admin Users
Currently configured admin emails:
- `kaynenbpellegrino@sybertnetics.com`
- `kaynbpellegrino@sybertnetics.com`

### Key Components

#### `useAuth.ts` Hook
```typescript
// Features:
- Firebase Authentication state management
- Email-based admin checking via ADMIN_EMAILS array
- Custom claims fallback (when Cloud Functions work)
- Comprehensive logging for debugging

// Returns:
- user: Firebase User object or null
- loading: boolean
- isAdmin: boolean
```

#### `AdminLayout.tsx` Component
```typescript
// Features:
- Route protection for all admin pages
- Admin authorization enforcement
- Graceful access denied UI
- Automatic logout functionality

// Access Control:
- Redirects unauthenticated users to /admin/login
- Shows access denied for non-admin users
- Provides clear feedback with user email
```

### Security Features

#### Email-Based Authorization
- **Primary Method**: Hardcoded admin emails in `ADMIN_EMAILS` array
- **Fallback**: Custom claims when Cloud Functions are accessible
- **Benefits**: Works immediately without external dependencies

#### Custom Claims (Future)
- **Firebase Admin SDK**: Sets `admin: true` and `role: "admin"` claims
- **Cloud Function**: `setAdminClaims` (currently blocked by hosting)
- **Advantage**: More secure, centrally managed

### Admin Panel Access

#### Login Process
1. Navigate to `/admin/login`
2. Enter admin email and password
3. Firebase Authentication validates credentials
4. `useAuth` hook checks admin status
5. Redirect to admin dashboard or show access denied

#### Protected Routes
All routes under `/admin/*` are protected:
- `/admin` - Dashboard
- `/admin/content` - Content Management
- `/admin/careers` - Job Postings
- `/admin/blog` - Blog Management
- `/admin/news` - News Management
- `/admin/beta-signups` - Beta Signups
- `/admin/newsletter` - Newsletter Subscriptions

### Error Handling

#### Access Denied UI
```typescript
// Features:
- Clear error message
- Shows current user email
- Logout button for easy account switching
- Professional design consistent with admin theme
```

#### Debug Logging
- User authentication status
- Admin privilege status
- ID token claims (when available)
- Errors and fallbacks

### Configuration

#### Adding New Admin Users
1. **Immediate**: Add email to `ADMIN_EMAILS` array in `useAuth.ts`
2. **Future**: Use `setAdminClaims` Cloud Function when accessible

```typescript
const ADMIN_EMAILS = [
  'kaynenbpellegrino@sybertnetics.com',
  'kaynbpellegrino@sybertnetics.com',
  'new-admin@sybertnetics.com' // Add here
];
```

#### Environment Variables
```env
# Firebase configuration (already set)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

### Deployment Status

#### Current State
- ✅ **Deployed**: Firebase Hosting
- ✅ **Working**: Email-based admin authentication
- ✅ **Tested**: Login flow and access control
- 🟡 **Pending**: Custom claims (blocked by Cloud Function 403 errors)

#### Live URLs
- **Admin Login**: https://sybertnetics.com/admin/login
- **Admin Dashboard**: https://sybertnetics.com/admin

### Troubleshooting

#### Common Issues
1. **403 After Login**: Check if user email is in `ADMIN_EMAILS` array
2. **Infinite Redirect**: Clear browser cache and cookies
3. **Login Fails**: Verify Firebase Auth credentials in console

#### Debug Steps
1. Open browser developer tools
2. Check console logs for authentication status
3. Verify network requests to Firebase Auth
4. Check Firebase Console for user creation

### Future Improvements

#### Security Enhancements
- [ ] Implement custom claims when Cloud Functions accessible
- [ ] Add role-based permissions (editor, admin, super-admin)
- [ ] Implement session management and timeouts
- [ ] Add audit logging for admin actions

#### User Experience
- [ ] Remember me functionality
- [ ] Password reset flow
- [ ] Multi-factor authentication
- [ ] Admin user management interface

### Technical Notes

#### Why Email-Based Authorization?
Due to Firebase App Hosting experimental limitations, Cloud Functions return 403 errors, preventing custom claims from being set. Email-based authorization provides immediate functionality while maintaining security.

#### Migration Path
When Firebase App Hosting becomes production-ready:
1. Deploy `setAdminClaims` Cloud Function
2. Set custom claims for existing admin users
3. Update `useAuth.ts` to prioritize custom claims
4. Remove email-based fallback (optional)

---

**Status**: ✅ Production Ready
**Last Updated**: January 2024
**Version**: 1.0.0 