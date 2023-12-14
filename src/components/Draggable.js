
import { Draggable, InertiaPlugin } from "gsap/all"
import gsap from "gsap"

import { useEffect, useState, useMemo, useRef} from "react"

import arrayShuffle from "../util/arrayShuffle"

import "./Draggable.scss"

import StickerInfo from "./StickerInfo"

gsap.registerPlugin(Draggable, InertiaPlugin)


export default function DraggableBlock() {
	
	let targetSticker

	let [examineSticker, setExamineSticker] = useState(null)


	let testPrint = (item) => {
		console.log('triggered', item)
	}

	let stickerInfoArr = [
		{imgSrc: "img/stickers/s1.png", imgAlt:"img/stickers/s1.png", title: "sticker title 1", description: "testing description 1: we will put more info here later on"},
		{imgSrc: "img/stickers/s2.png", imgAlt:"img/stickers/s2.png", title: "sticker title 2", description: "testing description 2: we will put more info here later on"},
		{imgSrc: "img/stickers/s3.png", imgAlt:"img/stickers/s3.png", title: "sticker title 3", description: "testing description 3: we will put more info here later on"},
		{imgSrc: "img/stickers/s4.png", imgAlt:"img/stickers/s4.png", title: "sticker title 4", description: "testing description 4: we will put more info here later on"},
		{imgSrc: "img/stickers/s5.png", imgAlt:"img/stickers/s5.png", title: "sticker title 5", description: "testing description 5: we will put more info here later on"},
		{imgSrc: "img/stickers/s6.png", imgAlt:"img/stickers/s6.png", title: "sticker title 6", description: "testing description 6: we will put more info here later on"},
		{imgSrc: "img/stickers/s7.png", imgAlt:"img/stickers/s7.png", title: "sticker title 7", description: "testing description 7: we will put more info here later on"},
		{imgSrc: "img/stickers/s8.png", imgAlt:"img/stickers/s8.png", title: "sticker title 8", description: "testing description 8: we will put more info here later on"},
	]
	
	let expensiveShuffle = useMemo(() => {
		let stickerCollection = arrayShuffle(stickerInfoArr).map((sticker, index) => {
			return (
				<div 
					id={index}
					key={index} 
					className="sticker-container" 
				>
					<img 
						className="dragSticker" 
						src={sticker.imgSrc} 
						alt={sticker.imgAlt}>
					</img>
				</div>
			)
		})
		return stickerCollection
	}, [])



	useEffect(() => {

		Draggable.create(".sticker-container", {
			inertia: true,
			resistance: 50000,
			bounds: ".draggle-container",
			onClick: function(e) {
				// setExamineSticker(e.target.parentNode.id)
				setExamineSticker(stickerInfoArr[e.target.parentNode.id])
			},
			onDragStart: function(e) {
				targetSticker = e.target;
			},
			onThrowUpdate: function (e) {
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


		let stickerCollectionArr = document.querySelectorAll(".dragSticker")
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