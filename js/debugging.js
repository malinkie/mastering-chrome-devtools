$("#github").on("keyup", function(e) {

  if (e.keyCode !== 13 /* RETURN */) return;
  
  var user = $("#github").val();

  emptyCurrentList();

  // Using the github API https://developer.github.com/v3/repos/#list-user-repositories
  $.ajax({
    url: "https://api.github.com/user/" + user + "/repos",
    success: function(repos) {
      iterateThroughData(repos);
    },
    error: function(data) {
      insertError();
    }
  });
});

function iterateThroughData(repos) {
  _.forEachRight(repos, function(repo) {
    insertHTML(repo);
  });
}

function insertHTML(repo) {
  $("#repositories").append("<li>" + repo.title + "</li>");
}

function emptyCurrentList() {
  $("#repositories").empty();
}

function insertError() {
  $("#repositories").append("<li>Uh oh, we're having a problem!</li>");
}
