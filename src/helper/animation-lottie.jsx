import Lottie from "lottie-react";
import { useEffect } from "react";

const AnimationLottie = ({ animationPath }) => {
  useEffect(() => {
    if (!animationPath) {
      console.warn("AnimationLottie: No animation data provided");
    } else {
      console.log("AnimationLottie: Animation data loaded", animationPath);
    }
  }, [animationPath]);

  if (!animationPath) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <p>Animation file not found</p>
      </div>
    );
  }

  try {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Lottie 
          animationData={animationPath} 
          loop={true}
          style={{ 
            width: '100%', 
            height: '100%', 
            maxWidth: '500px', 
            maxHeight: '500px' 
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("AnimationLottie: Error rendering animation", error);
    return (
      <div className="w-full h-full flex items-center justify-center text-red-400">
        <p>Error loading animation</p>
      </div>
    );
  }
};

export default AnimationLottie;
