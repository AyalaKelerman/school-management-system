// components/ui/Modal.jsx
import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto">
      <div className="relative w-full max-w-3xl mx-auto my-10 bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>

          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
