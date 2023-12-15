
import { Draggable, InertiaPlugin } from "gsap/all"
import gsap from "gsap"

import { useEffect, useState, useMemo, useRef} from "react"

import arrayShuffle from "../util/arrayShuffle"

import "./Draggable.scss"

import StickerInfo from "./StickerInfo"

gsap.registerPlugin(Draggable, InertiaPlugin)


export default function DraggableBlock() {
	
	let targetSticker
	let audioArr = ['audio/peel1.wav', 'audio/peel2.wav']


	let [examineSticker, setExamineSticker] = useState(null)


	let stickerInfoArr = [
		{imgId: 11,imgSrc: "img/stickers/s1.png", imgAlt:"img/stickers/s1.png", title: "sticker title 1", description: "testing description 1: we will put more info here later on"},
		{imgId: 12,imgSrc: "img/stickers/s2.png", imgAlt:"img/stickers/s2.png", title: "sticker title 2", description: "testing description 2: we will put more info here later on"},
		{imgId: 13,imgSrc: "img/stickers/s3.png", imgAlt:"img/stickers/s3.png", title: "sticker title 3", description: "testing description 3: we will put more info here later on"},
		{imgId: 14,imgSrc: "img/stickers/s4.png", imgAlt:"img/stickers/s4.png", title: "sticker title 4", description: "testing description 4: we will put more info here later on"},
		{imgId: 15,imgSrc: "img/stickers/s5.png", imgAlt:"img/stickers/s5.png", title: "sticker title 5", description: "testing description 5: we will put more info here later on"},
		{imgId: 16,imgSrc: "img/stickers/s6.png", imgAlt:"img/stickers/s6.png", title: "sticker title 6", description: "testing description 6: we will put more info here later on"},
		{imgId: 17,imgSrc: "img/stickers/s7.png", imgAlt:"img/stickers/s7.png", title: "sticker title 7", description: "testing description 7: we will put more info here later on"},
		{imgId: 18,imgSrc: "img/stickers/s8.png", imgAlt:"img/stickers/s8.png", title: "sticker title 8", description: "testing description 8: we will put more info here later on"},
	]
	
	let expensiveShuffle = useMemo(() => {
		let stickerCollection = arrayShuffle(stickerInfoArr).map((sticker, index) => {
			return (
				<div 
					id={sticker.imgId}
					key={index} 
					className="sticker-container" 
				>
					<img 
						className="dragSticker front" 
						src={sticker.imgSrc} 
						alt={sticker.imgAlt}>
					</img>
					<img 
						className="dragSticker back" 
						src={sticker.imgSrc} 
						alt={sticker.imgAlt}>
					</img>
				</div>
			)
		})
		return stickerCollection
	}, [])


	let returnImgId = (arr, selectedId) => {
		for (let img of arr) { if (img.imgId === parseInt(selectedId)) return img }
	}




	useEffect(() => {

		Draggable.create(".sticker-container", {
			inertia: true,
			resistance: 50000,
			bounds: ".draggle-container",
			onClick: function(e) {
				setExamineSticker(returnImgId(stickerInfoArr, e.target.parentNode.id))
			},
			onDragStart: function(e) {
				targetSticker = e.target;
				let backOfSticker = targetSticker.parentNode.querySelector(".back")
				let peelTl = gsap.timeline()
					.to(targetSticker, { marginTop: "-4%", marginLeft: "-5%"}, 0)
					.to(backOfSticker, { marginTop: "4%", marginLeft: "5%"}, 0)
				peelTl.play()

				let peelAudio = new Audio(`${arrayShuffle(audioArr)[0]}`)
				peelAudio.play()
			},
			onDragEnd: function() {
				let backOfSticker = targetSticker.parentNode.querySelector(".back")
				let stickTl = gsap.timeline()
					.to(targetSticker, { marginTop: 0, marginLeft: 0 }, 0)
					.to(backOfSticker, { marginTop: 0, marginLeft: 0 }, 0)
				stickTl.play()
			},
			onThrowUpdate: function () {
				const box = document.querySelector(".box-cover");
				const boxRect = box.getBoundingClientRect();
				const stickerRect = targetSticker.getBoundingClientRect();
				if (
					stickerRect.left >= (boxRect.left - boxRect.left*0.20)&&
					stickerRect.right <= (boxRect.right + boxRect.right*0.20)&&
					stickerRect.bottom >= boxRect.top &&
					stickerRect.bottom <= boxRect.bottom + 50
					) {
					gsap.to(targetSticker.parentNode, { x: 0, y: 0, duration: 0.5 });
				}
			},
			minimumMovement: 5,
			zIndexBoost: false,
			force3D: true,
		})

	}, [])

	return (
		<div className="draggle-container">
			<div className="box-container">
				<img className="box box-size" src="img/box.png" alt="img/box.png"></img>
				<img className="box-cover box-size" src="img/box-cover.png" alt="img/box-cover.png"></img>
				{expensiveShuffle}	
			</div>

			{examineSticker &&  
				<StickerInfo
					setExamineSticker={setExamineSticker}
					imgSrc={examineSticker.imgSrc}
					imgAlt={examineSticker.imgAlt}
					stickerTitle={examineSticker.title}
					stickerDescription={examineSticker.description}
				/>
			}
		</div>
	)

}