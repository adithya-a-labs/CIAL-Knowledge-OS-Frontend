import { Eye, Edit } from 'lucide-react';
import { Asset } from '@/types';
import StatusPill from '@/components/common/StatusPill';

interface AssetRowProps {
  asset: Asset;
}

export default function AssetRow({ asset }: AssetRowProps) {
  return (
    <tr
      className="border-b border-[#f0f7ed] hover:bg-[#f8fdf6] transition-colors"
      data-testid={`asset-row-${asset.id}`}
    >
      <td className="px-4 py-3 text-sm font-medium text-[#1a2e14]">{asset.name}</td>
      <td className="px-4 py-3">
        <span className="text-xs font-mono text-[#5a7a52] bg-[#f8fdf6] px-1.5 py-0.5 rounded">
          {asset.assetId}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-[#5a7a52]">{asset.category}</td>
      <td className="px-4 py-3 text-sm text-[#5a7a52]">{asset.location}</td>
      <td className="px-4 py-3">
        <StatusPill status={asset.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button
            className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors"
            data-testid={`button-view-asset-${asset.id}`}
          >
            <Eye size={14} />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors"
            data-testid={`button-edit-asset-${asset.id}`}
          >
            <Edit size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
