import { BsArrowDownRightCircle } from "react-icons/bs";
import { HiBookOpen } from "react-icons/hi2";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import home from "../assets/home.png";
import about from "../assets/about.png";
import { questions as questionsData } from "../data/questions.json";
import { useState } from "react";
import { Link } from "react-router-dom";

const questions = questionsData;

function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <>
      <section className="container mx-auto flex justify-around items-center h-[calc(100vh-120px)]">
        <div className="w-[80%] md:w-[50%] p-4">
          <h1 className="text-[54px] sm:text-[68px] md:text-[72px] font-bold leading-none text-(--color-text) mb-8">
            Books & Literature
          </h1>
          <p className="md:w-95 text-[20px] md:text-[16px] text-(--color-text-gray) leading-relaxed my-6">
            Discover the best high-quality books from our curated collection.
            Manage your library easily and efficiently with ReadHub to explore,
            organize, and enjoy thousands of books with ease.
          </p>
          <div className="flex gap-6">
            <Link
              to="/books"
              className="text-(--color-text-muted) bg-(--color-text) cursor-pointer px-3.5 py-2 rounded-xl"
            >
              Start Shopping
            </Link>
            <button className="group flex gap-2 justify-center items-center cursor-pointer border border-transparent transition-all duration-300 hover:border hover:border-(--color-primary) rounded-xl px-3.5 py-2">
              Explore more{" "}
              <span>
                <BsArrowDownRightCircle className="group-hover:-rotate-45 transition-all duration-300" />
              </span>
            </button>
          </div>
        </div>
        <div className="hidden md:block w-[50%]">
          <img src={home} alt="hero" />
        </div>
      </section>
      <section className="container mx-auto flex flex-col lg:flex-row justify-around items-center gap-12 mt-4 lg:mt-0 mb-12">
        <div className="bg-(--color-primary)/6 rounded-xl w-[80%] lg:w-full">
          <img src={about} alt="about" />
        </div>
        <div className="bg-linear-to-t from-(--color-text) to-(--color-primary) text-(--color-text-muted) p-12 rounded-lg w-[80%] lg:w-full">
          <div className="flex gap-3 mb-6">
            <div className="p-1 text-3xl">
              <HiBookOpen />
            </div>
            <div>
              <p className="mb-2 text-[18px] font-medium">
                Effortless Library Management
              </p>
              <p className="text-[14px] leading-5 font-medium">
                Easily add, organize, and manage your entire book collection
                with a user-friendly interface designed for readers and
                librarians alike.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mb-6">
            <div className="p-1 text-3xl">
              <FaMagnifyingGlass />
            </div>
            <div>
              <p className="mb-2 text-[18px] font-medium">Discover New Reads</p>
              <p className="text-[14px] leading-5 font-medium">
                Stay inspired with personalized book recommendations and explore
                trending titles across different genres and categories.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mb-6">
            <div className="p-1 text-3xl">
              <FaUserCircle />
            </div>
            <div>
              <p className="mb-2 text-[18px] font-medium">
                User Profiles and Reading History
              </p>
              <p className="text-[14px] leading-5 font-medium">
                Create personalized profiles, track your reading journey, and
                easily revisit your favorite titles anytime.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mb-6">
            <div className="p-1 text-3xl">
              <IoMdAnalytics />
            </div>
            <div>
              <p className="mb-2 text-[18px] font-medium">
                Analytics and Insights
              </p>
              <p className="text-[14px] leading-5 font-medium">
                Gain valuable insights into borrowing trends, popular genres,
                and user engagement to make informed decisions for your library.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-(--color-text-gray)/15 py-12 text-(--color-text)">
        <div className="flex flex-col items-center mb-12">
          <p className="text-[14px] font-medium uppercase tracking-wider">
            How it works
          </p>
          <h2 className="text-[36px] text-center md:text-[48px] font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="w-[60%] mx-auto flex justify-start items-center gap-4">
          <ul className="w-full">
            {questions.map((question, i) => (
              <li className="border-b border-(--color-text-gray)/50" key={i}>
                <details className="py-2 w-full" open={openIndex === i}>
                  <summary
                    className={`cursor-pointer ${openIndex === i ? "underline" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenIndex(openIndex === i ? null : i);
                    }}
                  >
                    {question.question}
                  </summary>

                  <p className="my-1 ms-4">{question.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;
