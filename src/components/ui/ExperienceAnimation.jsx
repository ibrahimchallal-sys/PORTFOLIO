import AnimationLottie from "../../helper/animation-lottie";
import experienceAnimation from "../../assets/lottie/code.json";

function ExperienceAnimation() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[400px]">
      <AnimationLottie animationPath={experienceAnimation} />
    </div>
  );
}

export default ExperienceAnimation;
