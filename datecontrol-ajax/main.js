
$(document).ready(function(){
    $("#btnReading").click(function(){	
		<!-- FromDate : 1357630862000 GMT: Tue, 08 Jan 2013 07:41:02 GMT Your time zone: 1/8/2013, 1:11:02 PM GMT+5:30 -->
		<!-- ToDate : 1425368596000 ( GMT: Tue, 03 Mar 2015 07:43:16 GMT Your time zone: 3/3/2015, 1:13:16 PM GMT+5:30 ) -->
        $.get("http://api.cosmiqo.com/sensor/street-lamp/reading?source_id=99&start=1357630862000&end=1425368596000&limit=1000", function(data, status){  
                 
            var resultFeatures = _.pluck(_.pluck(_.flatten(_.map([data],'features')), 'geometry'), 'coordinates');
            var resultProperties = _.pluck(_.flatten(_.map([data],'features')), 'properties');
            console.log(''
                +JSON.stringify(resultProperties));
        });
    });

     $("#btnRun").click(function(){	
		<!-- FromDate : 1400590568000 - GMT: Tue May 20 2014 12:56:08 -->
		<!-- ToDate : 1425368596000 - GMT: Tue Mar 03 2015 07:43:16 -->
        $.get("http://api.cosmiqo.com/sensor/street-lamp/run?start=1400590568000&end=1405709667000", function(data, status){  
                 
            //var resultFeatures = _.pluck(_.pluck(_.flatten(_.map([data],'features')), 'geometry'), 'coordinates');
            //var resultProperties = _.pluck(_.flatten(_.map([data],'features')), 'properties');
            console.log('Morning---:'
                +JSON.stringify(data));
        });
    });



	function getDatabyDatetime(startDate,endDate) {
	
		//Build street-lamb URL
		var url = 'http://api.cosmiqo.com/sensor/street-lamp/reading?source_id=99&start='+startDate+'&end='+endDate+'&limit=1000';		
		$.get(url, function(data, status){              
            var resultFeatures = _.pluck(_.pluck(_.flatten(_.map([data],'features')), 'geometry'), 'coordinates');
            var resultProperties = _.pluck(_.flatten(_.map([data],'features')), 'properties');
            console.log('--Welcome--'
                +JSON.stringify(resultProperties));
        });
	}
	
	var cb = function(start, end, label) {
		console.log(start.toISOString(), end.toISOString(), label);
		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		//alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
	};

	  var optionSet = {
		startDate: moment().subtract(29, 'days'),
		endDate: moment(),
		minDate: '01/01/2012',
		maxDate: '12/31/2015',
		showDropdowns: true,
		showWeekNumbers: true,
		timePicker: false,
		timePickerIncrement: 1,
		timePicker12Hour: true,
		ranges: {
		   'Today': [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		   'This Month': [moment().startOf('month'), moment().endOf('month')],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		},
		opens: 'left',
		buttonClasses: ['btn btn-default'],
		applyClass: 'btn-sm btn-primary',
		cancelClass: 'btn-sm',
		format: 'MM/DD/YYYY',
		separator: ' to ',
		locale: {
			applyLabel: 'Submit',
			cancelLabel: 'Clear',
			fromLabel: 'From',
			toLabel: 'To',
			customRangeLabel: 'Custom',
			daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
			monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			firstDay: 1
		}
	  };

	     var optionSet2 = {
                    startDate: moment().subtract(7, 'days'),
                    endDate: moment(),
                    opens: 'left',
                    ranges: {
                       'Today': [moment(), moment()],
                       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                       'This Month': [moment().startOf('month'), moment().endOf('month')],
                       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    }
                  };
				  
	  $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

	  $('#reportrange').daterangepicker(optionSet, cb);

	  $('#reportrange').on('show.daterangepicker', function() { console.log("show event fired"); });
	  $('#reportrange').on('hide.daterangepicker', function() { console.log("hide event fired"); });
	  $('#reportrange').on('apply.daterangepicker', function(ev, picker) { 
		console.log("apply event fired, start/end dates are " 
		  + picker.startDate.format('MMMM D, YYYY') 
		  + " to " 
		  + picker.endDate.format('MMMM D, YYYY')
		  + " ------ "
		  + picker.startDate
		  + " ------ "
		  + picker.endDate
		); 
		getDatabyDatetime(picker.startDate, picker.endDate);
	  });
	  $('#reportrange').on('cancel.daterangepicker', function(ev, picker) { console.log("cancel event fired"); });

	  $('#destroy').click(function() {
		$('#reportrange').data('daterangepicker').remove();
	  });
 
});