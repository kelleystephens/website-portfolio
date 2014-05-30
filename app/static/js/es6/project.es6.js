/* jshint unused:false */
/* global moment */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#allProjects').on('click', '.edit', editProject);
    $('#allProjects').on('click', '.save', saveProject);
    $('.show').click(show);
  }

  function show(){
    $('.hidden').toggle();
  }

  function editProject(){
    var title = $(this).siblings('.title').text();
    var description = $(this).siblings('.description').text();
    var git = $(this).siblings('.git').text();
    var app = $(this).siblings('.app').text();
    var date = $(this).siblings('.date').data('date');
    date = moment(date).format('YYYY-MM-DD');
    var tags = $(this).siblings('.tags').text();
    var id = $(this).siblings('.title').data('id');

    $(this).siblings('.title').replaceWith(`<input name='title' data-id=${id} value='${title}'></input>`);
    $(this).siblings('.description').replaceWith(`<textarea name='description'>${description}</textarea>`);
    $(this).siblings('.git').replaceWith(`<input name='git' value='${git}'></input>`);
    $(this).siblings('.app').replaceWith(`<input name='app' value='${app}'></input>`);
    $(this).siblings('.date').replaceWith(`<input type='date' name='date' value='${date}'></input>`);
    $(this).siblings('.tags').replaceWith(`<input name='tags' value='${tags}'></input>`);
    $('.projectContain').append('<button class="save">Save</button>');
  }

  function saveProject(){
    var projId = $('input[name=title]').data('id');
    var title = $('input[name=title]').val();
    var description = $('textarea[name=description]').val();
    var git = $('input[name=git]').val();
    var app = $('input[name=app]').val();
    var date = $('input[name=date]').val();
    var tags = $('input[name=tags]').val().split(',').map(t=>t.trim());

    ajax(`/portfolio/update/${projId}`, 'put', {title:title, description:description, git:git, app:app, date:date, tags:tags}, obj =>{
      console.log(obj);
      window.location= '/portfolio';
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='json'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
})();
