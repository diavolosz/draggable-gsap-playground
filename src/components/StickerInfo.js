

import "./StickerInfo.scss"






export default function StickerInfo(prop) {

  let {imgSrc, imgAlt, stickerTitle, stickerDescription, setExamineSticker} = prop

  return (
    <div className="sticker-info-container">
      <div className="modal-background">

        <button className="return-button" onClick={() => {setExamineSticker(null)}}>X</button>
        this is a sticker info block 
      
        <img src={imgSrc} alt={imgAlt}></img>

        <div className="sticker-description-container">
          <div className="sticker-title">
            this is the title: {stickerTitle}
          </div>
          <span className="sticker-description">
            this is the description: {stickerDescription}
          </span>
        </div>
        
      </div>
    </div>
  )
}