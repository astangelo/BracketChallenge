# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  $('#team_instance_quadrant_id').parent().hide()
  quadrants = $('#team_instance_quadrant_id').html()
  $('#team_instance_bracket_id').change ->
    bracket = $('#team_instance_bracket_id :selected').text()
    options = $(quadrants).filter("optgroup[label='#{bracket}']").html()
    console.log("label = #{bracket}");
    console.log('options='+options)
    if options
      $('#team_instance_quadrant_id').html(options)
      $('#team_instance_quadrant_id').parent().show()
    else
      $('#team_instance_quadrant_id').empty()
      $('#team_instance_quadrant_id').parent().hide()

