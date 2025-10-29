# Supabase Setup Instructions

This document provides instructions on how to set up Supabase for the contact form messages functionality.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and create an account
2. Create a new project
3. Save your project URL and anon key for the .env file

## 2. Database Table Structure

Create the following table in your Supabase database:

### Messages Table

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Or create it through the Supabase dashboard with these columns:

| Column Name | Data Type | Required | Default Value |
|-------------|-----------|----------|---------------|
| id | int8 (Primary Key) | Yes | Auto increment |
| name | varchar | Yes | - |
| email | varchar | Yes | - |
| subject | varchar | Yes | - |
| message | text | Yes | - |
| created_at | timestamptz | Yes | now() |

## 3. Configure Environment Variables

Update your .env file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Set Up Row Level Security (RLS)

To ensure only your application can insert messages (but not read them without authentication), run these SQL commands in the Supabase SQL editor:

```sql
-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages
CREATE POLICY "Allow public insert" ON messages
FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read messages (optional - for admin panel)
CREATE POLICY "Allow read for authenticated users" ON messages
FOR SELECT USING (auth.role() = 'authenticated');
```

## 5. Testing

After setting up:
1. Update your .env file with your actual Supabase credentials
2. Run your development server
3. Test the contact form to ensure messages are being saved to the database

## 6. Optional: Create an Admin Panel

To view messages, you can create a simple admin panel or use the Supabase dashboard directly to view submitted messages.