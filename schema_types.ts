export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          district: string | null
          email: string
          id: string
          role: string
        }
        Insert: {
          district?: string | null
          email: string
          id?: string
          role: string
        }
        Update: {
          district?: string | null
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      advertisements: {
        Row: {
          click_url: string | null
          id: string
          interval_minutes: number | null
          is_active: boolean | null
          media_url: string
          timestamp: string | null
        }
        Insert: {
          click_url?: string | null
          id?: string
          interval_minutes?: number | null
          is_active?: boolean | null
          media_url: string
          timestamp?: string | null
        }
        Update: {
          click_url?: string | null
          id?: string
          interval_minutes?: number | null
          is_active?: boolean | null
          media_url?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          area: string | null
          author: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_breaking: boolean | null
          likes: number | null
          live_link: string | null
          status: string | null
          timestamp: string | null
          title: string
          type: string | null
          video_url: string | null
        }
        Insert: {
          area?: string | null
          author?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_breaking?: boolean | null
          likes?: number | null
          live_link?: string | null
          status?: string | null
          timestamp?: string | null
          title: string
          type?: string | null
          video_url?: string | null
        }
        Update: {
          area?: string | null
          author?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_breaking?: boolean | null
          likes?: number | null
          live_link?: string | null
          status?: string | null
          timestamp?: string | null
          title?: string
          type?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      news_likes: {
        Row: {
          created_at: string | null
          news_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          news_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          news_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_likes_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      shorts: {
        Row: {
          comments_count: number | null
          created_at: string
          duration: number | null
          id: string
          likes: number | null
          timestamp: string | null
          title: string
          video_url: string
        }
        Insert: {
          comments_count?: number | null
          created_at?: string
          duration?: number | null
          id?: string
          likes?: number | null
          timestamp?: string | null
          title: string
          video_url: string
        }
        Update: {
          comments_count?: number | null
          created_at?: string
          duration?: number | null
          id?: string
          likes?: number | null
          timestamp?: string | null
          title?: string
          video_url?: string
        }
        Relationships: []
      }
      shorts_comments: {
        Row: {
          comment_text: string
          created_at: string | null
          id: string
          short_id: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          comment_text: string
          created_at?: string | null
          id?: string
          short_id?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          comment_text?: string
          created_at?: string | null
          id?: string
          short_id?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shorts_comments_short_id_fkey"
            columns: ["short_id"]
            isOneToOne: false
            referencedRelation: "shorts"
            referencedColumns: ["id"]
          },
        ]
      }
      shorts_likes: {
        Row: {
          created_at: string | null
          short_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          short_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          short_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shorts_likes_short_id_fkey"
            columns: ["short_id"]
            isOneToOne: false
            referencedRelation: "shorts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_news_likes: { Args: { row_id: string }; Returns: undefined }
      decrement_shorts_likes: { Args: { row_id: string }; Returns: undefined }
      increment_news_likes: { Args: { row_id: string }; Returns: undefined }
      increment_shorts_likes: { Args: { row_id: string }; Returns: undefined }
      increment_shorts_views: { Args: { row_id: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
