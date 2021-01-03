// const cv = require('opencv.js')

// Grab elements, create settings, etc.
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

	let streaming = false

    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();

        processVideo()
    });

		// let video = document.getElementById('videoInput');
		let cap = new cv.VideoCapture(video);

		let frame  = new cv.Mat(video.height, video.width, cv.CV_8UC4);
		let fgmask = new cv.Mat(video.height, video.width, cv.CV_8UC1);
		let fgbg = new cv.BackgroundSubtractorMOG2(500, 16, true);

		const FPS = 30;
		function processVideo() {
	    try {
        let begin = Date.now();
        // start processing.
        cap.read(frame);
        fgbg.apply(frame, fgmask);
				
				let dst = cv.Mat.zeros(fgmask.rows, fgmask.cols, cv.CV_8UC3);

				// cv.dilate(fgmask, fgmask, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(20,20)))
        cv.imshow(canvas, fgmask);





				// let contours = new cv.MatVector();
				// let hierarchy = new cv.Mat();
				// // You can try more different parameters
				// 
				// cv.findContours(fgmask, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
				// // draw contours with random Scalar
				// for (let i = 0; i < contours.size(); ++i) {
				//     let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
				//                               Math.round(Math.random() * 255));
				//     cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
				// }
				// cv.imshow('canvas', dst);
				// fgmask.delete(); dst.delete(); contours.delete(); hierarchy.delete();




        // schedule the next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
	    } catch (err) {
	    	console.warn(err)
	    }
		}
}



