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

		// alert(uid);
		// document.getElementsByClassName("btn btn-primary")[0].innerHTML="Log Out";

		// ...
	} else {
		// User is signed out
		// ...

	}
});

const tmp = [{ name: "AB", reviewCount: "200" }, { name: "CD", reviewCount: "120" }, { name: "EG", reviewCount: "500" }];

jQuery(document).ready(function () {
	jQuery("#add-event").submit(function () {
		// alert("Submit Start");
		var values = {};
		$.each($('#add-event').serializeArray(), function (i, field) {
			values[field.name] = field.value;
		});
		values['color'] = getRandomColor();
		values['uid'] = uid;
		// console.log()
		// DB로 저장
		addMentor("김상순");
		// addMentor(values["name"]);
	});
	// DB에서 Review 읽어와야 함
	drawTable(tmp);

});


(function () {
	'use strict';
	// ------------------------------------------------------- //
	// Calendar
	// ------------------------------------------------------ //
	jQuery(function () {
		// page is ready
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
			events: [
				{
					title: '[자유 멘토링] ★(팀원 구성 후) 프로젝트 주제 검토 및 선정/평가 방법',
					name: '한철규',
					description: '온라인',
					start: '2023-04-25 10:00',
					// date+start_hour (values.date + ' ' + values.start-hour)
					end: '2023-04-25 14:00',
					// date+end_hour (values.date + ' ' + values.start-hour)
					className: 'fc-bg-default',
					icon: "circle",
					color: getRandomColor(),
				},
			],
			locale: 'ko',
			dayClick: function () {
				jQuery('#modal-view-event-add').modal();
			},
			eventClick: function (event, jsEvent, view) {
				jQuery('.event-icon').html("<i class='fa fa-" + event.icon + "'></i>");
				jQuery('.event-title').html(event.title);
				jQuery('.event-body').html(`멘토 : ${event.name} <br>강의실 : ${event.description}<br> ${event.start._i.substr(10)} ~ ${event.end._i.substr(10)} `);
				jQuery('.eventUrl').attr('href', event.url);
				jQuery('#modal-view-event').modal();
			}
		})
	});

})(jQuery);

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
			localStorage.setItem('name', clickedName);
			const link = "review.html";
			location.replace(link);
		})
	}

}

function searchTable() {
	var input = document.getElementById("searchInput").value;
	var table = document.getElementById("datatable");
	console.log("enter");
	for (var i = 1; i < table.rows.length; i++) {
		var row = table.rows[i];

		var name = row.cells[1].innerHTML;

		if (name.includes(input)) {
			row.style.display = "";
		} else {
			row.style.display = "none";
		}
	}
}

// 리뷰가 없는 멘토님을 사용자가 원하는걸 추가하는게 나을지, 아니면 사용자가 켈린더에 추가할때 멘토님이 리뷰없으면 추가할지 
// 고민이 되는군요. 
function addMentor(input) {
	var table = document.getElementById("datatable");
	var flag = false;
	for (var i = 1; i < table.rows.length; i++) {
		var row = table.rows[i];
		console.log(table);;
		var name = row.cells[i].innerHTML;

		if (name === input) {
			flag = true;
		}
	}
	// 검색했을때 멘토님의 리뷰가 작성한적이 없으면 추가한다
	if (!flag) {
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
			localStorage.setItem('name', clickedName);
			const link = "review.html";
			location.replace(link);
		})
	}
}


document.getElementById("searchInput").addEventListener("keyup", searchTable);