import Image from "next/image";
import logo from "../assets/images/logo.png";
import iconInsta from "../assets/images/instagramIcon.png";
import iconLinkedin from "../assets/images/linkedinIcon.png";
import iconGit from "../assets/images/gitIcon.png";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col  justify-between ">
      <header className="bg-[#D9D9D9] w-full h-20 shadow drop-shadow-md flex justify-between items-center">
        <div className="flex items-center ml-32">
          <Image src={logo} alt="Logo" className="h-7 w-7" />
          <h1 className="text-xl font-semibold">ContractHub</h1>
        </div>
      </header>
      <content className="flex flex-col justify-center items-center h-screen "></content>
      <footer className="bg-[#D9D9D9] w-full h-20 flex items-center justify-center ">
        <div>
          <div className="flex  w-full h-full">
            <div className="flex items-center">
              <Image src={iconInsta} alt="Instagram" className="h-8 w-8 mx-4" />
              <Image
                src={iconLinkedin}
                alt="LinkedIn"
                className="h-8 w-8 mx-4"
              />
              <Image src={iconGit} alt="Git" className="h-8 w-8 mx-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
