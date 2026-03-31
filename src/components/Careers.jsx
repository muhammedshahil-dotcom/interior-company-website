const jobs = [
  {
    title: "Interior Designer",
    location: "Kannur",
    qualification: "Degree / Interior Design",
    experience: "1-3 Years",
    specialization: "Residential Interiors",
  },
  {
    title: "Site Supervisor",
    location: "Kannur",
    qualification: "Diploma / Civil",
    experience: "1-2 Years",
    specialization: "Site Execution",
  },
  {
    title: "Sales Executive",
    location: "Kannur",
    qualification: "Any Degree/ Diploma",
    experience: "0-2 Years",
    specialization: "Client Handling",
  },
];

export default function Careers() {
  return (
    <section id="careers" className="w-full bg-gray-50 py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            Careers
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Current Job Vacancies
          </h2>
          <p className="text-base text-gray-600 sm:max-w-2xl sm:mx-auto">
            Join Elora Interiors and help us craft refined, modern spaces for clients across Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs.map((job) => {
            const message = encodeURIComponent(
              `Hello I am applying for the ${job.title} role`
            );
            const whatsappUrl = `https://wa.me/916282555875?text=${message}`;
            return (
              <div
                key={job.title}
                className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-lg"
                data-aos="fade-up"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    Open
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-800">Qualification:</span>{" "}
                    {job.qualification}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Experience:</span>{" "}
                    {job.experience}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Specialization:</span>{" "}
                    {job.specialization}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Apply Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
