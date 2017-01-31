$(document).ready(function () {
	var brTime = "10";
	var sessTime = "25";
	var clkS = [25, ":", 00];
	var clkB = [10, ":", 00];
	var brOperator = "";
	var sessOperator = "";

	$("#break > button").click(function () {
		brOperator = $(this).attr("value");

		if (brOperator === "+")
			brTime = (parseInt(brTime) + 1).toString();
		if (brOperator === "-")
			brTime = (parseInt(brTime) - 1).toString();

		clkB = [brTime, ':', '00'];
		$("#breakTime").html(brTime);
	});


	$("#session > button").click(function () {
		sessOperator = $(this).attr("value");

		if (sessOperator === "+")
			sessTime = (parseInt(sessTime) + 1).toString();
		if (brOperator === "-")
			sessTime = (parseInt(sessTime) - 1).toString();

		clkS = [sessTime, ':', '00'];
		$("#sessionTime").html(sessTime);
	});

	judge=false;
	status="work";
	$("#timer > button").click(function () {
		if(judge===false){
			$("#timer > button").text("stop");
			if(status==="work"){
				var time=clkS.join("");
				$("#timer #val").text(time);
				sessStart();
			}else {
				var time=clkB.join("");
				$("#timer #val").text(time);
				brStart();
			}
		}else {
			$("timer > button").text("start");
			stop();
		}

	});

	var sessStart = function () {
		judge=true;
		if (clkS[0] === '0')
			brStart();
		else {
			setTime = window.setInterval(function () {
				if (clkS[2] === '00' && parseInt(clkS[0]) > 0) {
					clkS[0] = parseInt(clkS[0]) - 1;
					clkS[2] = '60';
				}
				clkS[2] = parseInt(clkS[2]) - 1;
				if (clkS[2] <= 9 && clkS[2] >= 0)
					clkS[2] = '0' + clkS[2];

				time = clkS.join("");
				$("#timer #val").text(time);
				if (parseInt(clkS[0]) === 0 && parseInt(clkS[2]) === 0) {
					clearInterval(setTime);
					status = "break";
					brStart();
				}
			}, 1000);
		}
	};

	var brStart = function () {
		judge = true;

		setTime = setInterval(function () {
			if (clkB[2] === '00' && parseInt(clkB[0]) > 0) {
				clkB[0] = parseInt(clkB[0]) - 1;
				clkB[2] = '60';
			}
			clkB[2] = parseInt(clkB[2]) - 1;
			if (clkB[2] <= 9 && clkB[2] >= 0)
				clkB[2] = '0' + clkB[2];

			var time = clkB.join("");
			$("#timer #val").text(time);

			if (parseInt(clkB[0]) === 0 && parseInt(clkB[2]) === 0) {
				clearInterval(setTime);

			}
		}, 1000);
	}

	var stop = function () {
		window.clearInterval(setTime);
		judge = false;
	};
});