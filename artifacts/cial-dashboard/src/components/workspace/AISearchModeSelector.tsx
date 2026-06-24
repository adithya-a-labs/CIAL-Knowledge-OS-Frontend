import { Building2, Folder, Layers } from 'lucide-react';
import type { AISearchMode } from '@/data/workspace/workspaceTypes';

const MODES: {
  value: AISearchMode;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
}[] = [
  {
    value: 'enterprise',
    icon: Building2,
    label: 'Enterprise Only',
    description: 'Search in central knowledge base',
  },
  {
    value: 'workspace',
    icon: Folder,
    label: 'My Workspace Only',
    description: 'Search in your personal workspace',
  },
  {
    value: 'hybrid',
    icon: Layers,
    label: 'Hybrid (Recommended)',
    description: 'Search in both enterprise and your workspace',
  },
];

interface AISearchModeSelectorProps {
  value: AISearchMode;
  onChange: (mode: AISearchMode) => void;
}

export default function AISearchModeSelector({ value, onChange }: AISearchModeSelectorProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-4" data-testid="ai-search-mode-selector">
      <h3 className="text-sm font-semibold text-[#1a2e14] mb-1">AI Search Mode</h3>
      <p className="text-xs text-[#5a7a52] mb-3">Choose what AI should search in</p>
      <div className="space-y-2">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const selected = value === mode.value;
          return (
            <button
              key={mode.value}
              onClick={() => onChange(mode.value)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all border ${
                selected
                  ? 'border-[#4a7c3f] bg-[#f0f7ed]'
                  : 'border-[#e2eedd] hover:border-[#b8d9b0] hover:bg-[#f8fdf6]'
              }`}
              data-testid={`mode-${mode.value}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? 'bg-[#4a7c3f] text-white' : 'bg-[#f0f7ed] text-[#5a7a52]'}`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${selected ? 'text-[#4a7c3f]' : 'text-[#1a2e14]'}`}>{mode.label}</p>
                <p className="text-[10px] text-[#5a7a52] leading-tight">{mode.description}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${selected ? 'border-[#4a7c3f] bg-[#4a7c3f]' : 'border-[#b8d9b0]'}`}>
                {selected && (
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-[#7a9a72] mt-2 px-1">This is your default mode for AI Assistant.</p>
    </div>
  );
}
