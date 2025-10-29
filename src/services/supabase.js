import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to insert a new message
export const insertMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          name: messageData.name,
          email: messageData.email,
          subject: messageData.subject,
          message: messageData.message,
          created_at: new Date()
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting message:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error inserting message:', error)
    return { success: false, error }
  }
}

// Function to get all messages (for admin panel if needed)
export const getMessages = async () => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching messages:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching messages:', error)
    return { success: false, error }
  }
}

// Function to delete a message (for admin panel if needed)
export const deleteMessage = async (id) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting message:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error deleting message:', error)
    return { success: false, error }
  }
}