import React from 'react'


function Banner() {
  return (
  <>
  <div className='max-w-screen-2xl container mx-auto md:px-20 px-3 flex flex-col md:flex-row my-10'>
   
    <div className='order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-40'>
   
    <div className='space-y-16'> 
     
      <h1 className=" text-black font-bold text-5xl">Welcome to <br/><span className='text-pink-600 font-bold text-5xl'>Trayamb Associates </span> </h1> 
      
      <p className='text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, iusto incidunt labore ullam dolorem molestiae expedita et maxime iste consectetur veritatis maiores suscipit quasi voluptatum facere deleniti. Consequuntur, provident? Adipisci.
    
      </p>
      
     <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" />
  </label>

      </div>
      <input type="submit" value="Submit" className="btn mt-7 text-black bg-gray-300" />
      </div>
      <div className='order-1 w-full md:w-1/2 mt-24'>
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1316&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" />      </div>
  
      </div>
    
     
      <div className='flex gap-4 p-16'> 
     <div>
     <img src="https://www.oraanj-interiors.co.uk/images/portfolio-img/Residential/Residential-5/a-luxurious-bedroom-interiors.webp" alt="" srcset="" />
     </div>
   
    <div>
    <img src="https://ansainteriors.com/wp-content/uploads/2020/06/ansa2024__9c512c20-5196-438c-8088-c3f6e8922e94.png" alt="" srcset="" />
    </div>

   <div>
   <img src="https://media.licdn.com/dms/image/D4E12AQHzt08LxrnBYg/article-cover_image-shrink_720_1280/0/1710767604436?e=2147483647&v=beta&t=ovWbmRpPVxV0emq6t5yX2YjFsnvjkCjmz4V9oWd3gfU" alt="" srcset="" />
   </div>
 
 
 
 </div>

 <div className='flex gap-4 p-16'>
 <div className=''>
  <img src="https://fancyhouse-design.com/wp-content/uploads/2023/11/The-living-room-in-this-large-apartment-captures-elegance-with-its-streamlined-TV-unit..jpg" className='border-black' alt="" srcset="" />
 </div>
 <div className=' '>
  <img src="https://fancyhouse-design.com/wp-content/uploads/2023/11/Contemporary-interior-decorations-breathe-life-into-this-penthouse-living-rooms-design..jpg" alt="" srcset="" />
 </div>
 <div className=' '>
  <img src="https://fancyhouse-design.com/wp-content/uploads/2023/11/An-inviting-L-shaped-sofa-anchors-this-penthouses-spacious-living-room-layout..jpg" alt="" srcset="" />
 </div>

 </div>

 
 <div className='p-14 '>
  <img src="https://www.lxhausys.com/us/blog/wp-content/uploads/2024/02/8d576cfe-f530-4457-b2f4-639dc4087833_4_HF8_4.jpg" alt="" srcset="" />
 </div>
 <div className='p-14 '>
  <img src="https://www.armacmartin.com/cdn/shop/articles/unnamed_0712fd89-4e10-4bf3-a2c3-b9cee528c655.jpg?v=1696927550" alt="" srcset="" />
 </div>
 <div className='p-14 '>
  <img src="https://images.livspace-cdn.com/plain/https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2023/03/07174959/AdobeStock_334422311-scaled.jpeg" alt="" srcset="" />
 </div>
 
     
     </>
  )
}

export default Banner
