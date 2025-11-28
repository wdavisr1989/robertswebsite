import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import style from './style.module.css';

const Modal = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div class={style.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
			<div class={style.modalContent} onClick={(e) => e.stopPropagation()}>
				<button 
					class={style.closeButton} 
					onClick={onClose}
					aria-label="Close modal"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
