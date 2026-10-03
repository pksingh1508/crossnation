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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      eu_admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      eu_blog: {
        Row: {
          author_name: string | null
          comments_count: number
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_alt: string | null
          image_height: number | null
          image_url: string | null
          image_width: number | null
          legacy_id: string | null
          likes_count: number
          published_at: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["eu_content_status"]
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          comments_count?: number
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          likes_count?: number
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["eu_content_status"]
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          comments_count?: number
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          likes_count?: number
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["eu_content_status"]
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      eu_news: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_alt: string | null
          image_height: number | null
          image_url: string | null
          image_width: number | null
          legacy_id: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["eu_content_status"]
          tags: string[]
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["eu_content_status"]
          tags?: string[]
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["eu_content_status"]
          tags?: string[]
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      eu_success_stories: {
        Row: {
          created_at: string
          id: string
          image_alt: string | null
          image_height: number | null
          image_url: string | null
          image_width: number | null
          legacy_id: string | null
          name: string
          published_at: string | null
          status: Database["public"]["Enums"]["eu_content_status"]
          story: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          name: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          story?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          name?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          story?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      eu_testimonials: {
        Row: {
          created_at: string
          id: string
          image_alt: string | null
          image_height: number | null
          image_url: string | null
          image_width: number | null
          legacy_id: string | null
          name: string
          published_at: string | null
          quote: string | null
          status: Database["public"]["Enums"]["eu_content_status"]
          updated_at: string
          views_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          name: string
          published_at?: string | null
          quote?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          updated_at?: string
          views_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string | null
          image_width?: number | null
          legacy_id?: string | null
          name?: string
          published_at?: string | null
          quote?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      eu_visa_stamps: {
        Row: {
          caption: string | null
          country: string | null
          created_at: string
          id: string
          image_alt: string | null
          image_height: number | null
          image_url: string
          image_width: number | null
          legacy_id: string | null
          published_at: string | null
          status: Database["public"]["Enums"]["eu_content_status"]
          updated_at: string
        }
        Insert: {
          caption?: string | null
          country?: string | null
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url: string
          image_width?: number | null
          legacy_id?: string | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          updated_at?: string
        }
        Update: {
          caption?: string | null
          country?: string | null
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string
          image_width?: number | null
          legacy_id?: string | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      eu_work_permits: {
        Row: {
          caption: string | null
          country: string | null
          created_at: string
          id: string
          image_alt: string | null
          image_height: number | null
          image_url: string
          image_width: number | null
          legacy_id: string | null
          published_at: string | null
          status: Database["public"]["Enums"]["eu_content_status"]
          updated_at: string
        }
        Insert: {
          caption?: string | null
          country?: string | null
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url: string
          image_width?: number | null
          legacy_id?: string | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          updated_at?: string
        }
        Update: {
          caption?: string | null
          country?: string | null
          created_at?: string
          id?: string
          image_alt?: string | null
          image_height?: number | null
          image_url?: string
          image_width?: number | null
          legacy_id?: string | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["eu_content_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      eu_content_status: "draft" | "published"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      eu_content_status: ["draft", "published"],
    },
  },
} as const
