import { Quote } from "lucide-react"

const TestimonialCard = ({ quote, author, role, avatar, delay = 0 }) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#b2d3e1] hover:border-[#d93f31] transform hover:-translate-y-2"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <Quote className="h-8 w-8 text-[#b2d3e1] mb-4" />
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        {avatar ? (
          <img src={avatar || "/placeholder.svg"} alt={author} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-[#d93f31]/10 flex items-center justify-center text-[#d93f31] font-bold">
            {author.charAt(0)}
          </div>
        )}
        <div className="ml-3">
          <p className="font-semibold text-gray-800">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard

