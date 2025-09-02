# Supabase Authentication Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter a project name (e.g., "passionpath")
6. Enter a database password (save this securely)
7. Choose a region close to your users
8. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy your Project URL
3. Copy your `anon` public API key

## Step 3: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Configure Authentication Settings

1. In Supabase dashboard, go to Authentication → Settings
2. Under "Site URL", add your development URL (e.g., `http://localhost:5173`)
3. Under "Redirect URLs", add:
   - `http://localhost:5173/**`
   - `http://localhost:5173/auth/callback`

## Step 5: Enable Email Confirmation (Optional)

1. Go to Authentication → Settings
2. Toggle "Enable email confirmations" if you want users to verify their email
3. Customize email templates if desired

## Step 6: Test the Authentication

1. Start your development server: `npm run dev`
2. Click "Sign Up" in the navbar
3. Create a test account
4. Try signing in and out

## Features Implemented

✅ **User Registration**: Email/password signup with validation
✅ **User Login**: Email/password authentication
✅ **Session Management**: Automatic login state persistence
✅ **Protected Routes**: Results page requires authentication
✅ **User Interface**: Clean modal-based auth forms
✅ **Error Handling**: Form validation and error messages
✅ **Responsive Design**: Mobile-friendly authentication

## Security Features

- Password minimum length (6 characters)
- Email validation
- Secure session management
- Protected route access
- Automatic logout on route protection

## Next Steps

- Add password reset functionality
- Implement social authentication (Google, GitHub)
- Add user profile management
- Store user preferences in Supabase database
- Add email verification flow
