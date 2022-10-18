import {useEffect} from "react";
import AOS from 'aos';
import "aos/dist/aos.css";


const Home = () => {
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
  return (
    <div className="h-screen px-4 sm:px-6 flex items-center	justify-center" style={{ backgroundImage: "url(/bg-img.jpg)", backgroundPosition: "center" }}>
        <div className="text-center pb-12 md:pb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Make your deposit <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">smart</span></h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-10" data-aos="zoom-y-out" data-aos-delay="150">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, quisquam!</p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="500">
              <div>
                <button className="inline-block w-full px-4 py-2 text-center text-white font-bold bg-sky-500 rounded-md shadow hover:bg-sky-600">Create your vault</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export { Home };
