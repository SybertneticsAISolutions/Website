# Supabase Migration Guide

## Overview

This document outlines the migration from Firebase to Supabase for the Sybertnetics website. Supabase provides a more robust, PostgreSQL-based backend with better performance and developer experience.

## Migration Benefits

- **PostgreSQL Database**: More powerful than Firestore with SQL capabilities
- **Real-time Subscriptions**: Built-in real-time functionality
- **Row Level Security**: Advanced security policies
- **Better Performance**: Optimized for complex queries
- **Open Source**: More control and transparency
- **Cost Effective**: Better pricing for production workloads

## Migration Steps

### 1. Supabase Project Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project: `sybertnetics-website`
   - Choose region closest to your users
   - Set up database password

2. **Get Project Credentials**
   - Project Settings > API
   - Copy Project URL and anon/public key
   - Copy service_role key (for admin operations)

### 2. Database Schema Setup

Create the following tables in Supabase:

```sql
-- Contact Messages Table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Beta Signups Table
CREATE TABLE beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  company TEXT,
  use_case TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Signups Table
CREATE TABLE newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (for authentication)
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read on contact_messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert on beta_signups" ON beta_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read on beta_signups" ON beta_signups
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert on newsletter_signups" ON newsletter_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read on newsletter_signups" ON newsletter_signups
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 3. Environment Variables

Update your `.env.local` file:

```env
# Supabase Configuration (Primary)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Firebase Configuration (Legacy - can be removed after migration)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Admin credentials
ADMIN_EMAIL=admin@sybertnetics.com
ADMIN_PASSWORD=your_secure_password_here

# Discord Bot Configuration
DISCORD_GUILD_ID=your_discord_server_id_here
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```

### 4. Code Migration

#### Update API Routes

Replace Firebase API routes with Supabase:

```typescript
// app/api/contact/route.ts
import { contactOperations } from '@/utils/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await contactOperations.submitContact(body)
    return Response.json({ success: true, data: result })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
```

#### Update Admin Authentication

Replace Firebase Auth with Supabase Auth:

```typescript
// utils/supabase-auth.ts
import { supabase } from './supabase'

export const authOperations = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}
```

### 5. Data Migration

If you have existing data in Firebase:

1. **Export Firebase Data**
   ```bash
   # Use Firebase CLI to export data
   firebase firestore:export ./firebase-export
   ```

2. **Transform Data**
   - Convert Firestore documents to SQL format
   - Handle data type conversions
   - Update timestamps format

3. **Import to Supabase**
   ```sql
   -- Use Supabase SQL editor or pgAdmin
   INSERT INTO contact_messages (name, email, company, message, created_at)
   VALUES (...);
   ```

### 6. Testing

1. **Local Testing**
   ```bash
   npm run dev
   # Test all forms and admin functionality
   ```

2. **Production Testing**
   - Deploy to staging environment
   - Test all functionality
   - Verify data integrity

### 7. Deployment

1. **Update Netlify Environment Variables**
   - Add Supabase credentials to Netlify dashboard
   - Remove Firebase variables (after testing)

2. **Update Build Process**
   - Ensure Supabase client is properly bundled
   - Test production build

## Rollback Plan

If issues arise during migration:

1. **Keep Firebase Configuration**
   - Maintain Firebase credentials during transition
   - Keep Firebase API routes as fallback

2. **Feature Flags**
   - Use environment variables to switch between Firebase/Supabase
   - Gradual migration per feature

3. **Data Backup**
   - Regular backups of both Firebase and Supabase
   - Export scripts for quick rollback

## Post-Migration Tasks

1. **Remove Firebase Dependencies**
   ```bash
   npm uninstall firebase firebase-admin
   ```

2. **Update Documentation**
   - Update deployment guides
   - Update API documentation
   - Update admin setup instructions

3. **Performance Monitoring**
   - Monitor Supabase performance
   - Set up alerts for database issues
   - Track query performance

## Security Considerations

1. **Row Level Security**
   - Implement proper RLS policies
   - Test security policies thoroughly
   - Regular security audits

2. **API Keys**
   - Rotate keys regularly
   - Use environment variables
   - Monitor key usage

3. **Data Privacy**
   - Ensure GDPR compliance
   - Implement data retention policies
   - Regular privacy audits

## Support

- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Community**: [github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Discord**: [discord.supabase.com](https://discord.supabase.com)

## Migration Checklist

- [ ] Create Supabase project
- [ ] Set up database schema
- [ ] Configure environment variables
- [ ] Update API routes
- [ ] Update authentication
- [ ] Migrate existing data
- [ ] Test locally
- [ ] Test in staging
- [ ] Deploy to production
- [ ] Monitor performance
- [ ] Remove Firebase dependencies
- [ ] Update documentation 