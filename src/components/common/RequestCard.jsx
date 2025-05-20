import Button from "./Button2"

const RequestCard = ({ request, delay = 0 }) => {
  // Function to determine urgency level styling
  const getUrgencyStyle = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "critique":
        return "bg-red-100 text-red-800"
      case "haute":
        return "bg-orange-100 text-orange-800"
      case "moyenne":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  // Function to determine blood type styling
  const getBloodTypeStyle = (bloodType) => {
    if (bloodType.includes("O")) {
      return "bg-[#d93f31] text-white"
    } else if (bloodType.includes("A")) {
      return "bg-[#b2d3e1] text-[#d93f31]"
    } else if (bloodType.includes("B")) {
      return "bg-[#8fb9cc] text-white"
    } else {
      return "bg-[#6c9fb8] text-white"
    }
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:transform hover:-translate-y-2 overflow-hidden border border-gray-100"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`${getBloodTypeStyle(request.bloodType)} text-lg font-bold h-12 w-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform`}
          >
            {request.bloodType}
          </div>
          <span className={`${getUrgencyStyle(request.urgency)} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {request.urgency}
          </span>
        </div>

        <h3 className="font-semibold text-gray-800 mb-1">{request.hospital}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {request.city}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{request.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{request.timePosted}</span>
          <Button variant="primary" size="sm" className="transform hover:scale-105 transition-transform">
            Je veux aider
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RequestCard

