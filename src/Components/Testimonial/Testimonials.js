import React from "react";
import { AiTwotoneStar } from "react-icons/ai";

const Testimonials = () => {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Read trusted reviews from our customers
            </h2>
            <p className="text-gring-offset-warm-gray-500 mx-auto mt-4 max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur praesentium natus sapiente commodi. Aliquid sunt
              tempore iste repellendus explicabo dignissimos placeat, autem
              harum dolore reprehenderit quis! Quo totam dignissimos earum.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
            <div>
              <img
                alt="Woman"
                src="https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
              />
              <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
                <p className="text-lg font-bold text-gray-700">Sophie Lennon</p>
                <p className="mt-1 text-xs font-medium text-gray-500">
                  Digital Marketing at Studio
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt voluptatem alias ut provident sapiente repellendus.
                </p>
                <div className="mt-8 flex justify-center gap-0.5 text-[#008000]">
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                </div>
              </blockquote>
            </div>
            <div>
              <img
                alt="Woman"
                src="https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
              />
              <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
                <p className="text-lg font-bold text-gray-700">Sophie Lennon</p>
                <p className="mt-1 text-xs font-medium text-gray-500">
                  Digital Marketing at Studio
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt voluptatem alias ut provident sapiente repellendus.
                </p>
                <div className="mt-8 flex justify-center gap-0.5 text-[#008000]">
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                </div>
              </blockquote>
            </div>

            <div>
              <img
                alt="Woman"
                src="https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
              />
              <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
                <p className="text-lg font-bold text-gray-700">Sophie Lennon</p>
                <p className="mt-1 text-xs font-medium text-gray-500">
                  Digital Marketing at Studio
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt voluptatem alias ut provident sapiente repellendus.
                </p>
                <div className="mt-8 flex justify-center gap-0.5 text-[#008000]">
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                  <AiTwotoneStar className="text-2xl" />
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
