$(function() {
  var href = "https://sigotora.jp/index.cfm";
  $('#srh_jobtype_param,#sfw').on('change', function() {
    var srh_jobtype_param = $('#srh_jobtype_param').val();
    var sfw = $('#sfw').val();
    $('#test').prop('href', href + "?fuseaction=job.joblist&srh_area_param=1" + "&srh_jobtype_param=" + srh_jobtype_param + "&sfw=" + sfw);
  });
});
