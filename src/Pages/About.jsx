import React from 'react'
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div>
       <Helmet>
            <title>About Pallavi - Skincare Artist in Ludhiana</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Learn more about Pallavi, a skilled skincare artist offering styling tips and skincare services in Ludhiana." />
          </Helmet>
        <div
  className="flex items-center justify-center px-6 md:px-10 h-[90vh] bg-[url('/hero-about-mob.webp')] md:bg-[url('/Aboutt.webp')] bg-cover bg-center"
>
  {/* Your content here */}
</div>

    </div>
  )
}

export default About
