export interface Database {
  public: {
    Tables: {
      weir_profiles: { Row: WeirProfile; Insert: Omit<WeirProfile, 'id' | 'created_at'>; Update: Partial<WeirProfile> }
      weir_detections: { Row: WeirDetection; Insert: Omit<WeirDetection, 'id' | 'created_at'>; Update: Partial<WeirDetection> }
      weir_licenses: { Row: WeirLicense; Insert: Omit<WeirLicense, 'id' | 'created_at'>; Update: Partial<WeirLicense> }
      weir_earnings: { Row: WeirEarning; Insert: Omit<WeirEarning, 'id' | 'created_at'>; Update: Partial<WeirEarning> }
      weir_disputes: { Row: WeirDispute; Insert: Omit<WeirDispute, 'id' | 'created_at'>; Update: Partial<WeirDispute> }
    }
  }
}

export interface WeirProfile {
  id: string
  user_id: string
  display_name: string
  creator_type: 'athlete' | 'streamer' | 'influencer' | 'musician' | 'other'
  platforms: string[]
  monthly_cpm_target: number
  created_at: string
  deleted_at: string | null
}

export interface WeirDetection {
  id: string
  user_id: string
  platform: string
  url: string
  content_type: 'ad' | 'post' | 'video' | 'image'
  status: 'pending' | 'approved' | 'disputed' | 'monetized' | 'takedown'
  quality_score: number
  fraud_risk: 'low' | 'medium' | 'high'
  detected_at: string
  created_at: string
  deleted_at: string | null
}

export interface WeirLicense {
  id: string
  user_id: string
  name: string
  platform: string
  restriction_level: 'open' | 'commercial' | 'exclusive'
  cpm_rate: number
  duration_days: number
  active: boolean
  created_at: string
  deleted_at: string | null
}

export interface WeirEarning {
  id: string
  user_id: string
  platform: string
  detection_id: string | null
  amount: number
  cpm: number
  impressions: number
  period_start: string
  period_end: string
  created_at: string
  deleted_at: string | null
}

export interface WeirDispute {
  id: string
  user_id: string
  detection_id: string
  status: 'open' | 'submitted' | 'resolved' | 'closed'
  violation_type: string
  evidence_url: string
  notes: string
  created_at: string
  deleted_at: string | null
}
