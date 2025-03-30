
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          active: boolean;
          created_at: string;
          // Add other fields from your actual database schema
          expires_at: string | null;
          features: Json | null;
          message_limit: number | null;
          plan_id: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          active?: boolean | null;
          created_at?: string;
          expires_at?: string | null;
          features?: Json | null;
          id?: string;
          message_limit?: number | null;
          plan_id: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean | null;
          created_at?: string;
          expires_at?: string | null;
          features?: Json | null;
          id?: string;
          message_limit?: number | null;
          plan_id?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
      // Add other tables as needed
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
