import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';


const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            {/* Clickable overlay to close the modal */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-xl max-h-[90vh] p-4 mx-4 bg-white rounded-2xl shadow-md flex flex-col">
                <div className="flex items-center justify-between pb-3 shrink-0">

                    {/* Modal Title */}
                    <h2 id="modal-title" className="font-semibold text-slate-800">{title}</h2>

                    {/* Close Button */}
                    <button onClick={onClose} className="p-1 text-slate-400 cursor-pointer rounded-full hover:bg-slate-100 hover:text-slate-600" aria-label="Close modal">
                        <span ><IoMdClose /></span>
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="pt-2 overflow-y-auto pr-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;