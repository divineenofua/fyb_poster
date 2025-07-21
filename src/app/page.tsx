import FybForm from "./pages/fybForm";

 
export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#ffff] font-sans px-2  sm:px-6 py-10">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl text-[#000337] font-bold mb-4">
            🎓 Create Your FYB Poster
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Immortalize your final year with a stunning digital poster. Just
            fill in your details and we’ll turn it into a shareable image. 📸
          </p>
        </section>

        {/* The Form */}
        <section className="bg-[#002244] py-6 sm:px-6 px-2 rounded-lg max-w-3xl mx-auto shadow-lg">
          <h3 className="text-xl font-bold mb-4  text-white text-center">
            Let’s create yours 👇
          </h3>
          <FybForm />
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-600">
          Made with ❤ by{" "}
          <a target="_blank"
            href="https://www.instagram.com/etue_dee"
            className="text-[#000337]"
          >
            Etue Divine @didicodes
          </a>{" "}
          — 2025 Edition
        </footer>
      </div>
    </div>
  );
}

 
 