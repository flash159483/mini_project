jQuery(document).ready(function () {
	jQuery("#add-event").submit(function () {
		// alert("Submit Start");
		var values = {};
		$.each($('#add-event').serializeArray(), function (i, field) {
			values[field.name] = field.value;
		});
		values['color'] = getRandomColor();
		// DB로 저장
		alert("Submitted");
	});
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