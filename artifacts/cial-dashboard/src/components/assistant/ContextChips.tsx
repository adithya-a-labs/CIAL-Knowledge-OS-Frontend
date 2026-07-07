import { FileText, UploadCloud, X } from 'lucide-react';
import type {
  ContextDocument,
  SearchScope,
  UploadedFileContext,
} from '@/types/assistant';

interface ContextChipsProps {
  selectedDocuments: ContextDocument[];
  uploadedFiles: UploadedFileContext[];
  searchScope: SearchScope;
  onRemoveDocument: (id: string) => void;
  onRemoveFile: (id: string) => void;
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ContextChips({
  selectedDocuments,
  uploadedFiles,
  searchScope,
  onRemoveDocument,
  onRemoveFile,
}: ContextChipsProps) {
  const visibleDocuments = selectedDocuments.slice(0, 3);
  const hiddenDocumentCount = Math.max(0, selectedDocuments.length - visibleDocuments.length);
  const hasAnyContext = selectedDocuments.length > 0 || uploadedFiles.length > 0;

  return (
    <div className="border-t border-[#e2eedd] bg-[#fbfef9] px-3 py-2.5 sm:px-4" data-testid="chat-context-area">
      {!hasAnyContext && (
        <div className="rounded-lg border border-dashed border-[#d7e8cf] bg-white px-3 py-2 text-xs text-[#7d9b73]">
          No context selected. Responses will use the selected scope defaults until documents or uploads are added.
        </div>
      )}

      {searchScope === 'current_upload' && uploadedFiles.length === 0 && (
        <div className="mt-2 rounded-lg border border-[#efd8b5] bg-[#fffaf2] px-3 py-2 text-xs font-medium text-[#8a5a16] first:mt-0">
          Current Upload Only is selected, but no files have been attached yet.
        </div>
      )}

      {hasAnyContext && (
        <div className="flex flex-wrap gap-2">
          {visibleDocuments.map((document) => (
            <span
              key={document.id}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#cfe3c7] bg-white px-2.5 py-1 text-xs font-medium text-[#1a2e14]"
            >
              <FileText size={12} className="shrink-0 text-[#4a7c3f]" />
              <span className="safe-text max-w-[13rem] truncate">{document.title}</span>
              <button
                type="button"
                onClick={() => onRemoveDocument(document.id)}
                className="rounded-full p-0.5 text-[#7d9b73] hover:bg-[#f0f7ed] hover:text-[#3d6834]"
                aria-label={`Remove ${document.title}`}
                data-testid={`button-remove-context-${document.id}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {hiddenDocumentCount > 0 && (
            <span className="inline-flex items-center rounded-full border border-[#cfe3c7] bg-[#f0f7ed] px-2.5 py-1 text-xs font-semibold text-[#4a7c3f]">
              +{hiddenDocumentCount} more
            </span>
          )}

          {uploadedFiles.map((file) => (
            <span
              key={file.id}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#c7d8e8] bg-white px-2.5 py-1 text-xs font-medium text-[#1a2e14]"
            >
              <UploadCloud size={12} className="shrink-0 text-[#346c96]" />
              <span className="safe-text max-w-[12rem] truncate">
                {file.name} ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="rounded-full p-0.5 text-[#7d9b73] hover:bg-[#eef6fc] hover:text-[#346c96]"
                aria-label={`Remove ${file.name}`}
                data-testid={`button-remove-upload-${file.id}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
