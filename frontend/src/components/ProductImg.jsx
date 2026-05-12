import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const ProductImg = ({ images }) => {
    const [mainImg, setMainImg] = useState(images[0].url)
    return (
        <div className="flex flex-col-reverse md:flex-row gap-5">
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {
                    images.map((img, idx) => {
                        return <img key={idx} src={img.url} alt={img.alt} className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20 border shadow-md object-cover flex-shrink-0" onClick={() => setMainImg(img.url)} />
                    })
                }
            </div> 
            <div className="flex-1 max-w-full overflow-hidden">
                <Zoom>
                    <img src={mainImg} alt="Main product" className="w-full h-auto max-w-[500px] border shadow-lg rounded-lg" />
                </Zoom>
            </div>
        </div>
    )
}

export default ProductImg