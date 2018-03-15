$(function() {
  
  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    console.log($("#addburger").val() + " val");


    var newBurger = {
      burger_name: $("#addburger").val().trim(),
      devoured: "0"
    };
    console.log(newBurger);

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("added new burger");
        location.reload();
      })
  });

  $(".devourburger").on("click", function(event) {
    var id = $(this).data("burgerid");

    $.ajax("/burgers/" + id, {
      type: "PUT"
    }).then(
      function() {
        console.log("change status ", id);
        // Reload the page to get the updated list
        // location.reload();
      }
    );
  });
});