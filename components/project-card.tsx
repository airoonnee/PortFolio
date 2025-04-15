import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
}

export default function ProjectCard({ title, description, tags, image }: ProjectCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
      tabIndex={0}
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Image illustrant le projet ${title}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2" aria-label="Technologies utilisées">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
