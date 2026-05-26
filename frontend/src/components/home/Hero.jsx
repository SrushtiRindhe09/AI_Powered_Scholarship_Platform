export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-navy-950 px-6 py-24 sm:py-32 lg:px-8 text-center pt-32 pb-40">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500 blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-600 blur-3xl mix-blend-screen"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-emerald-400 tracking-wider uppercase mb-4">Empower Your Education</h2>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-md">
          Find Your Future Scholarship
        </h1>
        <p className="mt-6 text-lg leading-8 text-navy-200 max-w-2xl mx-auto">
          Discover thousands of scholarships tailored to your state, category, and education level. Stop searching endlessly and start achieving.
        </p>
      </div>
    </div>
  );
}
