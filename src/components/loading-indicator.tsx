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
	}, [isLoading, , setIsLoading]);


	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
				}`}
		>
			<div className="flex flex-col items-center space-y-6">
				{/* Mountain Logo */}
				<div className="relative">
					<img src={'/logo-transparent.png'} alt="logo" className="h-60 w-60 " />
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
