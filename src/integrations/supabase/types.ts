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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          scheduled_date: string
          status: Database["public"]["Enums"]["appointment_status"]
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          scheduled_date: string
          status?: Database["public"]["Enums"]["appointment_status"]
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          scheduled_date?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      epis: {
        Row: {
          created_at: string | null
          expiry_date: string
          id: string
          issue_date: string
          name: string
          signature_url: string | null
          signed_at: string | null
          status: Database["public"]["Enums"]["epi_status"]
          term_url: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expiry_date: string
          id?: string
          issue_date: string
          name: string
          signature_url?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["epi_status"]
          term_url?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expiry_date?: string
          id?: string
          issue_date?: string
          name?: string
          signature_url?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["epi_status"]
          term_url?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      exams: {
        Row: {
          created_at: string | null
          id: string
          name: string
          result_url: string | null
          scheduled_date: string | null
          status: Database["public"]["Enums"]["exam_status"]
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          result_url?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["exam_status"]
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          result_url?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["exam_status"]
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      procedures: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          document_url: string | null
          effective_date: string
          id: string
          name: string
          review_date: string | null
          status: string
          version: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          document_url?: string | null
          effective_date: string
          id?: string
          name: string
          review_date?: string | null
          status?: string
          version: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          document_url?: string | null
          effective_date?: string
          id?: string
          name?: string
          review_date?: string | null
          status?: string
          version?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string
          cpf: string
          created_at: string | null
          full_name: string
          id: string
          position: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company: string
          cpf: string
          created_at?: string | null
          full_name: string
          id: string
          position: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string
          cpf?: string
          created_at?: string | null
          full_name?: string
          id?: string
          position?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      telemedicine_slots: {
        Row: {
          available: boolean | null
          created_at: string | null
          date: string
          id: string
          time: string
          user_id: string | null
        }
        Insert: {
          available?: boolean | null
          created_at?: string | null
          date: string
          id?: string
          time: string
          user_id?: string | null
        }
        Update: {
          available?: boolean | null
          created_at?: string | null
          date?: string
          id?: string
          time?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trainings: {
        Row: {
          category: string
          certificate_url: string | null
          created_at: string | null
          due_date: string
          duration: number
          id: string
          name: string
          scheduled_time: string | null
          status: Database["public"]["Enums"]["training_status"]
          user_id: string
        }
        Insert: {
          category: string
          certificate_url?: string | null
          created_at?: string | null
          due_date: string
          duration: number
          id?: string
          name: string
          scheduled_time?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          user_id: string
        }
        Update: {
          category?: string
          certificate_url?: string | null
          created_at?: string | null
          due_date?: string
          duration?: number
          id?: string
          name?: string
          scheduled_time?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "manager"
      appointment_status: "scheduled" | "confirmed" | "completed" | "cancelled"
      epi_status: "active" | "expired" | "pending_signature"
      exam_status: "pending" | "scheduled" | "completed" | "cancelled"
      training_status: "not_started" | "in_progress" | "completed" | "expired"
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
    Enums: {
      app_role: ["admin", "user", "manager"],
      appointment_status: ["scheduled", "confirmed", "completed", "cancelled"],
      epi_status: ["active", "expired", "pending_signature"],
      exam_status: ["pending", "scheduled", "completed", "cancelled"],
      training_status: ["not_started", "in_progress", "completed", "expired"],
    },
  },
} as const
