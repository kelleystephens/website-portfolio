/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#submit').click(submit);
  }

  function submit(){
    var name = $('input[name=name]').val();
    var email = $('input[name=email]').val();
    var msg = $('textarea[name=msg]').val();

    ajax('/contact/send', 'post', {name:name, email:email, msg:msg}, obj =>{
      console.log('********obj*****');
      console.log(obj);
      $('input[name=name]').empty();
      $('input[name=email]').empty();
      $('textarea[name=msg]').empty();
      $('#overlay').append('<div>obj</div>');
      $('#overlay').toggle('slow');
      $('#overlay').click(function(){
        $('#overlay').toggle('slow');
      });
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='json'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
})();
