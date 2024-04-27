/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/
(function ($) {
  $(document).ready(function () {
    function fetchShows(searchTerm) {
      let url = "http://api.tvmaze.com/shows";
      if (searchTerm) {
        url = `http://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          searchTerm
        )}`;
      }

      $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
          $("#showList").empty();

          let shows = searchTerm ? response.map((item) => item.show) : response;
          shows.forEach(function (show) {
            const { name, _links } = show;
            const showUrl = _links?.self?.href;
            const listItem = $("<li>");
            const link = $("<a>", {
              text: name,
              href: showUrl || "#",
              click: function (event) {
                event.preventDefault();
              },
            });

            listItem.append(link);
            $("#showList").append(listItem);
          });

          $("#showList").show();
          $("#show").hide();
        },
        error: function () {
          alert("Error fetching show data");
        },
      });
    }

    $("#searchForm").on("submit", function (event) {
      event.preventDefault();
      const searchTerm = $.trim($("#search_term").val());

      if (searchTerm === "") {
        alert("Please enter a search term.");
      } else {
        fetchShows(searchTerm);
      }
    });

    function displayShowDetails(showUrl) {
      $("#showList").hide();

      $("#show").empty();

      $.ajax({
        url: showUrl,
        method: "GET",
        success: function (show) {
          const showName = $("<h1>").text(show.name || "N/A");
          const showImage = $("<img>").attr(
            "src",
            show.image?.medium || "/no_image.jpeg"
          );
          const showDetails = $("<dl>");

          showDetails.append(
            $("<dt>").text("Language"),
            $("<dd>").text(show.language || "N/A")
          );

          if (show.genres && show.genres.length > 0) {
            const genresList = $("<ul>");
            show.genres.forEach((genre) => {
              genresList.append($("<li>").text(genre));
            });
            showDetails.append(
              $("<dt>").text("Genres"),
              $("<dd>").append(genresList)
            );
          } else {
            showDetails.append($("<dt>").text("Genres"), $("<dd>").text("N/A"));
          }

          showDetails.append(
            $("<dt>").text("Average Rating"),
            $("<dd>").text(show.rating?.average || "N/A")
          );

          showDetails.append(
            $("<dt>").text("Network"),
            $("<dd>").text(show.network?.name || "N/A")
          );

          const summaryText = show.summary ? $(show.summary).text() : "N/A";
          showDetails.append(
            $("<dt>").text("Summary"),
            $("<dd>").html(summaryText)
          );

          $("#show").append(showName, showImage, showDetails);

          $("#show").show();
        },
        error: function () {
          alert("Error fetching show ");
        },
      });
    }

    $(document).on("click", "#showList a", function (event) {
      event.preventDefault();
      const showUrl = $(this).attr("href");
      displayShowDetails(showUrl);
    });

    fetchShows();
  });
})(window.jQuery);
