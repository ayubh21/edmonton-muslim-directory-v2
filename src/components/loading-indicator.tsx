import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';


const LoadingComponent = ({ isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: Dispatch<SetStateAction<boolean>> }) => {
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		setFadeOut(true);
		setIsLoading(true)
		if (!isLoading) {
			setFadeOut(true)
			const timer = setTimeout(() => {
				setFadeOut(false);
				setIsLoading(false)
			}, 5000); // Duration of fade out animation
			return () => clearTimeout(timer);
		}
	}, [isLoading]);


	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
				}`}
		>
			<div className="flex flex-col items-center space-y-6">
				{/* Mountain Logo */}
				<div className="relative">
					<svg
						width="80"
						height="80"
						viewBox="0 0 100 100"
						className="animate-pulse"
					>
						{/* Mountain peaks */}
						<path
							d="M20 70 L35 45 L50 60 L65 35 L80 70 Z"
							fill="none"
							stroke="white"
							strokeWidth="2"
							strokeLinejoin="round"
						/>
						{/* Second mountain layer */}
						<path
							d="M10 70 L25 50 L40 65 L55 40 L70 55 L90 70"
							fill="none"
							stroke="white"
							strokeWidth="1.5"
							strokeLinejoin="round"
							opacity="0.6"
						/>
					</svg>
				</div>

				{/* MBD Text */}
				<div className="text-white text-xl font-bold tracking-wider animate-pulse">
					Edmonton Muslim Directory
				</div>
				{/* Loading dots */}
			</div>

			<style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
		</div>
	);
};


export default LoadingComponent
