$("document").ready(function () {
  function showError(search) {
    $("#userSearchResultsTable").append(
      "<p>" +
      "Unfortunetly, there is no results for" +
      ' "' +
      search +
      '"' +
      ".</p>"
    );
  }
  $("#icon-search").click(function () {
    $("#userSearchResultsTable").empty();
    var keyword = $("#search").val();

    $.ajax({
      url:
        "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=search&inprop=url&srsearch=" + keyword,
      dataType: "jsonp",
      type: "POST",
      success: function (response) {
        console.log(response.query);

        if (response.query.searchinfo.totalhits === 0) {
          showError(keyword);
        } else {
          for (i = 0; i < 10; i++) {
            let link =
              "<a href = 'http://en.wikipedia.org/?curid=" +
              response.query.search[i].pageid +
              "' target='_blank'>";

            $("#userSearchResultsTable").append(
              link + "<div class='result'>" +
              "<h5>" +
              response.query.search[i].title +
              "</h5>" +
              response.query.search[i].snippet +
              "<br><br>" + "</div>" +
              "</a>"
            );
          }
          $(".container").css("padding-top", "0");
        }
      },

      error: function () {
        alert("Error retrieving search results, please refresh the page");
      }

      // do something with data
    });
  });
  $("#search").keypress(function (e) {
    if (e.which == 13) {
      //Enter key pressed
      $("#icon-search").click(); //Trigger search button click event
    }
  });
});
