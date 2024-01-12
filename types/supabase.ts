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
      Category: {
        Row: {
          category_id: number
          name: string
        }
        Insert: {
          category_id?: number
          name: string
        }
        Update: {
          category_id?: number
          name?: string
        }
        Relationships: []
      }
      Events: {
        Row: {
          category: number | null
          created_at: string
          description: string | null
          event_id: number
          name: string
          timeStamp: string | null
          Venue: number
        }
        Insert: {
          category?: number | null
          created_at?: string
          description?: string | null
          event_id?: number
          name: string
          timeStamp?: string | null
          Venue: number
        }
        Update: {
          category?: number | null
          created_at?: string
          description?: string | null
          event_id?: number
          name?: string
          timeStamp?: string | null
          Venue?: number
        }
        Relationships: [
          {
            foreignKeyName: "Events_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "Events_Venue_fkey"
            columns: ["Venue"]
            isOneToOne: false
            referencedRelation: "Venues"
            referencedColumns: ["venue_id"]
          }
        ]
      }
      Newsletter: {
        Row: {
          email: string
          name: string
          newsLetter_id: number
        }
        Insert: {
          email?: string
          name?: string
          newsLetter_id?: number
        }
        Update: {
          email?: string
          name?: string
          newsLetter_id?: number
        }
        Relationships: []
      }
      PollAnswers: {
        Row: {
          answer: string
          answer_id: number
          poll_id: number
        }
        Insert: {
          answer: string
          answer_id?: number
          poll_id: number
        }
        Update: {
          answer?: string
          answer_id?: number
          poll_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "PollAnswers_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "Polls"
            referencedColumns: ["poll_id"]
          }
        ]
      }
      Polls: {
        Row: {
          poll_id: number
          question: string
        }
        Insert: {
          poll_id?: number
          question: string
        }
        Update: {
          poll_id?: number
          question?: string
        }
        Relationships: []
      }
      PollVotes: {
        Row: {
          answer_id: number
          vote_id: number
        }
        Insert: {
          answer_id: number
          vote_id?: number
        }
        Update: {
          answer_id?: number
          vote_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "PollVotes_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "PollAnswers"
            referencedColumns: ["answer_id"]
          }
        ]
      }
      Venues: {
        Row: {
          created_at: string
          name: string
          venue_id: number
        }
        Insert: {
          created_at?: string
          name: string
          venue_id?: number
        }
        Update: {
          created_at?: string
          name?: string
          venue_id?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
