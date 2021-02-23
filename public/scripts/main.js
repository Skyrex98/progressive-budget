$(document).ready(function () {
  getAllRecords();
});
var labelsGlobal = [];
var dataGlobal = [];

$("body").delegate("#add-btn", "click", function () {
  var isValidated = validate();
  var name = $("#name").val();
  var amount = $("#amount").val();
  if (isValidated) {
    create(name, amount);
  }
});

$("body").delegate("#sub-btn", "click", function () {
  var isValidated = validate();
  var name = $("#name").val();
  var amount = $("#amount").val();
  if (isValidated) {
    if (amount > 0) {
      amount = amount * -1;
    }
    create(name, amount);
  }
});
function create(name, amount) {
  $.ajax({
    type: "POST",
    url: `http://localhost:5000/api/transaction?name=${name}&amount=${amount}`,
    dataType: "json",
    data: {},
    success: function (data) {
      getAllRecords();
    },
  });
}
//validating
function validate() {
  var name = $("#name").val();
  var amount = $("#amount").val();
  if (amount < 0 || isNaN(amount) || name == "") {
    $(".error").css("color", "red");
    $(".error").html("Please Add Correct Values");
    return false;
  }
  return true;
}
function getAllRecords() {
  $.ajax({
    type: "GET",
    url: `http://localhost:5000/api/transactions`,
    dataType: "json",

    success: function (data) {
      $("#name").val("");
      $("#amount").val("");
      var htmlTOShow = "";
      var total = 0;

      data.forEach((element) => {
        let date = new Date(element.date);
        labelsGlobal.push(
          `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        );
        dataGlobal.push(element.value);

        total = total + element.value;
        htmlTOShow += `<tr>
        <td>
        ${element.name}
        </td>
        <td>
        ${element.value}
        </td>
        </tr>`;
      });
      $("#total").html(total);
      $("#records").html(htmlTOShow);
      var ctx = document.getElementById("canvas").getContext("2d");
      window.myLine = new Chart(ctx, config);
    },
  });
}

var chartColors = {
  red: "rgb(255, 99, 132)",
  grey: "rgb(231,233,237)",
};

var line = {
  type: "line",
  data: {
    labels: labelsGlobal,
    datasets: [
      {
        label: "My Progressive Budget",
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: dataGlobal,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "My Progressive Budget",
    },
    tooltips: {
      mode: "label",
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
  },
};
