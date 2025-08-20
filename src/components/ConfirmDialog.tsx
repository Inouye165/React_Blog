export default function ConfirmDialog({ open, onConfirm, onCancel, message }: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">{message}</div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onConfirm}>Confirm</button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
