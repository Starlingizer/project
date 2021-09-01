var viz = new Viz();
var holder = document.getElementById('holder');

var versions = $("#holder > .version");
var w = $(".tree").width(),
    h = 200,
    padding = 30;
var nodes = [];

// var familyLevels = 0;
// var familyLevelsTotal = 0;

var digraph = 'digraph { graph [ fontsize = 20 ]; node [ margin = 0.1,	shape = egg,  style = solid,	color = "#ff00ff", fontname = "minipax" ]; edge [splines=curved, style=tapered,  penwidth=1, arrowhead=normal]  ';


for (var i = 0, ii = versions.length; i < ii; i++) {
  var vName = $("#holder > .version").eq(i).data('title');
  var parent = $("#holder > .version").eq(i).data('parent');
  var parents = [];
  parents = parent.split(", ");

  nodes.push({"vName":vName, "parent":parents});
  // nodes.push({"vName":vName, "parent":parents , "familyLevel": familyLevels});
  // familyLevels++;

  // if(i=0){
  //   digraph += '"' + vName + '" [shape=Mdiamond];';
  // };
  if(i==0){
    digraph += '"'+ vName + '"[shape = house]';
  } else if(i==versions.length-1 ){
    digraph += '"'+ vName + '"[style = filled, fontcolor= white]';
  }
  if(i>0){
    for (var j=0, jj = parents.length; j < jj; j++ ){
      var target = nodes.findIndex(x => x.vName === parents[j]);
      digraph += '"'+nodes[target].vName +'"->"'+ vName + '"';
      // var parentLevel = nodes[target].familyLevel;
      // nodes[i].familyLevel = parentLevel+1;
      // console.log(vName+", familylevel:"+familyLevels+", parentlevel:"+parentLevel);

    }

    // if(nodes.findIndex(x => x.familyLevel === nodes[i].familyLevel) != i){
    //    digraph += '{rank=same; "Schoener Fork" "v2.0";}'
    //    familyLevels--;
    //  }
  }


  //digraph += '"'+ vName + '"->' ;


}


digraph += '}';

viz.renderSVGElement(digraph)
.then(function(element) {
  holder.appendChild(element);
})
.catch(error => {
  // Create a new Viz instance (@see Caveats page for more info)
  viz = new Viz();

  // Possibly display the error
  console.error(error);
});
