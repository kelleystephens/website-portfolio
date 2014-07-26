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
    var description = $(this).siblings('.projectContain > div > .description').text();
    var git = $(this).siblings('.projectContain > div > .git').text();
    var app = $(this).siblings('.projectContain > div > .app').text();
    var id = $(this).siblings('.title').data('id');

    $(this).siblings('.title').replaceWith(`<input name='title' data-id=${id} value='${title}'></input>`);
    $(this).siblings('.projectContain > div > .description').replaceWith(`<textarea name='description'>${description}</textarea>`);
    $(this).siblings('.projectContain > div > .git').replaceWith(`<input name='git' value='${git}'></input>`);
    $(this).siblings('.projectContain > div > .app').replaceWith(`<input name='app' value='${app}'></input>`);
    $('.projectContain').append('<button class="save">Save</button>');
  }

  function saveProject(){
    var projId = $('input[name=title]').data('id');
    var title = $('input[name=title]').val();
    var description = $('textarea[name=description]').val();
    var git = $('input[name=git]').val();
    var app = $('input[name=app]').val();

    ajax(`/portfolio/update/${projId}`, 'put', {title:title, description:description, git:git, app:app}, obj =>{
      console.log(obj);
      window.location= '/portfolio';
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='json'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
})();
