$(document).ready(function() {

  // When clicking on any of the navigation links, get the sort order we want to use for posts
  $('nav a').on('click', function(e) {
    $('#main').empty();

    var sortOrder = $(this).text();

    loadResults(sortOrder);
    e.preventDefault();
  });

  // Initialize the page when it starts with the 'top' posts
  loadResults('top');

  // Function that will load results from Reddit based on the context we give it
  function loadResults(sortOrder) {
    var options = {
      url: 'https://www.reddit.com/' + sortOrder + '.json'
    };

    var request = $.ajax(options);

    // Run on success
    request.done(function(response) {
      // console.log('success:', response.data.children);
      var responseCount = response.data.children.length;

      for (var i=0; i<responseCount; i++) {
        // console.log(i + ': ', response.data.children[i]);
        var post = response.data.children[i];
        var $row = $('<div />').addClass('row');

        var $scoreColumn = $('<div />').addClass('col-md-1');
        $scoreColumn.text(post.data.score);

        var $imageColumn = $('<div />').addClass('col-md-2');
        var imageSrc = (post.data.thumbnail !== 'default' && post.data.thumbnail !== 'self') ?
          post.data.thumbnail : '';

        // If there's no thumbnail, Reddit will return 'self' or 'default' as the image source,
        //  which leads to a 404 if we use it
        if (imageSrc) {
          var $image = $('<img />').attr('src', post.data.thumbnail);
          var $imageLink = $('<a />').attr('href', post.data.url).append($image);
          $imageColumn.append($imageLink);
        }

        var $link = $('<a />').attr('href', post.data.url).text(post.data.title);
        var $title = $('<h3 />').html($link);
        var $content = $('<div />').html($title).addClass('col-md-9');

        $row.append($scoreColumn);
        $row.append($imageColumn);
        $row.append($content);
        $('#main').append($row);
      }
    });

    // Run on failure
    request.fail(function(jqx, status, errorThrown) {
      console.log('Error: ', errorThrown);
    });

    // Run always
    request.always(function() {

    });
  }
});
