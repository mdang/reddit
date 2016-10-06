$(document).ready(function() {

  $('nav a').on('click', function(e) {
    $('#main').empty();

    var context = $(this).text();

    loadResults(context);
    e.preventDefault();
  });

  loadResults('top');

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
        console.log(i + ': ', response.data.children[i]);
        var post = response.data.children[i];

        /*
        <div class="row">
          <div class="col-md-2">Image</div>
          <div class="col-md-10">Title</div>
        </div>
        */

        var $row = $('<div />').addClass('row');

        var $scoreColumn = $('<div />').addClass('col-md-1');
        $scoreColumn.text(post.data.score);

        var $imageColumn = $('<div />').addClass('col-md-2');
        var imageSrc = (post.data.thumbnail !== 'default' && post.data.thumbnail !== 'self') ?
          post.data.thumbnail : '';

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
