import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Modal({ children }: {children: ReactNode}) {
	return <motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		className="modal modal-open">
		<div 
			
			className="modal-box">
			{children}
		</div>
	</motion.div>
}