import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyAiVOFKSUCQUBCe2ynqrcDdiP5rz2ULEjc",
	authDomain: "chatapp-d20dc.firebaseapp.com",
	projectId: "chatapp-d20dc",
	storageBucket: "chatapp-d20dc.appspot.com",
	messagingSenderId: "406808996835",
	appId: "1:406808996835:web:7968975ad6aa1764e68ed6",
	measurementId: "G-E56TL9L001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
let uid;

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		uid = user.uid;

		fetch('http://13.209.83.66/api/timetable?uid=' + uid)
			.then(response => response.json())
			.then(data => {
				drawcal(data);
			})
			.catch(error => {
				var data = [{
					title: '[자유 멘토링] ★(팀원 구성 후) 프로젝트 주제 검토 및 선정/평가 방법',
					name: '한철규',
					description: '온라인',
					start: "2023-04-27 13:00:00",
					end: "2023-04-27 17:00:00",
					className: 'fc-bg-default',
					icon: "circle",
					color: getRandomColor(),
				}, {
					title: '[자유 멘토링] ★(팀원 구성 후) 프로젝트 주제 검토 및 선정/평가 방법',
					name: '한철규',
					description: '온라인',
					start: "2023-04-26 10:00:00",
					end: "2023-04-26 13:00:00",
					className: 'fc-bg-default',
					icon: "circle",
					color: getRandomColor(),
				},];
				drawcal(data);
			});
	} else {
		// User is signed out
		// ...

	}
});

const tmp = [{ name: "AB", reviewCount: "200" }, { name: "CD", reviewCount: "120" }, { name: "EG", reviewCount: "500" }];


jQuery(document).ready(function () {
	jQuery("#add-event").submit(function (event) {
		// event.preventDefault();

		var formData = new FormData(this); // Create a new FormData object with the form fields

		$.each($('#add-event').serializeArray(), function (i, field) {
			console.log(field.name, typeof field.value);
			formData.append(field.name, field.value);
		});

		formData.append('color', getRandomColor()); // Add additional properties to the FormData object
		formData.append('uid', uid);
		formData.append('start', formData.get('date') + ' ' + formData.get('start-hour'));
		formData.append('end', formData.get('date') + ' ' + formData.get('end-hour'));
		formData.delete('date');
		formData.delete('start-hour');
		formData.delete('end-hour');

		if (formData.get("start") < formData.get("end")) {
			addMentor(formData.get("name"));
			fetch('http://13.209.83.66/api/timetable', {
				method: 'POST',
				body: formData // Send the FormData object as the request body
			})
				.catch(error => alert(error));
		}
		else {
			alert("시작 시간이 더 앞으로 설정해주세요");
		}

	});
	fetch("http://13.209.83.66/api/comment")
		.then(response => response.json())
		.then(data => {
			console.log(data);
			console.log("enter");
			drawTable(data);
		})
		.catch(error => {
			var data = [{
				title: '[자유 멘토링] ★(팀원 구성 후) 프로젝트 주제 검토 및 선정/평가 방법',
				name: '한철규',
				description: '온라인',
				start: "2023-04-27 13:00:00",
				end: "2023-04-27 17:00:00",
				className: 'fc-bg-default',
				icon: "circle",
				color: getRandomColor(),
			}, {
				title: '[자유 멘토링] ★(팀원 구성 후) 프로젝트 주제 검토 및 선정/평가 방법',
				name: '한철규',
				description: '온라인',
				start: "2023-04-26 10:00:00",
				end: "2023-04-26 13:00:00",
				className: 'fc-bg-default',
				icon: "circle",
				color: getRandomColor(),
			},];
			drawTable(data);
		})
});




function drawcal(data) {
	jQuery('#calendar').fullCalendar({
		themeSystem: 'bootstrap4',
		// emphasizes business hours
		businessHours: false,
		defaultView: 'agendaWeek',
		// event dragging & resizing
		editable: true,
		// header
		header: {
			left: 'title',
			center: 'month,agendaWeek,agendaDay',
			right: 'today prev,next'
		},
		// 현재는 더미데이터, 추후 DB에서 읽어오면 될 듯
		events: data,
		locale: 'ko',
		dayClick: function () {
			jQuery('#modal-view-event-add').modal();
		},
		eventClick: function (event, jsEvent, view) {
			jQuery('.event-icon').html("<i class='fa fa-" + event.icon + "'></i>");
			jQuery('.event-title').html(event.title);
			jQuery('.event-body').html(`멘토 : ${event.name} <br>강의실 : ${event.description}<br> ${event.start._i} ~ ${event.end._i} `);
			jQuery('.eventUrl').attr('href', event.url);
			jQuery('#modal-view-event').modal();
		}
	})
}

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

function drawTable(data) {
	var table = document.getElementById("datatable");

	for (var i = 0; i < data.length; i++) {
		var row = table.insertRow();
		row.insertCell(0).innerHTML = " ";
		var name = row.insertCell(1);
		var cnt = row.insertCell(2);

		name.innerHTML = data[i]['name'];
		cnt.innerHTML = data[i]['reviewCount'];
		row.addEventListener("click", function () {
			var clickedName = this.cells[1].innerHTML;
			// 클릭한 이름에 맞는 review.html로 이동
			const title = encodeURIComponent(clickedName);

			window.location.href = "review.html?title=${clickedName}"
		})
	}

}


// 리뷰가 없는 멘토님을 사용자가 원하는걸 추가하는게 나을지, 아니면 사용자가 켈린더에 추가할때 멘토님이 리뷰없으면 추가할지 
// 고민이 되는군요. 
function addMentor(input) {
	var table = document.getElementById("datatable");

	var row = table.insertRow(1);
	var no = row.insertCell(0);
	var name = row.insertCell(1);
	var cnt = row.insertCell(2);

	no.innerHTML = " ";
	name.innerHTML = input;
	cnt.innerHTML = 0;
	row.addEventListener("click", function () {
		var clickedName = this.cells[1].innerHTML;
		// 클릭한 이름에 맞는 review.html로 이동
		const title = encodeURIComponent(clickedName);

		window.location.href = "review.html?title=${clickedName}"
	})

	var formData = new FormData();
	formData.append("name", input);
	formData.append("comment", "");
	const today = new Date();
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const str = `${month[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
	formData.append("time", str);
	console.log(formData);
	// DB로 저장
	fetch('http://13.209.83.66/api/comment', {
		method: 'POST',
		body: formData
	})
		.then(response => console.log(response))
		.then(data => console.log(data))
		.catch(error => alert(error));
	alert("Submitted");

}

