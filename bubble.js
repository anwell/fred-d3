// Wrap these scripts in an anonymous function to maintain local scope
(function() {
var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#bubble").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var tooltip = d3.select("#bubble")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.attr("class", "tooltip")
	.text("a simple tooltip");
	
d3.json("tags.json", function(error, root) {
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); })
      .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.notes);})
	    .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
    	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.tags)
      node.tags.forEach(function(child) { recurse(node.name, child); });
    else {
      // If there are notes, use those, otherwise have the notes be the name
      classes.push({packageName: node.popularity, className: node.name, value: node.series_count, notes: node.notes});
      if (classes[classes.length - 1].notes == "") {
        classes[classes.length - 1].notes = node.name;
      }
    }
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
})();