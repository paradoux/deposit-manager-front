import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="flex-1 px-4 sm:px-6 flex items-center	justify-center">
      <div className="text-center pb-12 md:pb-16">
        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
          data-aos="zoom-y-out"
        >
          Make your deposit{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            smart
          </span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xl text-gray-600 mb-10"
            data-aos="zoom-y-out"
            data-aos-delay="150"
          >
            Rental security deposit management, on the blockchain.
          </p>
          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="500"
          >
            <div>
              <Link to="/create">
                <Button>Create your vault</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Re-add image */}
      {/* <div className="m-8 flex justify-center items-center">
        <img src="/images/bg-img.jpg" className="h-60"></img>
      </div> */}
    </div>
  );
};

export { Home };
