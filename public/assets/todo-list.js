$(document).ready(function(){

  $('form').on('submit', function(){

    var item = $('form input');
    var todo = {item: item.val()};

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data){
        //do something with the data via front-end framework
        console.log('this is the data you are successfully saving to db in ajax: ' + JSON.stringify(data));
        location.reload();
      }
    });

    return false;

  });

  $('li').on('click', function(){
    var item = $(this).text().replace(/ /g, "-");
    console.log('this is the item you are going to delete: ' + JSON.stringify(item));
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function(data){
        //do something with the data via front-end framework
        console.log( 'You successfully deleted this data: '+ JSON.stringify(data));
        location.reload();
      }
    });
  });

});
