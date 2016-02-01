// Generated by CoffeeScript 1.10.0
(function() {
  var currentRound, getDetails, updateInstructions;

  currentRound = -1;

  getDetails = function() {
    return $.getJSON('/details', function(data) {
      var header, i, item, j, k, l, len, ref, ref1, ref2, results, row, table, value;
      table = $('.branches');
      table.children().remove();
      header = $("<tr>");
      header.append("<th>Teams</th>");
      for (i = j = 0, ref = data.round; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        header.append("<th>" + i + "</th>");
      }
      table.append(header);
      ref1 = data.branches;
      results = [];
      for (k = 0, len = ref1.length; k < len; k++) {
        item = ref1[k];
        row = $("<tr>");
        row.append("<td>" + item.name + "</td>");
        for (i = l = 0, ref2 = data.round; 0 <= ref2 ? l <= ref2 : l >= ref2; i = 0 <= ref2 ? ++l : --l) {
          value = item[i] ? "tick" : "cross";
          row.append("<td><img src='/images/" + value + ".png' height='25' width='25' /></td>");
        }
        results.push(table.append(row));
      }
      return results;
    });
  };

  updateInstructions = function(roundNumber) {
    if (currentRound !== roundNumber) {
      currentRound = roundNumber;
      $('.roundNumber').text(currentRound);
      return $.get('/question', function(data) {
        var instructions;
        instructions = $('.instructions');
        instructions.children().remove();
        return instructions.append(data);
      });
    }
  };

  $(function() {
    var roundSocket;
    roundSocket = io.connect('/round');
    roundSocket.on('new round', function(roundNumber) {
      return updateInstructions(roundNumber);
    });
    getDetails();
    return setInterval(getDetails, 500);
  });

}).call(this);
