-- ============================================================================
-- 🧠 UNIVERSAL HYPERFIXATION FRAMEWORK
-- Supabase Database Schema
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE domain_category AS ENUM (
  'creative',
  'technical',
  'physical',
  'intellectual',
  'social',
  'entrepreneurial',
  'digital_creative',
  'collecting',
  'gaming',
  'wellness'
);

CREATE TYPE lifecycle_phase AS ENUM (
  'discovery',
  'deep_dive',
  'mastery',
  'integration',
  'transition',
  'dormant',
  'archived'
);

CREATE TYPE domain_status AS ENUM (
  'active',
  'dormant',
  'archived'
);

CREATE TYPE passion_trend AS ENUM (
  'rising',
  'stable',
  'declining'
);

CREATE TYPE time_of_day AS ENUM (
  'morning',
  'afternoon',
  'evening',
  'night'
);

CREATE TYPE community_platform AS ENUM (
  'discord',
  'reddit',
  'twitter',
  'instagram',
  'youtube',
  'facebook',
  'meetup',
  'slack',
  'forum',
  'local_group',
  'other'
);

CREATE TYPE tool_type AS ENUM (
  'physical',
  'software',
  'subscription',
  'service'
);

CREATE TYPE tool_status AS ENUM (
  'owned',
  'wishlisted',
  'considering',
  'sold'
);

CREATE TYPE command_pattern AS ENUM (
  'research', 'learn', 'study', 'explore',
  'practice', 'create', 'experiment', 'iterate',
  'track', 'document', 'measure', 'reflect',
  'schedule', 'block', 'plan', 'optimize',
  'connect', 'share', 'collaborate', 'teach',
  'compare', 'budget', 'organize', 'acquire',
  'transition', 'bridge', 'combine', 'archive',
  'analyze', 'predict', 'recommend', 'discover'
);

CREATE TYPE connection_type AS ENUM (
  'skill_transfer',
  'conceptual_overlap',
  'tool_sharing',
  'community_overlap',
  'creative_fusion',
  'career_synergy',
  'methodology_match',
  'aesthetic_harmony'
);

CREATE TYPE card_archetype AS ENUM (
  'obsession_command_center',
  'knowledge_hub',
  'practice_tracker',
  'resource_manager',
  'community_finder',
  'progress_visualizer',
  'cross_pollination',
  'memory_palace',
  'workflow_hub',
  'passion_thermometer'
);

CREATE TYPE detection_signal_type AS ENUM (
  'explicit_statement',
  'calendar_pattern',
  'research_pattern',
  'purchase_history',
  'community_joining',
  'time_allocation',
  'voice_command_theme',
  'project_creation'
);

-- ============================================================================
-- USER PROFILES
-- ============================================================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Personal
  name TEXT,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  locale TEXT NOT NULL DEFAULT 'en-US',

  -- Cognitive profile
  attention_span TEXT CHECK (attention_span IN ('short', 'medium', 'long', 'variable')),
  energy_pattern TEXT CHECK (energy_pattern IN ('morning_person', 'night_owl', 'afternoon_peak', 'variable')),
  learning_styles TEXT[], -- array of 'visual', 'auditory', 'kinesthetic', 'reading'
  focus_mode TEXT CHECK (focus_mode IN ('pomodoro', 'hyperfocus', 'flexible')),

  -- Preferences
  voice_commands_enabled BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  celebration_style TEXT CHECK (celebration_style IN ('minimal', 'moderate', 'maximal')) DEFAULT 'moderate',
  privacy_level TEXT CHECK (privacy_level IN ('open', 'selective', 'private')) DEFAULT 'selective',
  gamification_enabled BOOLEAN DEFAULT true,

  -- Stats
  total_domains_explored INTEGER DEFAULT 0,
  total_hours_tracked NUMERIC DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- HYPERFIXATION DOMAINS
-- ============================================================================

CREATE TABLE hyperfixation_domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Basic info
  name TEXT NOT NULL,
  category domain_category NOT NULL,
  status domain_status NOT NULL DEFAULT 'active',
  tags TEXT[] DEFAULT '{}',
  notes TEXT,

  -- Intensity & Engagement
  intensity_score NUMERIC CHECK (intensity_score >= 0 AND intensity_score <= 100),
  passion_current NUMERIC CHECK (passion_current >= 0 AND passion_current <= 100),
  passion_peak NUMERIC CHECK (passion_peak >= 0 AND passion_peak <= 100),
  passion_trend passion_trend,

  -- Lifecycle
  current_phase lifecycle_phase NOT NULL DEFAULT 'discovery',
  discovery_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_active_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estimated_transition_date TIMESTAMP WITH TIME ZONE,

  -- Time patterns (stored as JSONB for flexibility)
  time_patterns JSONB DEFAULT '{
    "totalHoursInvested": 0,
    "averageSessionLength": 0,
    "sessionsPerWeek": 0,
    "preferredTimeOfDay": [],
    "peakProductivityHour": null
  }'::jsonb,

  -- Resource investment (stored as JSONB)
  resource_investment JSONB DEFAULT '{
    "monetary": {"totalSpent": 0, "currency": "USD", "breakdown": {}},
    "temporal": {"totalHours": 0, "activeHours": 0, "passiveHours": 0, "weeklyAverage": 0},
    "physical": null,
    "digital": null,
    "cognitive": {"deepWorkHours": 0, "flowStateFrequency": 0, "cognitiveLoadRating": 3}
  }'::jsonb,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, name)
);

-- Index for quick lookups
CREATE INDEX idx_domains_user_status ON hyperfixation_domains(user_id, status);
CREATE INDEX idx_domains_user_phase ON hyperfixation_domains(user_id, current_phase);
CREATE INDEX idx_domains_category ON hyperfixation_domains(category);

-- ============================================================================
-- LEARNING PATHWAYS
-- ============================================================================

CREATE TABLE learning_pathways (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  current_level TEXT CHECK (current_level IN ('novice', 'beginner', 'intermediate', 'advanced', 'expert')),
  progress_percentage NUMERIC CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  current_stage_index INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE learning_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pathway_id UUID REFERENCES learning_pathways(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  estimated_hours NUMERIC,

  status TEXT CHECK (status IN ('locked', 'available', 'in_progress', 'completed')) DEFAULT 'locked',
  completed_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SKILLS
-- ============================================================================

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  category TEXT,

  proficiency_level NUMERIC CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
  transferable BOOLEAN DEFAULT false,

  acquired_date TIMESTAMP WITH TIME ZONE,
  last_practiced TIMESTAMP WITH TIME ZONE,
  practice_frequency TEXT CHECK (practice_frequency IN ('daily', 'weekly', 'monthly', 'rarely')),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many: skills can apply to multiple domains
CREATE TABLE skill_domain_relations (
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  related_domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,
  PRIMARY KEY (skill_id, related_domain_id)
);

CREATE INDEX idx_skills_domain ON skills(domain_id);

-- ============================================================================
-- MILESTONES
-- ============================================================================

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('learning', 'creation', 'achievement', 'social', 'financial')),

  achieved_at TIMESTAMP WITH TIME ZONE,
  celebration_level TEXT CHECK (celebration_level IN ('minor', 'major', 'epic')) DEFAULT 'minor',

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_milestones_domain ON milestones(domain_id);

-- ============================================================================
-- RESOURCES
-- ============================================================================

CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  type TEXT CHECK (type IN ('video', 'article', 'course', 'book', 'tutorial', 'tool', 'community')),
  title TEXT NOT NULL,
  url TEXT,
  author TEXT,
  cost NUMERIC,
  estimated_time INTEGER, -- in minutes

  priority TEXT CHECK (priority IN ('critical', 'high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('saved', 'in_progress', 'completed', 'abandoned')) DEFAULT 'saved',

  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  completed_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_resources_domain_status ON resources(domain_id, status);

-- ============================================================================
-- COMMUNITY CONNECTIONS
-- ============================================================================

CREATE TABLE community_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  platform community_platform NOT NULL,
  name TEXT NOT NULL,
  url TEXT,

  member_count INTEGER,
  activity_level TEXT CHECK (activity_level IN ('low', 'medium', 'high', 'very_high')),
  relevance_score NUMERIC CHECK (relevance_score >= 0 AND relevance_score <= 100),

  joined_at TIMESTAMP WITH TIME ZONE,
  last_interaction TIMESTAMP WITH TIME ZONE,
  contribution_level TEXT CHECK (contribution_level IN ('lurker', 'occasional', 'active', 'leader')) DEFAULT 'lurker',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_communities_domain ON community_connections(domain_id);

-- ============================================================================
-- EXPERTS
-- ============================================================================

CREATE TABLE experts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  domain_name TEXT,
  expertise TEXT[],

  platforms JSONB, -- array of {platform, handle, url}

  followed_since TIMESTAMP WITH TIME ZONE,
  interaction_level TEXT CHECK (interaction_level IN ('following', 'engaging', 'mentoring')) DEFAULT 'following',

  notable_work TEXT[],
  contact_info TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_experts_domain ON experts(domain_id);

-- ============================================================================
-- TOOLS & EQUIPMENT
-- ============================================================================

CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  primary_domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE SET NULL,

  name TEXT NOT NULL,
  type tool_type NOT NULL,
  category TEXT,

  -- Ownership
  status tool_status NOT NULL DEFAULT 'wishlisted',
  acquired_date TIMESTAMP WITH TIME ZONE,
  purchase_price NUMERIC,
  current_value NUMERIC,

  -- Usage
  usage_frequency TEXT CHECK (usage_frequency IN ('daily', 'weekly', 'monthly', 'rarely', 'never')),
  last_used TIMESTAMP WITH TIME ZONE,
  hours_used NUMERIC,

  -- Details
  brand TEXT,
  model TEXT,
  location TEXT,
  condition TEXT CHECK (condition IN ('new', 'good', 'fair', 'poor')),
  maintenance_needed BOOLEAN DEFAULT false,

  -- Metadata
  url TEXT,
  notes TEXT,
  image_url TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many: tools can be used in multiple domains
CREATE TABLE tool_domain_relations (
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, domain_id)
);

CREATE INDEX idx_tools_user ON tools(user_id);
CREATE INDEX idx_tools_status ON tools(status);

-- ============================================================================
-- SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE SET NULL,

  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('software', 'membership', 'course', 'community', 'other')),

  cost NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly', 'lifetime')),

  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  next_billing_date TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,

  auto_renew BOOLEAN DEFAULT true,
  worth_it BOOLEAN,

  url TEXT,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_active ON subscriptions(user_id, cancelled_at) WHERE cancelled_at IS NULL;

-- ============================================================================
-- UNIVERSAL COMMANDS
-- ============================================================================

CREATE TABLE universal_commands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  pattern command_pattern NOT NULL,
  intent TEXT NOT NULL,

  -- Natural language examples
  example_phrases TEXT[],
  aliases TEXT[],

  -- Execution
  action_type TEXT NOT NULL,
  parameters JSONB DEFAULT '[]'::jsonb,

  -- Usage stats
  execution_count INTEGER DEFAULT 0,
  last_executed TIMESTAMP WITH TIME ZONE,
  success_rate NUMERIC CHECK (success_rate >= 0 AND success_rate <= 100),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE command_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  command_id UUID REFERENCES universal_commands(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE SET NULL,

  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  raw_input TEXT NOT NULL,
  parsed_parameters JSONB,

  result TEXT CHECK (result IN ('success', 'partial', 'failed')),
  error TEXT,
  duration_ms INTEGER
);

CREATE INDEX idx_command_executions_command ON command_executions(command_id);
CREATE INDEX idx_command_executions_domain ON command_executions(domain_id);

-- ============================================================================
-- DYNAMIC CARDS
-- ============================================================================

CREATE TABLE dynamic_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  archetype card_archetype NOT NULL,

  -- Current configuration (JSONB for flexibility)
  current_config JSONB NOT NULL,

  -- Lifecycle awareness
  relevant_in_phases lifecycle_phase[],
  priority_by_phase JSONB, -- {discovery: 90, deep_dive: 70, ...}

  -- Data & visualization
  data_source TEXT,
  update_frequency TEXT CHECK (update_frequency IN ('realtime', 'minute', 'hour', 'daily')),
  visualization_type TEXT,

  enabled BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_dynamic_cards_user ON dynamic_cards(user_id);

-- ============================================================================
-- KNOWLEDGE GRAPH (Cross-domain connections)
-- ============================================================================

CREATE TABLE knowledge_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  domain_a_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,
  domain_b_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  connection_type connection_type NOT NULL,
  strength NUMERIC CHECK (strength >= 0 AND strength <= 100),

  -- Insights
  insights TEXT[],
  transferable_skills TEXT[],
  combination_opportunities TEXT[],
  synergies TEXT[],

  -- Discovery
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  discovery_method TEXT CHECK (discovery_method IN ('user_identified', 'ai_suggested', 'pattern_detected')),
  last_reinforced_at TIMESTAMP WITH TIME ZONE,
  reinforcement_count INTEGER DEFAULT 0,

  -- Career implications
  career_opportunities TEXT[],
  market_differentiation TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CHECK (domain_a_id != domain_b_id)
);

CREATE INDEX idx_knowledge_connections_user ON knowledge_connections(user_id);
CREATE INDEX idx_knowledge_connections_domains ON knowledge_connections(domain_a_id, domain_b_id);

-- ============================================================================
-- WORKFLOWS
-- ============================================================================

CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  applicable_domains UUID[], -- array of domain IDs
  applicable_phases lifecycle_phase[],

  trigger JSONB NOT NULL, -- {type, config}
  steps JSONB NOT NULL, -- array of workflow steps

  enabled BOOLEAN DEFAULT true,

  -- Stats
  execution_count INTEGER DEFAULT 0,
  average_duration NUMERIC, -- in seconds
  success_rate NUMERIC CHECK (success_rate >= 0 AND success_rate <= 100),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workflows_user ON workflows(user_id);

-- ============================================================================
-- INTEGRATIONS
-- ============================================================================

CREATE TABLE integration_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('api', 'webhook', 'oauth', 'zapier', 'native')),

  applicable_domains UUID[],
  use_case TEXT,
  benefits TEXT[],

  priority NUMERIC CHECK (priority >= 0 AND priority <= 100),
  setup_complexity TEXT CHECK (setup_complexity IN ('easy', 'moderate', 'complex')),
  estimated_setup_time INTEGER, -- in minutes

  requires_subscription BOOLEAN DEFAULT false,
  cost JSONB, -- {amount, currency, billingCycle}

  status TEXT CHECK (status IN ('suggested', 'exploring', 'connected', 'paused', 'disconnected')) DEFAULT 'suggested',
  connected_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  suggestion_id UUID REFERENCES integration_suggestions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  type TEXT NOT NULL,

  credentials JSONB, -- Encrypted sensitive data
  config JSONB,

  connected BOOLEAN DEFAULT true,
  last_synced TIMESTAMP WITH TIME ZONE,
  sync_frequency TEXT,

  usage_stats JSONB DEFAULT '{
    "apiCallsThisMonth": 0,
    "dataPointsSynced": 0,
    "errors": 0
  }'::jsonb,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_integrations_user ON integrations(user_id);

-- ============================================================================
-- NEXT STEPS & RECOMMENDATIONS
-- ============================================================================

CREATE TABLE next_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  type TEXT CHECK (type IN ('learning', 'practice', 'creation', 'social', 'administrative')),
  title TEXT NOT NULL,
  description TEXT,

  priority TEXT CHECK (priority IN ('critical', 'high', 'medium', 'low')) DEFAULT 'medium',
  estimated_time INTEGER, -- in minutes
  estimated_cost NUMERIC,

  reasoning TEXT,
  expected_benefit TEXT,

  status TEXT CHECK (status IN ('suggested', 'accepted', 'in_progress', 'completed', 'dismissed')) DEFAULT 'suggested',
  dismissed_reason TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_next_steps_domain_status ON next_steps(domain_id, status);

-- ============================================================================
-- DOMAIN DETECTION
-- ============================================================================

CREATE TABLE domain_detection_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE SET NULL,

  type detection_signal_type NOT NULL,
  content TEXT NOT NULL,
  confidence NUMERIC CHECK (confidence >= 0 AND confidence <= 100),
  source TEXT,

  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE onboarding_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES hyperfixation_domains(id) ON DELETE CASCADE,

  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  stage TEXT CHECK (stage IN ('detection', 'classification', 'assessment', 'setup', 'completed')) DEFAULT 'detection',
  responses JSONB DEFAULT '[]'::jsonb,
  confidence NUMERIC CHECK (confidence >= 0 AND confidence <= 100)
);

CREATE INDEX idx_onboarding_user ON onboarding_sessions(user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_domains_updated_at BEFORE UPDATE ON hyperfixation_domains
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hyperfixation_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE universal_commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE command_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_detection_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_sessions ENABLE ROW LEVEL SECURITY;

-- Example policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can view own domains" ON hyperfixation_domains
  FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));

-- Add similar policies for other tables...

-- ============================================================================
-- SEED DATA (Example)
-- ============================================================================

-- Add example command patterns
-- INSERT INTO universal_commands (pattern, intent, example_phrases, aliases, action_type)
-- VALUES
--   ('research', 'resource_research',
--    ARRAY['Research pottery glazing techniques for 2 hours', 'Research DeFi protocols for 2 hours'],
--    ARRAY['study', 'investigate', 'explore'],
--    'research_task');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
