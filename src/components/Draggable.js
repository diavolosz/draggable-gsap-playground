
import { Draggable, InertiaPlugin } from "gsap/all"
import gsap from "gsap"

import { useEffect, useState, useMemo, useRef} from "react"

import arrayShuffle from "../util/arrayShuffle"

import "./Draggable.scss"


gsap.registerPlugin(Draggable, InertiaPlugin)


export default function DraggableBlock() {
	
	let targetSticker

	let imageArr = [
		{src: "img/stickers/s1.png", alt:"img/stickers/s1.png"},
		{src: "img/stickers/s2.png", alt:"img/stickers/s2.png"},
		{src: "img/stickers/s3.png", alt:"img/stickers/s3.png"},
		{src: "img/stickers/s4.png", alt:"img/stickers/s4.png"},
		{src: "img/stickers/s5.png", alt:"img/stickers/s5.png"},
		{src: "img/stickers/s6.png", alt:"img/stickers/s6.png"},
		{src: "img/stickers/s7.png", alt:"img/stickers/s7.png"},
		{src: "img/stickers/s8.png", alt:"img/stickers/s8.png"},
	]
	
	let expensiveShuffle = useMemo(() => {
		let stickerCollection = arrayShuffle(imageArr).map((img, index) => {
			return (
				<img 
					key={index} 
					className="dragSticker" 
					src={img.src} 
					alt={img.alt}>
				</img>
			)
		})
		return stickerCollection
	}, [])



	useEffect(() => {

		Draggable.create(".dragSticker", {
			inertia: true,
			resistance: 5000,
			bounds: ".draggle-container",
			onDragStart: function(e) {
				targetSticker = e.target;
			},
			onDragEnd: function() {
				const box = document.querySelector(".box-cover");
				const boxRect = box.getBoundingClientRect();
				const stickerRect = targetSticker.getBoundingClientRect();
				console.log(stickerRect.bottom >= boxRect.top, stickerRect.bottom, boxRect.top)
				console.log(stickerRect.bottom <= boxRect.bottom, stickerRect.bottom, boxRect.bottom)
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
					gsap.to(targetSticker, { x: 0, y: 0, duration: 0.5 });
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
		</div>
	)

}