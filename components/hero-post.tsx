import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

type Props = {
  title: string
  image: string
  created: string
  description: string
  author: string
}

const HeroPost = ({
  title,
  image,
  created,
  description,
  author,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {image && <CoverImage title={title} src={image}/>}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
              {title}
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            {/* <DateFormatter dateString={`${created}`} /> */}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{description}</p>
          <Avatar name={author}/>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
