import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/reusable/title";

export default function FeaturedDoctor() {
  const doctorsData = [
    {
      name: "Dr. Md. Monzurul Haque",
      title: "MBBS, DDV, MRCP PACES...",
      specialty: "Dermatology and Venereology",
      fee: 299.0,
      experience: 6,
    },
    {
      name: "Dr. Jane Smith",
      title: "MD, PhD",
      specialty: "Cardiology",
      fee: 350.0,
      experience: 10,
    },
    {
      name: "Dr. John Doe",
      title: "MBBS, MS",
      specialty: "Orthopedics",
      fee: 280.0,
      experience: 8,
    },
  ];

  return (
    <div className="container mx-auto py-16 px-4">
        <Title title="Featured Doctors" text="Meet Our Experienced and Compassionate Doctors" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctorsData.map((doctor, i) => (
          <div
            key={i}
            className="rounded-2xl border bg-white p-4 shadow-sm flex gap-3"
          >
            {/* Doctor Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <Image
                src="https://doctors-next14.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeq_question.4c655052.jpg&w=828&q=100"
                alt={doctor.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">
                  {doctor.name}
                </h3>

                <p className="text-slate-500 text-sm">{doctor.title}</p>

                <Badge
                  variant="secondary"
                  className="mt-1 text-[11px] bg-teal-100 text-teal-700"
                >
                  {doctor.specialty}
                </Badge>

                <p className="text-lg font-semibold text-teal-700 mt-1">
                  ৳ {doctor.fee}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-purple-700">
                    {doctor.experience} years
                  </span>{" "}
                  of experience
                </p>

                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary-700"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
